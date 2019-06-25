parasails.registerPage('account-overview', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {

    virtualPageSlug: '',

    isBillingEnabled: false,

    hasBillingCard: false,

    // Syncing/loading states for this page.
    syncingOpenCheckout: false,
    syncingUpdateCard: false,
    syncingRemoveCard: false,
    syncing: false,

    // upload form management
    uploadFormData: {
      avatar: undefined,
      previewImageSrc: ''
    },

    // Form data
    formData: { /* … */ },

    // validation Errors
    formErrors: {},

    // Server error state for the form
    cloudError: '',

    // For the Stripe checkout window
    checkoutHandler: undefined,

    // For the confirmation modal:
    removeCardModalVisible: false,
  },

  virtualPages: true,
  html5HistoryMode: 'history',
  virtualPagesRegExp: /^\/account\/?([^\/]+)?/,

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function (){
    _.extend(this, window.SAILS_LOCALS);

    this.isBillingEnabled = !!this.stripePublishableKey;

    // Determine whether there is billing info for this user.
    this.me.hasBillingCard = (
      this.me.billingCardBrand &&
      this.me.billingCardLast4 &&
      this.me.billingCardExpMonth &&
      this.me.billingCardExpYear
    );
  },
  mounted: async function() {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

    clickStripeCheckoutButton: async function() {

      // Prevent double-posting if it's still loading.
      if(this.syncingUpdateCard) { return; }

      // Show syncing state for opening checkout.
      this.syncingOpenCheckout = true;

      // Clear out error states.
      this.cloudError = false;

      // Open Stripe Checkout.
      var billingCardInfo = await parasails.util.openStripeCheckout(this.stripePublishableKey, this.me.emailAddress);
      // Clear the loading state for opening checkout.
      this.syncingOpenCheckout = false;
      if (!billingCardInfo) {
        // (if the user canceled the dialog, avast)
        return;
      }

      // Now that payment info has been successfully added, update the billing
      // info for this user in our backend.
      this.syncingUpdateCard = true;
      await Cloud.updateBillingCard.with(billingCardInfo)
      .tolerate(()=>{
        this.cloudError = true;
      });
      this.syncingUpdateCard = false;

      // Upon success, update billing info in the UI.
      if (!this.cloudError) {
        Object.assign(this.me, _.pick(billingCardInfo, ['billingCardLast4', 'billingCardBrand', 'billingCardExpMonth', 'billingCardExpYear']));
        this.me.hasBillingCard = true;
      }
    },

    clickRemoveCardButton: async function() {
      this.removeCardModalVisible = true;
    },

    closeRemoveCardModal: async function() {
      this.removeCardModalVisible = false;
      this.cloudError = false;
    },

    submittedRemoveCardForm: async function() {

      // Update billing info on success.
      this.me.billingCardLast4 = undefined;
      this.me.billingCardBrand = undefined;
      this.me.billingCardExpMonth = undefined;
      this.me.billingCardExpYear = undefined;
      this.me.hasBillingCard = false;

      // Close the modal and clear it out.
      this.closeRemoveCardModal();

    },

    handleParsingRemoveCardForm: function() {
      return {
        // Set to empty string to indicate the default payment source
        // for this customer is being completely removed.
        stripeToken: ''
      };
    },

    clickUploadAvatar: function () {
      this.goto('account/avatar');
    },

    _clearUploadAvatarModal: function() {
      // Close Modal
      this.goto('/account');
      // Reset form data
      this.uploadFormData = {
        avatar: undefined,
        previewImageSrc: ''
      };
      // clear error states
      this.formErrors = {};
      this.cloudError = '';
    },

    closeUploadAvatarModal: function () {
      this._clearUploadAvatarModal();
    },

    handleParsingUploadAvatarForm: function () {
      this.formErrors = {};
      var argins = this.uploadFormData;

      if (!argins.avatar) {
        this.formErrors.avatar = true;
      }

      if (Object.keys(this.formErrors).length > 0) {
        return;
      }
      return _.omit(argins, ['previewImageSrc']);
    },

    submittedUploadAvatarForm: function (result) {
      this.avatarSrc = result;
      //close the modal
      this._clearUploadAvatarModal();
    },

    changeFileInput: function(files) {
      if (files.length !== 1 && !this.uploadFormData.avatar) {
        throw new Error('Consistency violation: `changeFileInput` was somehow called with an empty array of files, or with more than one file in the array!  This should never happen unless there is already an uploaded file tracked.');
      }
      var selectedFile = files[0];
      // If you cancel from the native upload window when you already
      // have a avatar tracked, then we just avast (return early).
      // In this case, we just leave whatever you had there before.
      if (!selectedFile && this.uploadFormData.avatar) {
        return;
      }

      this.uploadFormData.avatar = selectedFile;

      // Set up the file preview for the UI:
      var reader = new FileReader();
      reader.onload = (event)=>{
        this.uploadFormData.previewImageSrc = event.target.result;

        // Unbind this "onload" event.
        delete reader.onload;
      };
      // Clear out any error messages about not providing an image.
      this.formErrors.avatar = false;
      reader.readAsDataURL(selectedFile);
    },
  }
});

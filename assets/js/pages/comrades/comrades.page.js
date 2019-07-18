parasails.registerPage('comrades', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {

    comrades: [],

    // The "virtual" portion of the URL which is managed by this page script.
    virtualPageSlug: '',

    // Form data
    addComradesFormData: {
      comrades: [
        {
          fullName: '',
          emailAddress: ''
        },
        {
          fullName: '',
          emailAddress: ''
        },
        {
          fullName: '',
          emailAddress: ''
        }
      ]
    },

    // For tracking client-side validation errors in our form.
    // > Has property set to `true` for each invalid property in `addComradesFormData`.
    formErrors: { /* … */ },

    // Syncing / loading state
    syncing: false,

    // Server error state
    cloudError: '',

    // Success state when form has been submitted
    cloudSuccess: false,

    selectedComrade: undefined,
    confirmRemoveComradeModalOpen: false,
  },

  virtualPages: true,
  html5HistoryMode: 'history',
  virtualPagesRegExp: new RegExp(/^\/comrades\/?([^\/]+)?/),

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

    clickInviteButton: function() {
      // Open the modal.
      this.goto('/comrades/new');
    },

    _clearAddComradesModal: function() {
      this.goto('/comrades');
      // Reset form data.
      this.addComradesFormData = {
        comrades: [
          {
            fullName: '',
            emailAddress: ''
          },
          {
            fullName: '',
            emailAddress: ''
          },
          {
            fullName: '',
            emailAddress: ''
          }
        ]
      };
      this.formErrors = {};
      this.cloudError = '';
    },

    closeAddComradesModal: function() {
      this._clearAddComradesModal();
    },

    clickAddMoreButton: function() {
      this.addComradesFormData.comrades.push({
        fullName: '',
        emailAddress: ''
      });
    },

    handleParsingAddComradesForm: function() {
      console.log('can you handle this?');
      // Clear out any pre-existing error messages.
      this.formErrors = {};

      var argins = _.cloneDeep(this.addComradesFormData);

      // Check whether there are any rows with a name but not an email.
      var isValidEmailAddress = parasails.util.isValidEmailAddress;
      var hasAtLeastOneInvalidComrade = !_.isUndefined(_.find(argins.comrades, (comrade)=> {
        if((comrade.fullName !== '' || comrade.emailAddress !== '') && !isValidEmailAddress(comrade.emailAddress)) {
          return true;
        }
        return false;
      }));

      if(hasAtLeastOneInvalidComrade) {
        this.formErrors.comrades = true;
        return;
      }

      // If there were any issues, they've already now been communicated to the user,
      // so simply return undefined.  (This signifies that the submission should be
      // cancelled.)
      if (Object.keys(this.formErrors).length > 0) {
        return;
      }

      // Otherwise, trim out any empty rows before submitting.
      _.remove(argins.comrades, {fullName: '', emailAddress: ''});

      return argins;
    },

    submittedAddComradesForm: function() {
      var invitedComrades = _.filter(this.addComradesFormData.comrades, (comrade)=>{
        return comrade.fullName !== '' && comrade.emailAddress !== '';
      });
      console.log('invited comrades:',invitedComrades);
      // Add the new comrades to the requests list
      this.me.outboundComradeRequests = this.me.outboundComradeRequests.concat(invitedComrades);
      util
      this._clearAddComradesModal();
    },

    clickRemoveComrade: function(comradeId) {
      this.selectedComrade = _.find(this.me.comrades, {id: comradeId});
      console.log('selectedComrade',this.selectedComrade);

      // Open the modal.
      this.confirmRemoveComradeModalOpen = true;
    },

    closeRemoveComradeModal: function() {
      this.selectedComrade = undefined;
      this.confirmRemoveComradeModalOpen = false;
      this.cloudError = '';
    },

    handleParsingRemoveComradeForm: function() {
      return {
        id: this.selectedComrade.id
      };
    },

    submittedRemoveComradeForm: function() {

      // Remove this user from our comrades list.
      _.remove(this.me.comrades, {id: this.selectedComrade.id});

      // Close the modal.
      this.selectedComrade = undefined;
      this.confirmRemoveComradeModalOpen = false;
      this.cloudError = '';
    },

    clickApproveComrade: async function(userId) {
      // Prevent double-posting
      if(this.syncing) {
        return;
      }
      this.syncing = true;
      await Cloud.approveComrade.with({ id: userId });
      // Add this user to our approved comrades list.
      var approvedComrade =_.find(this.me.inboundComradeRequests, {id: userId});
      this.me.comrades.unshift({
        id: approvedComrade.id,
        fullName: approvedComrade.fullName,
        emailAddress: approvedComrade.emailAddress
      });
      // Remove this user from our comrades list.
      _.remove(this.me.inboundComradeRequests, {id: userId});
      // Clear loading state
      this.syncing = false;
    },
  },
});

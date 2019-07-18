parasails.registerPage('group', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {

    virtualPageSlug: '',

    memberOf: undefined,

    createGroupFormData: {
      name: '',
      emailAddress: ''
    },

    // Form data
    formData: { /* … */ },

    // validation Errors
    formErrors: {},

    // Syncing / loading state
    syncing: false,

    // Server error state
    cloudError: '',

    // Success state when form has been submitted
    cloudSuccess: false,

    selectedGroup: undefined,

    confirmDeleteGroupModalOpen: false,

  },

  virtualPages: true,
  html5HistoryMode: 'history',
  virtualPagesRegExp: new RegExp(/^\/group\/?([^\/]+)?/),

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);

    // load the group if it exists
    this.memberOf = this.me.memberOf;

  },
  mounted: async function () {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    clickCreateGroup: function () {
      // Open the modal.
      this.goto('/group/new');
    },

    _clearCreateGroupModal: function () {
      this.goto('/group');
      // Reset form data.
      this.createGroupFormData = {
        name: '',
        emailAddress: ''
      };
      this.formErrors = {};
      this.cloudError = '';
    },

    closeCreateGroupModal: function () {
      this._clearCreateGroupModal();
    },

    handleParsingCreateGroupForm: function () {
      this.formErrors = {};
      var argins = this.createGroupFormData;
      // Check if there are any invalid fields.
      var isValidEmailAddress = parasails.util.isValidEmailAddress;

      if (!argins.name) {
        this.formErrors.name = true;
      }

      if (argins.emailAddress === '' || !isValidEmailAddress(argins.emailAddress)) {
        this.formErrors.emailAddress = true;
      }

      if (Object.keys(this.formErrors).length > 0) {
        return;
      }
      return argins;
    },

    submittedCreateGroupForm: function () {
      this.closeCreateGroupModal();
    },

    clickDeleteGroup: function (groupID) {
      this.confirmDeleteGroupModalOpen = true;
      this.selectedGroup = groupID;

    },

    closeDeleteGroupModal: function () {
      this.selectedGroup = undefined;
      this.confirmDeleteGroupModalOpen = false;
    },

    handleParsingDeleteGroupForm: function () {
      return {
        id: this.selectedGroup
      };
    },

    submittedDeleteGroupForm: function () {
      this.memberOf = undefined;
      this.$forceUpdate();
      this.confirmDeleteGroupModalOpen = false;
      this.selectedGroup = undefined;
    }
  }
});

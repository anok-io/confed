parasails.registerPage('group', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {

    virtualPageSlug: '',

    group: {},

    local: {},

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

    selectedMeeting: undefined,

    confirmDeleteMeetingModalOpen: false,

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
  },
  mounted: async function () {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

    // Create Group

    clickCreateGroup: function () {
      // Open the modal.
      this.goto('/group/new');
    },

    _clearCreateGroupModal: function () {
      this.goto('/group');
      // Reset form data.
      this.formData = {};
      this.formErrors = {};
      this.cloudError = '';
    },

    closeCreateGroupModal: function () {
      this._clearCreateGroupModal();
    },

    handleParsingCreateGroupForm: function () {
      this.formErrors = {};
      var argins = this.formData;
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

    // Create Meeting

    clickCreateMeeting: function () {
      // Open the modal.
      var date = new Date();
      this.formData.date = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
        .toISOString()
        .split("T")[0];
      this.goto('/group/newmeeting');
    },

    _clearCreateMeetingModal: function () {
      this.goto('/group');
      // Reset form data.
      this.formData = {};
      this.formErrors = {};
      this.cloudError = '';
    },

    closeCreateMeetingModal: function () {
      this._clearCreateMeetingModal();
    },

    handleParsingCreateMeetingForm: function () {
      this.formErrors = {};
      var argins = this.formData;
      // Check if there are any invalid fields.

      if (!argins.date) {
        this.formErrors.date = true;
      }
      if (!argins.assembly) {
        this.formErrors.assembly = true;
      }

      if (Object.keys(this.formErrors).length > 0) {
        return;
      }
      return argins;
    },

    submittedCreateMeetingForm: function () {
      this.closeCreateMeetingModal();
    },

    // Delete Meeting

    clickDeleteMeeting: function (meetingID) {
      this.confirmDeleteMeetingModalOpen = true;
      this.selectedMeeting = meetingID;

    },

    closeDeleteMeetingModal: function () {
      this.selectedMeeting = undefined;
      this.confirmDeleteMeetingModalOpen = false;
    },

    handleParsingDeleteMeetingForm: function () {
      return {
        id: this.selectedMeeting
      };
    },

    submittedDeleteMeetingForm: function () {
      this.confirmDeleteMeetingModalOpen = false;
      this.selectedGroup = undefined;
      this.$forceUpdate();
    },

    // Delete Group

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
      this.confirmDeleteGroupModalOpen = false;
      this.selectedGroup = undefined;
      this.$forceUpdate();
    }
  }
});

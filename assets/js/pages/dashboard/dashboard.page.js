parasails.registerPage('dashboard', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {

    virtualPageSlug: '',

    group: {},

    local: {},

    meetings: [],

    createGroupFormData: {
      name: '',
      emailAddress: ''
    },

    createMeetingformData: {
      date: '',
      assembly: ''
    },

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
  virtualPagesRegExp: new RegExp(/^\/dashboard\/?([^\/]+)?/),

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
      this.goto('/dashboard/new');
    },

    _clearCreateGroupModal: function () {
      this.goto('/dashboard');
      // Reset form data.
      this.createGroupformData = {};
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

    submittedCreateGroupForm: function (data) {
      this.group = data.group;
      this.$forceUpdate();
      this.closeCreateGroupModal();
    },

    // Create Meeting

    clickCreateMeeting: function () {
      // Open the modal.
      var date = new Date();
      this.createMeetingformData.date = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
        .toISOString()
        .split("T")[0];
      this.goto('/dashboard/newmeeting');
    },

    _clearCreateMeetingModal: function () {
      this.goto('/dashboard');
      // Reset form data.
      this.createMeetingformData = {};
      this.formErrors = {};
      this.cloudError = '';
    },

    closeCreateMeetingModal: function () {
      this._clearCreateMeetingModal();
    },

    handleParsingCreateMeetingForm: function () {
      this.formErrors = {};
      var argins = this.createMeetingformData;
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

    submittedCreateMeetingForm: function (data) {
      this.meetings.unshift(data);
      this.closeCreateMeetingModal();
    },

    // Delete Meeting

    clickDeleteMeeting: function (meetingID) {
      this.selectedMeeting = _.find(this.meetings, {id: meetingID});
      this.confirmDeleteMeetingModalOpen = true;
    },

    closeDeleteMeetingModal: function () {
      this.selectedMeeting = undefined;
      this.confirmDeleteMeetingModalOpen = false;
      this.cloudError = '';
    },

    handleParsingDeleteMeetingForm: function () {
      return {
        id: this.selectedMeeting.id
      };
    },

    submittedDeleteMeetingForm: function () {
      _.remove(this.meetings, {id: this.selectedMeeting.id});
      this.selectedMeeting = undefined;
      this.confirmDeleteMeetingModalOpen = false;
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
      this.group = {};
      this.$forceUpdate();
    },

  }
});

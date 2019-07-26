module.exports = {


  friendlyName: 'View dashboard',


  description: 'Display "Dashboard" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/dashboard/dashboard',
      description: 'Display the dashboard page for authenticated users.'
    }

  },

  fn: async function () {
    var group = await Group.findOne({
      id: this.req.me.group
    }).populate('members', {
      select: ['fullName', 'lastSeenAt', 'username']
    });

    // the ID of the local
    if (group && group.local) {
      var localGroups = await Local.findOne({
        id: group.local
      }).populate('groups');
    } else {
      var localGroups = undefined;
    }

    var meetings = await Meeting.find({
      or: [
        // Comrades meetings:
        { creator: { 'in': _.pluck(this.req.me.comrades, 'id') } },
        // My meetings:
        { creator: this.req.me.id }
      ],
      assembly: 'group'
    }).populate('agenda');

    if (!group) {group = undefined;}
    if (!localGroups) {localGroups = undefined;}
    if (!meetings) {meetings = undefined;}

    return {
      group: group,
      local: localGroups,
      meetings: meetings
    };
  }
};

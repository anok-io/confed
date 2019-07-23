module.exports = {


  friendlyName: 'View group',


  description: 'Display "Group" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/group/group'
    }

  },


  fn: async function () {
    var group = await Group.findOne({
      id: this.req.me.group
    }).populate('members');

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
    if (!meetings) {localGroups = undefined;}

    return {
      group: group,
      local: localGroups,
      meetings: meetings
    };
  }
};

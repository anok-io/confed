module.exports = {


  friendlyName: 'View group',


  description: 'Display "Group" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/group/group'
    }

  },


  fn: async function () {
    // Return users group if it exists, otherwise prompt for creating a group
    var group = 'not yet chosen'; // setting a default for new users
    var comrades = [];
    if (this.req.me.memberOf) {
      group = await Group.findOne({
        id: this.req.me.memberOf
      }).populate('members');
      comrades = await User.find({
        or: [
          { memberOf: group.id}
        ],
        and: [{
          id: { '!=': this.req.me.id }
        }]
      });
    }
    // TODO: Groups that are returned here should be other groups in the same local.
    var allGroups = await Group.find();
    if (!allGroups) {
      allGroups = [{name: 'No groups yet exist'}];
    }
    return {allGroups, group, comrades};

  }
};

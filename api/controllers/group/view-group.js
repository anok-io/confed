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
    var memberOf = 'not yet chosen'; // setting a default for new users
    if (this.req.me.memberOf) {
      memberOf = await Group.findOne(this.req.me.memberOf);
    }
    // Groups that are returned here should be other groups in the same local.
    var allGroups = await Group.find();
    if (!allGroups) {
      allGroups = [{name: 'No groups yet exist'}];
    }
    return {allGroups, memberOf};

  }
};

module.exports = {


  friendlyName: 'View group',


  description: 'Display "Group" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/group/group'
    }

  },


  fn: async function () {
    // TODO: Groups that are returned here should be other groups in the same local.
    var allGroups = await Group.find();
    if (!allGroups) {
      allGroups = [{name: 'No groups yet exist'}];
    }
    return {allGroups};

  }
};

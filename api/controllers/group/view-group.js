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
    // Note the memberOf.memberOf traverses up a level to the Local
    try {
      var group = await Group.findOne(this.req.me.memberOf.id);
    } catch (err) {
      return {
        group: null,
        local: null
      };
    }

    try {
      var localID = this.req.me.memberOf.memberOf;

      var localGroups = await Local.findOne(localID).populate('members');
      if (!localGroups) {
        localGroups = [{name: 'Your group is not a member of a Local'}];
      }
      return {
        group: group,
        local: localGroups
      };
    } catch (err) {
      return {
        group: group,
        local: null
      };
    }

  }
};

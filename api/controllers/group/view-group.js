module.exports = {


  friendlyName: 'View group',


  description: 'Display "Group" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/group/group'
    }

  },


  fn: async function () {
    // Note the memberOf.memberOf traverses up a level to the Local
    try {
      var group = await Group.findOne({
        id: this.req.me.memberOf.id
      });
    } catch (err) {
      // If they have no group, they have no local either
      return {
        group: null,
        local: null
      };
    }

    try {
      // the ID of the local
      var localID = this.req.me.memberOf.memberOf;

      var localGroups = await Local.findOne({
        id: localID
      }).populate('members');

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

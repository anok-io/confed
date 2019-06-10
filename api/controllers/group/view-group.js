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
    var usersGroup = "not yet chosen"; // setting a default for new users
    if (this.req.me.usersGroup) {
    var usersGroup = await Group.findOne(this.req.me.usersGroup); 
    }
    // Groups that are returned here should be local groups.
    var allGroups = await Group.find();
    if (!allGroups) {
      allGroups = [{name: "No groups yet exist"}];
    }
    // TODO Return Local name
    // TODO Return Regional name
    // TODO Return Federation name
    // TODO Return Confederation name
    // TODO Respond with view.
    return {allGroups, usersGroup};

  }
};

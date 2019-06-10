module.exports = {


  friendlyName: 'View group',


  description: 'Display "Group" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/group/group'
    }

  },


  fn: async function () {
    // Groups that are returned here should be local groups.
    let allGroups = await Group.find();
    let usersGroup = await Group.findOne(this.req.me.userGroup);
    let group = usersGroup.name;
    // TODO Return Local name
    // TODO Return Regional name
    // TODO Return Federation name
    // TODO Return Confederation name
    // TODO Respond with view.
    return {allGroups, group};

  }
};

module.exports = {


  friendlyName: 'View group',


  description: 'Display "Group" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/group/group'
    }

  },


  fn: async function (req,res) {
    let allGroups = await Group.find();
    let usersGroup = await Group.findOne(1).populate('members');
    // Respond with view.
    return {allGroups, usersGroup};

  }
};

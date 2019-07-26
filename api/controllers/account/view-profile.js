module.exports = {


  friendlyName: 'View profile',


  description: 'Display "Profile" page.',

  inputs: {
    username: {
      type: 'string'
    }
  },

  exits: {

    success: {
      viewTemplatePath: 'pages/account/profile'
    }

  },


  fn: async function (inputs) {
    var user = await User.findOne({
      where: { username: inputs.username },
      select: ['fullName', 'username', 'group']
    }).populate('group');
    return {
      user: user,
      group: user.group
    };

  }


};

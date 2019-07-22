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
      username: inputs.username
    });
    return {user};

  }


};

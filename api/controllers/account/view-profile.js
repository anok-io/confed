module.exports = {


  friendlyName: 'View profile',


  description: 'Display "Profile" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/account/profile'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};

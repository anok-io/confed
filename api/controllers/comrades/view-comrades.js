module.exports = {


  friendlyName: 'View comrades',


  description: 'Display "Comrades" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/comrades/comrades'
    }

  },


  fn: async function () {

    // Respond with view.
    return {
      currentSection: 'comrades'
    };

  }


};

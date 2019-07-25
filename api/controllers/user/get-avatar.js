module.exports = {


  friendlyName: 'Get avatar',


  description: '',


  inputs: {
    id: {
      type: 'number'
    }
  },


  exits: {

    notFound: {
      responseType: 'notFound'
    },

  },


  fn: async function (inputs, exits) {
    var user = await User.findOne({ id: inputs.id });
    if (!user) { throw 'notFound'; }
    if (user.avatarFd) {
      this.res.type(user.avatarMime);
      var downloading = await sails.startDownload(user.avatarFd);
      return exits.success(downloading);
    } else {
      this.res.type('image/png');
      var downloading = await sails.startDownload('assets/images/hero-ship.png');
      return exits.success(downloading);
    }
  }
};

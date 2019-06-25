module.exports = {


  friendlyName: 'Get avatar',


  description: '',


  inputs: {
    id: {
      type: 'number'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    await console.log('inputs.id = ' + inputs.id );
    var user = await User.findOne({id: inputs.id});
    if (!user) { throw 'notFound'; }

    this.res.type(user.avatarMime);

    var downloading = await sails.startDownload(user.avatarFd);

    return exits.success(downloading);


  }


};

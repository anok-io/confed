module.exports = {


  friendlyName: 'Upload avatar',


  description: '',

  files: ['avatar'],

  inputs: {
    avatar: {
      type: 'ref',
      description: 'Uploaded file stream',
      required: true
    }
  },


  exits: {
    success: {
      outputDescription: 'The newly created Avatar.',
      outputExample: {}
    },

    noFileAttached: {
      description: 'No file was attached.',
      responseType: 'badRequest'
    },

    tooBig: {
      description: 'The file is too big.',
      responseType: 'badRequest'
    },
  },


  fn: async function ({ avatar }) {
    var url = require('url');
    var util = require('util');

    // Upload the image.
    var info = await sails.uploadOne(avatar, {
      maxBytes: 100000,
      dirname: require('path').resolve(sails.config.appPath, 'uploads')
    })
      // Note: E_EXCEEDS_UPLOAD_LIMIT is the error code for exceeding
      // `maxBytes` for both skipper-disk and skipper-s3.
      .intercept('E_EXCEEDS_UPLOAD_LIMIT', 'tooBig')
      .intercept((err) => new Error('The avatar upload failed: ' + util.inspect(err)));

    if (!info) {
      throw 'noFileAttached';
    }

    // Image should be uploaded, so remove the old avatar file on the system if it exists
    // TODO : for some reason the file is not being removed ...
    // TODO " error checking
    var fs = require('fs');
    fs.unlink(this.req.me.avatarFd, (err) => {
      if (err) {
        throw err;
      }
      // if no error, file has been deleted successfully
      console.log('File deleted!');
    });


    // Update the users avatar record.
    await User.update(this.req.me.id, {
      avatarFd: info.fd,
      avatarMime: info.type,
    });

    var imageSrc = url.resolve(sails.config.custom.baseUrl, '/api/v1/user/' + this.req.me.id + '/avatar');
    // Return the newly-created avatars `imageSrc`
    return imageSrc;

  }



};

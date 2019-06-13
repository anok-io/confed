module.exports = {

uploadAvatar: function (req, res) {

  req.file('avatar').upload({
    // don't allow the total upload size to exceed ~10MB
    maxBytes: 10000000,
    dirname: require('path').resolve(sails.config.appPath, 'uploads')
  },function whenDone(err, uploadedFiles) {
    if (err) {
      return res.serverError(err);
    }

    // If no files were uploaded, respond with an error.
    if (uploadedFiles.length === 0){
      return res.badRequest('No file was uploaded');
    }

    // Get the base URL for our deployed application from our custom config
    // (e.g. this might be "http://foobar.example.com:1339" or "https://example.com")
    var baseUrl = sails.config.custom.baseUrl;

    // Save the "fd" and the url where the avatar for a user can be accessed
    User.update(req.session.userId, {

      // Generate a unique URL where the avatar can be downloaded.
      avatarUrl: require('util').format('%s/user/avatar/%s', baseUrl, req.session.userId),

      // Grab the first file and use it's `fd` (file descriptor)
      avatarFd: uploadedFiles[0].fd
    })
    .exec(function (err){
      if (err) return res.serverError(err);
      return res.ok();
    });
  });
},


avatar: function (req, res){

  User.findOne(req.param('id')).exec(function (err, user){
    if (err) return res.serverError(err);
    if (!user) return res.notFound();

    // User has no avatar image uploaded.
    // (should have never have hit this endpoint and used the default image)
    if (!user.avatarFd) {
      return res.notFound();
    }

    var SkipperDisk = require('skipper-disk');
    var fileAdapter = SkipperDisk(/* optional opts */);

    // set the filename to the same file as the user uploaded
    res.set("Content-disposition", "attachment; filename='" + file.name + "'");

    // Stream the file down
    fileAdapter.read(user.avatarFd)
    .on('error', function (err){
      return res.serverError(err);
    })
    .pipe(res);
  });
}
};

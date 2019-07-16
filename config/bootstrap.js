/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function() {

  // Import dependencies
  var path = require('path');

  // This bootstrap version indicates what version of fake data we're dealing with here.
  var HARD_CODED_DATA_VERSION = 4;

  // This path indicates where to store/look for the JSON file that tracks the "last run bootstrap info"
  // locally on this development computer (if we happen to be on a development computer).
  var bootstrapLastRunInfoPath = path.resolve(sails.config.appPath, '.tmp/bootstrap-version.json');

  // Whether or not to continue doing the stuff in this file (i.e. wiping and regenerating data)
  // depends on some factors:
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // If the hard-coded data version has been incremented, or we're being forced
  // (i.e. `--drop` or `--environment=test` was set), then run the meat of this
  // bootstrap script to wipe all existing data and rebuild hard-coded data.
  if (sails.config.models.migrate !== 'drop' && sails.config.environment !== 'test') {
    // If this is _actually_ a production environment (real or simulated), or we have
    // `migrate: safe` enabled, then prevent accidentally removing all data!
    if (process.env.NODE_ENV==='production' || sails.config.models.migrate === 'safe') {
      sails.log('Since we are running with migrate: \'safe\' and/or NODE_ENV=production (in the "'+sails.config.environment+'" Sails environment, to be precise), skipping the rest of the bootstrap to avoid data loss...');
      return;
    }//•

    // Compare bootstrap version from code base to the version that was last run
    var lastRunBootstrapInfo = await sails.helpers.fs.readJson(bootstrapLastRunInfoPath)
    .tolerate('doesNotExist');// (it's ok if the file doesn't exist yet-- just keep going.)

    if (lastRunBootstrapInfo && lastRunBootstrapInfo.lastRunVersion === HARD_CODED_DATA_VERSION) {
      sails.log('Skipping v'+HARD_CODED_DATA_VERSION+' bootstrap script...  (because it\'s already been run)');
      sails.log('(last run on this computer: @ '+(new Date(lastRunBootstrapInfo.lastRunAt))+')');
      return;
    }//•

    sails.log('Running v'+HARD_CODED_DATA_VERSION+' bootstrap script...  ('+(lastRunBootstrapInfo ? 'before this, the last time the bootstrap ran on this computer was for v'+lastRunBootstrapInfo.lastRunVersion+' @ '+(new Date(lastRunBootstrapInfo.lastRunAt)) : 'looks like this is the first time the bootstrap has run on this computer')+')');
  }
  else {
    sails.log('Running bootstrap script because it was forced...  (either `--drop` or `--environment=test` was used)');
  }

  // Since the hard-coded data version has been incremented, and we're running in
  // a "throwaway data" environment, delete all records from all models.
  for (let identity in sails.models) {
    await sails.models[identity].destroy({});
  }//∞

  // By convention, this is a good place to set up fake data during development.
  var anarchoSyn = await User.create({
    emailAddress: 'admin@example.com',
    fullName: 'Anarcho Syn',
    isSuperAdmin: true,
    password: await sails.helpers.passwords.hashPassword('abc123')
  }).fetch();

  var rudolphRocker = await User.create({
    emailAddress: 'rocker@example.com',
    fullName: 'Rudolph Rocker',
    password: await sails.helpers.passwords.hashPassword('abc123'),
  }).fetch();

  var testUser = await User.create({
    emailAddress: 'testuser@example.com',
    fullName: 'Test User',
    password: await sails.helpers.passwords.hashPassword('abc123')
  }).fetch();

  // Add some initial comrades in the system
  // addCollection(owner of the association, association name, members being added)
  await User.addToCollection(testUser.id, 'comrades', anarchoSyn.id);
  await User.addToCollection(anarchoSyn.id, 'comrades', testUser.id);

  // Setup ASF-IWA
  // create groups ASF NWT and ASF MNE and add our base users to them

  var asfNWT = await Group.create({
    name: 'ASF-NWT',
    emailAddress: 'info@asf-iwa.org.au',
  }).fetch();
  await Group.addToCollection(asfNWT.id, 'members', anarchoSyn.id);
  await Group.addToCollection(asfNWT.id, 'members', rudolphRocker.id);

  var asfMNE = await Group.create({
    name: 'ASF Melbourne North East',
    emailAddress: 'info@asf-iwa.org.au',
  }).fetch();
  await Group.addToCollection(asfMNE.id, 'members', testUser.id);

  // Add locals and add our groups to it
  var asfNwtLocal = await Local.create({
    name: 'ASF North West Tasmania Local',
    emailAddress: 'info@asf-iwa.org.au',
  }).fetch();
  await Local.addToCollection(asfNwtLocal.id, 'members', asfNWT.id);

  var asfMelbourne = await Local.create({
    name: 'ASF Melbourne',
    emailAddress: 'info@asf-iwa.org.au',
  }).fetch();
  await Local.addToCollection(asfMelbourne.id, 'members', asfMNE.id);
  // add regionals and add our locals to it
  var asfTasmania = await Regional.create({
    name: 'ASF Tasmania',
    emailAddress: 'info@asf-iwa.org.au',
  }).fetch();
  await Local.addToCollection(asfTasmania.id, 'members', asfNwtLocal.id);

  var asfVictoria = await Regional.create({
    name: 'ASF Victoria',
    emailAddress: 'info@asf-iwa.org.au',
  }).fetch();
  await Local.addToCollection(asfVictoria.id, 'members', asfMelbourne.id);

  // add federation and add our regionals to it
  var asfIwa = await Federation.create({
    name: 'ASF-IWA',
    emailAddress: 'info@asf-iwa.org.au',
  }).fetch();
  await Local.addToCollection(asfIwa.id, 'members', [asfVictoria.id, asfTasmania.id]);

  // add confederation and add our federation to it.
  var iwaAIT = await Confederation.create({
    name: 'IWA-AIT',
    emailAddress: 'info@asf-iwa.org.au',
  }).fetch();
  await Local.addToCollection(iwaAIT.id, 'members', asfIwa.id);

  // something to be used to test adding Locals, regionals etc
  // and checking isn't listed elsewhere until then
  await Group.createEach([
    { name: 'ASF Perth', emailAddress: 'info@asf-iwa.org.au', members: [] },
    { name: 'ASF Brisbane', emailAddress: 'info@asf-iwa.org.au', members: [] },
    { name: 'ASF Hobart', emailAddress: 'info@asf-iwa.org.au', members: [] },
  ]);

  // Save new bootstrap version
  await sails.helpers.fs.writeJson.with({
    destination: bootstrapLastRunInfoPath,
    json: {
      lastRunVersion: HARD_CODED_DATA_VERSION,
      lastRunAt: Date.now()
    },
    force: true
  })
  .tolerate((err)=>{
    sails.log.warn('For some reason, could not write bootstrap version .json file.  This could be a result of a problem with your configured paths, or, if you are in production, a limitation of your hosting provider related to `pwd`.  As a workaround, try updating app.js to explicitly pass in `appPath: __dirname` instead of relying on `chdir`.  Current sails.config.appPath: `'+sails.config.appPath+'`.  Full error details: '+err.stack+'\n\n(Proceeding anyway this time...)');
  });

};

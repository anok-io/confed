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

  // For dealing with dates across the app.
  sails.moment = require('moment');

  // This bootstrap version indicates what version of fake data we're dealing with here.
  var HARD_CODED_DATA_VERSION = 7;

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
    username: await 'anarcho-syn',
    password: await sails.helpers.passwords.hashPassword('abc123'),
  }).fetch();

  var axxs = await User.create({
    emailAddress: 'axxs@example.com',
    fullName: 'Axxs',
    isSuperAdmin: true,
    username: 'axxs',
    password: await sails.helpers.passwords.hashPassword('abc123'),
  }).fetch();

  var blackCat = await User.create({
    emailAddress: 'blackcat@example.com',
    fullName: 'Black Cat',
    username: 'black-cat',
    password: await sails.helpers.passwords.hashPassword('abc123'),
  }).fetch();

  var nando = await User.create({
    emailAddress: 'nando@example.com',
    fullName: 'Nando',
    username: 'nando',
    password: await sails.helpers.passwords.hashPassword('abc123'),
  }).fetch();

  var dee = await User.create({
    emailAddress: 'dee@example.com',
    fullName: 'Deanna',
    username: 'deanna',
    password: await sails.helpers.passwords.hashPassword('abc123'),
  }).fetch();

  var rudolphRocker = await User.create({
    emailAddress: 'rocker@example.com',
    fullName: 'Rudolph Rocker',
    username: 'rudolph-rocker',
    password: await sails.helpers.passwords.hashPassword('abc123'),
  }).fetch();

  var testUser1 = await User.create({
    emailAddress: 'testuser1@example.com',
    fullName: 'NME User 1',
    username: 'nme-user-1',
    password: await sails.helpers.passwords.hashPassword('abc123'),
  }).fetch();

  var testUser2 = await User.create({
    emailAddress: 'testuser2@example.com',
    fullName: 'NME User 2',
    username: 'nme-user-2',
    password: await sails.helpers.passwords.hashPassword('abc123'),
  }).fetch();

  var testUser3 = await User.create({
    emailAddress: 'testuser3@example.com',
    fullName: 'NME User 3',
    username: 'nme-user-3',
    password: await sails.helpers.passwords.hashPassword('abc123'),
  }).fetch();

  var testUser4 = await User.create({
    emailAddress: 'testuser4@example.com',
    fullName: 'NME User 4',
    username: 'nme-user-4',
    password: await sails.helpers.passwords.hashPassword('abc123'),
  }).fetch();

  var testUser5 = await User.create({
    emailAddress: 'testuser5@example.com',
    fullName: 'Geelong User 5',
    username: 'geelong-user-5',
    password: await sails.helpers.passwords.hashPassword('abc123'),
  }).fetch();

  var testUser6 = await User.create({
    emailAddress: 'testuser6@example.com',
    fullName: 'Geelong User 6',
    username: 'geelong-user-6',
    password: await sails.helpers.passwords.hashPassword('abc123'),
  }).fetch();

  var testUser7 = await User.create({
    emailAddress: 'testuser7@example.com',
    fullName: 'Geelong User 7',
    username: 'geelong-user-7',
    password: await sails.helpers.passwords.hashPassword('abc123'),
  }).fetch();

  var testUser8 = await User.create({
    emailAddress: 'testuser8@example.com',
    fullName: 'Geelong User 8',
    username: 'geelong-user-8',
    password: await sails.helpers.passwords.hashPassword('abc123'),
  }).fetch();

  // Add some initial comrades in the system
  // addCollection(owner of the association, association name, members being added)

  // ASF-NWT
  await User.addToCollection(anarchoSyn.id, 'comrades', [axxs.id,blackCat.id,nando.id,dee.id]);
  await User.addToCollection(axxs.id, 'comrades', [anarchoSyn.id,blackCat.id,nando.id,dee.id]);
  await User.addToCollection(blackCat.id, 'comrades', [axxs.id,anarchoSyn.id,nando.id,dee.id]);
  await User.addToCollection(nando.id, 'comrades', [axxs.id,blackCat.id,anarchoSyn.id,dee.id]);
  await User.addToCollection(dee.id, 'comrades', [axxs.id,blackCat.id,nando.id,anarchoSyn.id]);

  //ASF-MNE
  await User.addToCollection(rudolphRocker.id, 'comrades', [testUser1.id,testUser2.id,testUser3.id,testUser4.id]);
  await User.addToCollection(testUser1.id, 'comrades', [rudolphRocker.id,testUser2.id,testUser3.id,testUser4.id]);
  await User.addToCollection(testUser2.id, 'comrades', [testUser1.id,rudolphRocker.id,testUser3.id,testUser4.id]);
  await User.addToCollection(testUser3.id, 'comrades', [testUser1.id,testUser2.id,rudolphRocker.id,testUser4.id]);
  await User.addToCollection(testUser4.id, 'comrades', [testUser1.id,testUser2.id,testUser3.id,rudolphRocker.id]);

  //ASF-Geelong
  await User.addToCollection(testUser5.id, 'comrades', [testUser6.id,testUser7.id,testUser8.id]);
  await User.addToCollection(testUser6.id, 'comrades', [testUser5.id,testUser7.id,testUser8.id]);
  await User.addToCollection(testUser7.id, 'comrades', [testUser5.id,testUser6.id,testUser8.id]);
  await User.addToCollection(testUser8.id, 'comrades', [testUser5.id,testUser6.id,testUser7.id]);

  // Setup ASF-IWA
  // ASF has groups that are members of the Federation.
  // In Melbourne there is the Melbourne local, and the Victorian regional
  // which includes Geelong.
  // create groups ASF NWT and ASF MNE and add our base users to them

  var asfNWT = await Group.create({
    name: 'ASF-NWT',
    emailAddress: 'info@asf-iwa.org.au',
  }).fetch();
  await Group.addToCollection(asfNWT.id, 'members', anarchoSyn.id);
  await Group.addToCollection(asfNWT.id, 'members', axxs.id);
  await Group.addToCollection(asfNWT.id, 'members', blackCat.id);
  await Group.addToCollection(asfNWT.id, 'members', nando.id);
  await Group.addToCollection(asfNWT.id, 'members', dee.id);

  var asfMN = await Group.create({
    name: 'ASF Melbourne North',
    emailAddress: 'info@asf-iwa.org.au',
  }).fetch();
  await Group.addToCollection(asfMN.id, 'members', rudolphRocker.id);
  await Group.addToCollection(asfMN.id, 'members', testUser1.id);
  await Group.addToCollection(asfMN.id, 'members', testUser2.id);
  await Group.addToCollection(asfMN.id, 'members', testUser3.id);
  await Group.addToCollection(asfMN.id, 'members', testUser4.id);

  var asfGeelong = await Group.create({
    name: 'ASF Geelong',
    emailAddress: 'info@asf-iwa.org.au',
  }).fetch();
  await Group.addToCollection(asfGeelong.id, 'members', testUser5.id);
  await Group.addToCollection(asfGeelong.id, 'members', testUser6.id);
  await Group.addToCollection(asfGeelong.id, 'members', testUser7.id);
  await Group.addToCollection(asfGeelong.id, 'members', testUser8.id);

  // something to be used to test adding Locals, regionals etc
  // and checking isn't listed elsewhere until then
  await Group.createEach([
    { name: 'ASF Perth', emailAddress: 'info@asf-iwa.org.au', members: [] },
    { name: 'ASF Brisbane', emailAddress: 'info@asf-iwa.org.au', members: [] },
    { name: 'ASF Hobart', emailAddress: 'info@asf-iwa.org.au', members: [] },
  ]);

  // Add locals and add our groups to it
  var asfNwtLocal = await Local.create({
    name: 'ASF North West Tasmania Local',
    emailAddress: 'info@asf-iwa.org.au',
  }).fetch();
  await Local.addToCollection(asfNwtLocal.id, 'groups', asfNWT.id);

  var asfMelbourne = await Local.create({
    name: 'ASF Melbourne',
    emailAddress: 'info@asf-iwa.org.au',
  }).fetch();
  await Local.addToCollection(asfMelbourne.id, 'groups', asfMN.id);

  // add regionals and add our locals to it, as well as a group to test a lack of a local in the NW of Tassie
  var asfTasmania = await Regional.create({
    name: 'ASF Tasmania',
    emailAddress: 'info@asf-iwa.org.au',
  }).fetch();
  await Regional.addToCollection(asfTasmania.id, 'locals', asfNwtLocal.id);
  await Regional.addToCollection(asfTasmania.id, 'groups', asfNWT.id);

  // likewise, add ASF-NME to the regional, along with Geelong
  var asfVictoria = await Regional.create({
    name: 'ASF Victoria',
    emailAddress: 'info@asf-iwa.org.au',
  }).fetch();
  await Regional.addToCollection(asfVictoria.id, 'locals', asfMelbourne.id);
  await Regional.addToCollection(asfVictoria.id, 'groups', [asfMN.id,asfGeelong.id]);

  // add federation and add our regionals to it
  // We are also adding the groups as in the format of the ASF, until we have locals and regionals
  // groups are members of the federation. Melbourne is the only area that has a regional.

  var asfIwa = await Federation.create({
    name: 'ASF-IWA',
    emailAddress: 'info@asf-iwa.org.au',
  }).fetch();
  await Federation.addToCollection(asfIwa.id, 'regionals', [asfVictoria.id, asfTasmania.id]);
  await Federation.addToCollection(asfIwa.id, 'groups', [asfNWT.id, asfGeelong.id, asfMN.id]);

  // add confederation and add our federation to it.
  var iwaAIT = await Confederation.create({
    name: 'IWA-AIT',
    emailAddress: 'info@asf-iwa.org.au',
  }).fetch();
  await Confederation.addToCollection(iwaAIT.id, 'federations', asfIwa.id);

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

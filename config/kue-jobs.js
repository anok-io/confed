/**
* File Upload Settings
* (sails.config.kueJobs)
*
* These options is used to configure the params for the custom hook: kue-jobs.
*
* > This file is mainly useful for configuring how the kue-jobs hook connect
* > to redis, and how to process the available jobs.
*
* For all available options, see:
* https://github.com/deepakgonda/sails-hook-kue-based-jobs
*/

module.exports.kueJobs = {

  /***************************************************************************

      Most of the time, the following options should not be changed.
      (Instead, you might want to have a look at `config/env/production.js`.)

  ***************************************************************************/
  redisUrl: 'redis://redis:6379',
  enableApi: true,        // Will expose Job Status APi's on port 3000

};

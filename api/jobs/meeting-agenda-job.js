module.exports = function (job, done) {
  sails.log.info('Meeting Agenda is done.');
  sails.log.info('ID =>', job.data.id);
  sails.log.info('group =>', job.data.group);
  sails.log.info('date =>', job.data.date);
  done();
};

/***************************************************************************
 * Set up a job

 var today = new Date();
 var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
 var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
 var dateTime = date+' '+time;

 var job = sails.queue.create('meetingAgendaJob', {
  title: 'ASF NWT Meeting for '+ dateTime,
  id: 432,
  group: 3,
  date: dateTime
}).delay(30000).save( function(err){
  if( !err ) console.log( job.id );
});


 *************************************************************************/



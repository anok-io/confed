module.exports = {


  friendlyName: 'Create a meeting',


  description: 'Create a meeting.',


  inputs: {

    date: {
      type: 'string',
      description: 'The date of the meeting.',
      example: '2019-04-13',
      required: true
    },

    assembly: {
      type: 'string',
      description: 'The assembly where this meeting is to be held.',
      isIn: ['group', 'local', 'regional', 'federation', 'confederation'],
      defaultsTo: 'group'
    },

  },


  exits: {
    success: {
      outputDescription: 'The newly created `Meeting`.',
      outputExample: {}
    },

  },


  fn: async function (inputs) {
    sails.log('Controller create-meeting called.');
    // ensure this is input in unix time
    var date = sails.moment(inputs.date).valueOf();
    var assembly = inputs.assembly.toLowerCase() || 'group';

    // Create a new meeting record.
    var newMeeting = await Meeting.create({
      date: date,
      assembly: assembly,
    }).fetch();
    // add the creating user to the meeting
    await Meeting.update(newMeeting.id, {
      'creator' : this.req.me.id,
    });
    return {
      id: newMeeting.id
    };
  }


};

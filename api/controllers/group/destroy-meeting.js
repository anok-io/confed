module.exports = {


  friendlyName: 'Destroy my meeting',


  description: 'Delete a meeting the user is the creator of if it has no agenda items',


  inputs: {
    id: {
      type: 'number',
      required: true
    }
  },


  exits: {
    forbidden: {
      description: 'The user making this request doesn\'t have the permissions to delete this meeting',
      responseType: 'forbidden' // res.forbidden
    }
  },


  fn: async function (inputs) {
    var meeting = await Meeting.findOne({
      id: inputs.id
    }).populate('creator');
    if (this.req.me.id !== meeting.creator || meeting.agendaitems > 1 ) {
      throw 'forbidden';
    }
    // only allow destruction of a meeting if there are no agenda items
    if (this.req.me.id === meeting.creator && meeting.agendaitems < 1) {
      await Meeting.destroy({id:inputs.id});
    }
    return {};
  }


};

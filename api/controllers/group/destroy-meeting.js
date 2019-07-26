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


  fn: async function ({id}) {
    var meeting = await Meeting.findOne({
      id: id
    }).populate('creator')
      .populate('agenda');

    if (this.req.me.id !== meeting.creator.id || meeting.agenda > 1 ) {
      throw 'forbidden';
    }

    await Meeting.destroy({id});
  }


};

module.exports = {


  friendlyName: 'Approve comrade',


  description: 'Approve the pending comrade request from the user with the specified ID.',


  inputs: {

    id: {
      description: 'The ID of the user to approve as a comrade.',
      type: 'number',
      example: 8381,
      required: true
    }

  },


  exits: {

    notFound: {
      description: 'There is no pending comrade request from a user with that ID.',
      responseType: 'notFound'
    },

  },


  fn: async function ({id}) {

    var otherUser = await User.findOne({
      id
    })
      .populate('outboundComradeRequests', { id: this.req.me.id });

    if (!otherUser || otherUser.outboundComradeRequests.length === 0) {
      throw 'notFound';
    }

    // Add the logged-in user to this person's comrades, and add this person
    // to the logged-in user's comrades.
    await User.addToCollection(id, 'comrades')
      .members([this.req.me.id]);
    await User.addToCollection(this.req.me.id, 'comrades')
      .members([id]);

    // Now remove from this person's outbound requests (which also automatically
    // removes from the logged-in user's inbound requests.)
    await User.removeFromCollection(id, 'outboundComradeRequests')
      .members([this.req.me.id]);

  }


};

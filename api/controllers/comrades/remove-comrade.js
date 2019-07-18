module.exports = {


  friendlyName: 'Remove comrade',


  description: 'Remove a user from the logged-in user\'s comrades list, and vice-versa.',


  inputs: {

    id: {
      description: 'The id of the comrade to remove',
      type: 'number',
      required: true
    },

  },


  exits: {

    notFound: {
      responseType: 'notFound'
    },

  },


  fn: async function ({id}) {

    var ComradeToRemove = await User.findOne({ id })
      .populate('comrades');

    // Ensure the comrade is in our `comrades`.
    if(!_.find(this.req.me.comrades, {id: id})) {
      throw 'notFound';
    }
    // Remove the comrade from the logged-in user's comrades.
    await User.removeFromCollection(this.req.me.id, 'comrades')
      .members([ id ]);


    // Ensure the logged-in user is in this person's `comrades`
    if(!_.find(ComradeToRemove.comrades, {id: this.req.me.id})) {
      throw 'notFound';
    }
    // Remove the logged-in user from the other user's comrades.
    await User.removeFromCollection(id, 'comrades')
      .members([ this.req.me.id ]);

  }


};

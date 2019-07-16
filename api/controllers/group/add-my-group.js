module.exports = {


  friendlyName: 'Add my group',


  description: 'Add a group on the condition the user has no group.',


  inputs: {
    name: {
      type: 'string',
      description: 'The name of the group.',
      example: 'The Example Group',
      required: true
    },
    emailAddress: {
      type: 'string',
      description: 'The contact email address of the group.',
      example: 'group@example.com',
      required: false
    },
  },


  exits: {
    success: {
      outputDescription: 'The newly created `Group`.',
      outputExample: {}
    },
  },


  fn: async function (inputs) {
    sails.log('Controller add-my-group called.');
    var name = inputs.name;
    var emailAddress = inputs.emailAddress.toLowerCase();

    // Create a new group record.
    var newGroup = await Group.create({
      name: name,
      emailAddress: emailAddress,
    }).fetch();
    // add the creating user to the group
    await Group.addToCollection(newGroup.id, 'members', this.req.me.id);
    return {
      id: newGroup.id
    };
  }


};

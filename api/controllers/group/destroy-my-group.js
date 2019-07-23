module.exports = {


  friendlyName: 'Destroy my group',


  description: 'Delete a group the user is the sole member of',


  inputs: {
    id: {
      type: 'number',
      required: true
    }
  },


  exits: {

    forbidden: {
      description: 'The user making this request doesn\'t have the permissions to delete this group',
      responseType: 'forbidden' // res.forbidden
    }

  },


  fn: async function (inputs) {
    var group = await Group.findOne({
      id: inputs.id
    }).populate('members');
    if (this.req.me.group !== group.id || group.members.length > 1 ) {
      throw 'forbidden';
    }
    // only allow destruction of a group if the user is the only member
    if (this.req.me.group === group.id && group.members.length === 1) {
      await Group.destroy({id:inputs.id});
    }
    return {};
  }


};

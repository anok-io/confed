module.exports = {


  friendlyName: 'View group',


  description: 'Display "Group" page.',

  inputs: {
    groupname: {
      type: 'string'
    }
  },

  exits: {

    success: {
      viewTemplatePath: 'pages/group/group'
    }

  },


  fn: async function (inputs) {
    var group = await Group.findOne({
      where: { slug: inputs.groupname },
      select: ['name', 'emailAddress', 'initiative', 'slug', 'local', 'regional', 'federation', 'confederation']
    })
      .populate('members', {
        select: ['username']
      })
      .populate('local')
      .populate('regional')
      .populate('federation')
      .populate('confederation');
    return {group};

  }

};

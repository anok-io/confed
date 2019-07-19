/**
 * AgendaItem.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    title: {
      type: 'string',
      description: 'The simple title of the proposal that is put forward to members to vote on.',
      required: true
    },

    proposal: {
      type: 'string',
      description: 'A description of the proposal being made',
      required: true
    },

    suggestedAction: {
      type: 'string',
      description: 'A description of the action that is being suggested',
      required: true
    },

    owner: {
      type: 'string',
      description: 'The Member that submitted the agenda item',
      required: true
    },

    decision: {
      type: 'string',
      isIn: ['yes', 'no', 'abstain'],
      defaultsTo: 'abstain',
    },

    assembly: {
      type: 'string',
      isIn: ['group', 'local', 'regional', 'federation', 'confederation'],
      required: true
    },

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    meeting: {
      model: 'meeting',
    },

    votes: {
      collection: 'vote',
      via: 'agendaitem'
    }

  },

};



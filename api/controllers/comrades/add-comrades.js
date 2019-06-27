module.exports = {


  comradelyName: 'Add comrades',


  description: 'Add one or more comrades.',


  inputs: {

    comrades: {
      description: 'An array of users to add as comrades.',
      type: [
        {
          fullName: 'string',
          emailAddress: 'string'
        }
      ],
      example: [
        {
          fullName: 'Rory Milliard',
          emailAddress: 'rory@example.com'
        }
      ],
      required: true
    }

  },


  fn: async function ({comrades}) {

    for (let comrade of comrades) {

      // Check for an existing account for this user.
      var existingUser = await User.findOne({ emailAddress: comrade.emailAddress });

      if(existingUser) {
        // Update this user's `inboundComradeRequests`.
        await User.addToCollection(existingUser.id, 'inboundComradeRequests')
          .members([this.req.me.id]);

        // Send a notification email.
        await sails.helpers.sendTemplateEmail.with({
          to: comrade.emailAddress,
          subject: `${this.req.me.fullName} wants to share stuff on Ration!`,
          template: 'email-new-comrade-request',
          templateData: {
            potentialComradeFullName: this.req.me.fullName,
            fullName: comrade.fullName,
            baseUrl: sails.config.custom.baseUrl
          }
        });
      }
      else {
        // Otherwise, we need to create a new user.
        var token = await sails.helpers.strings.random('url-comradely');
        var newUser = await User.create({
          fullName: comrade.fullName,
          emailAddress: comrade.emailAddress,
          emailProofToken: token,
        }).fetch();

        // Update this user's `inboundComradeRequests`.
        await User.addToCollection(newUser.id, 'inboundComradeRequests')
          .members([this.req.me.id]);

        // Send a notification email.
        await sails.helpers.sendTemplateEmail.with({
          to: comrade.emailAddress,
          subject: `${this.req.me.fullName} wants to organise on CONFED!`,
          template: 'email-new-user-invite',
          templateData: {
            potentialComradeFullName: this.req.me.fullName,
            fullName: comrade.fullName,
            baseUrl: sails.config.custom.baseUrl,
            token: token
          }
        });
      }

    }//∞

  }


};

Meteor.startup(function () {
  if (!( Meteor.settings.dropboxClientId &&
         Meteor.settings.dropboxSecret &&
         Meteor.settings.firstUser &&
         Meteor.settings.firstPassword))
    throw new Error("Must specify a settings file with some secrets and stuff");
  var dropbox = Accounts.loginServiceConfiguration.findOne({
    service: "dropbox"
  });
  if (!dropbox ||
      dropbox.clientId !== Meteor.settings.dropboxClientId ||
      dropbox.secret !== Meteor.settings.dropboxSecret) {
    Accounts.loginServiceConfiguration.remove({
      service: "dropbox"
    });
    Accounts.loginServiceConfiguration.insert({
      service: "dropbox",
      clientId: Meteor.settings.dropboxClientId,
      secret: Meteor.settings.dropboxSecret
    });
  }
  // create the first user if she does not yet exist.
  if (!Meteor.users.findOne()) {
    Accounts.createUser({
      username: Meteor.settings.firstUser,
      password: Meteor.settings.firstPassword
    });
  }
});

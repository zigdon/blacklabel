Meteor.startup(function () {
  Accounts.loginServiceConfiguration.remove({
    service: "dropbox"
  });
  Accounts.loginServiceConfiguration.insert({
    service: "dropbox",
    clientId: "changeme",
    secret: "s3kr1t"
  });
});

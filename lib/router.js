/*subscriptions that WaitOn on the subscriptions to be loaded, displaying loading spinner in the interm */
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { 
    return Meteor.subscribe('gems');
  }
});

/*Router map*/
Router.map(function() {
  this.route('gemsList', {path: '/dashboard'});
  this.route('entrySignIn', {path: '/home'});
    this.route('calendar', {path: '/calendar'});
    this.route('todaysGem', {path: '/today'});


  this.route('entrySignIn', {path: '/'});
  
  this.route('gemPage', {
    path: '/gems/:_id',
    data: function() { return Gems.findOne(this.params._id); }
  });

  this.route('profile', {path: '/profile'});

  this.route('gemEdit', {
path: '/gems/:_id/edit',
data: function() { return Gems.findOne(this.params._id); }
});
  
  this.route('gemSubmit', {
    path: '/submit'
  });
});

/*requires the user logs in otherwise routes to Access Denied*/
var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn())
      this.render(this.loadingTemplate);
    else
      this.render('accessDenied');
    
    this.stop();
  }
}

Router.onBeforeAction(requireLogin, {only: 'gemSubmit'})
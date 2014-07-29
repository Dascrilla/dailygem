/* EVENT HANDLERS */

Template.prospectSubmit.events({

  /* Canel handler  */
  'click .cancel': function(e){
    e.preventDefault(); 
    Router.go('prospectsList'); 
  }, 

  /* Submit handler  */
  'submit form': function(e) {
    e.preventDefault();
    
  /* Defines the object handler  */
  /* Does "var" bind the object to submit.js only? TODO find a way to combine submit and edit objects */
  var prospect = {
      first: $(e.target).find('[name=first]').val(),
      last: $(e.target).find('[name=last]').val(),
      title: $(e.target).find('[name=title]').val(),
      company: $(e.target).find('[name=company]').val()
    }
    
/*Error handler for submit*/
/*Why is this code alot different that edit.js. TODO refactor the edit and submit in same template with {{#if}} */
Meteor.call('prospect', prospect, function(error, id) { 
  if (error) {
// display the error to the user
throwError(error.reason);
if (error.error === 302) 
  Router.go('prospectsList');  
  //Router.go('coveragePage', {_id: error.details}) if you wanna go to specific coverage page
} else {
Router.go('prospectsList');  
//Router.go('coveragePage', {_id: id}); if you wanna go to specific coverage page
} });
} });

/* Meteor.call calls a method  named by its first argument. We define the Method in our collections/coverages.js file:  */
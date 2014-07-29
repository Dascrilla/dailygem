if (Meteor.isClient){
	  /* Modal sessions variable set  */
	Session.setDefault('showModal', false); 
	Session.setDefault('listTitled', false); 
}


Template.prospectsList.helpers({
  prospects: function() {
    return Prospects.find();
  }
});

/* Modal Logic */
Template.listSubmit.events({
			'click .fa-edit':function(e){
				e.preventDefault(); 
				Session.set('showModal', true); 
			} 
		})
Template.prospectsList.showModal = function(){
		return Session.get('showModal'); 
	}

Template.prospectForm.events({
	'click .close':function(e){
		e.preventDefault();
		Session.set('showModal', false);
	
	}, 

	'submit form': function(e) {
    e.preventDefault();
   	Session.set('listTitled', true);
   	Session.set('showModal', false); 
    
  /* Defines the object handler  */
  /* Does "var" bind the object to submit.js only? TODO find a way to combine submit and edit objects */
  var list = {
    title: $(e.target).find('[name=title]').val()
    }
    
/*Error handler for submit*/
/*Why is this code alot different than edit.js. TODO refactor the edit and submit in same template with {{#if}} */
Meteor.call('list', list, function(error, id) { 
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

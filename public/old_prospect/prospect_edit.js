
/* HELPERS */

/* Returns the coverage item you want to edit */
Template.prospectEdit.helpers({ 
	prospect: function() {
		return Prospects.findOne(Session.get('currentProspectId')); 
	}
});

/* EVENT HANDLERS */

/* Cancel handler */
Template.prospectEdit.events({ 
	'click .cancel':function(e){
		e.preventDefault(); 
	Router.go('prospectsList'); 
	}, 

/* Submit  */
'submit form': function(e) {
e.preventDefault();
var currentProspectId = this._id;

/* Defines object CoverageProperties and binds them to HTML "name" attrib.*/ 
var prospectProperties = {
	first: $(e.target).find('[name=first]').val(),
      last: $(e.target).find('[name=last]').val(),
      title: $(e.target).find('[name=title]').val(),
      company: $(e.target).find('[name=company]').val(), 
}

/* Updates the current coverage with the new properties. Handles Error  */
Prospects.update(currentProspectId, {$set: prospectProperties}, function(error){
 if (error) {
// display the error to the user
alert(error.reason); 
} 
else {
	Router.go('prospectsList'); 
	//Router.go('coveragePage', {_id: currentCoverageId}); 
}
}); 
},

/* Delete handler */

/* Asks for confirmation, checks if there's an error, if not deletes the item and routes back to coveragesList */
/* TODO Find a better way to handle errors/form validation */
'click .delete': function(e) { 
e.preventDefault();
if (confirm("Delete this Item?")) {
 var currentProspectId = this._id;
Prospects.remove(currentProspectId, function(error){
 	if(error){
 	alert(error.reason); 
 	}
 	else{
 		Router.go('prospectsList');
 	}
 	}); 
} 
}
});
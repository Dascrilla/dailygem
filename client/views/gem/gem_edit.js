Template.gemPage.rendered=function() {
    $('#my-datepicker').datepicker({
    todayBtn: "linked",
    autoclose: true,
    todayHighlight: true
});
}

/* HELPERS */

/* Returns the coverage item you want to edit */
Template.gemPage.helpers({ 
	gem: function() {
		return Gems.findOne(Session.get('currentGemId')); 
	}
});

/* EVENT HANDLERS */

/* Cancel handler */
Template.gemPage.events({ 
	'click .cancel':function(e){
		e.preventDefault(); 
	Router.go('gemsList'); 
	}, 

/* Submit  */
'submit form': function(e) {
e.preventDefault();
var currentGemId = this._id;

/* Defines object CoverageProperties and binds them to HTML "name" attrib.*/ 
var gemProperties = {
      item: $(e.target).find('[name=item]').val(),
      price: $(e.target).find('[name=price]').val(),
      originally: $(e.target).find('[name=originally]').val(),
      description: $(e.target).find('[name=description]').val(),
      height: $(e.target).find('[name=height]').val(),
      width: $(e.target).find('[name=width]').val(),
      metal: $(e.target).find('[name=metal]').val(),
      dates: $(e.target).find('[name=dates]').val(), 
      pictures: $(e.target).find('[name=pictures]').val()
}

/* Updates the current coverage with the new properties. Handles Error  */
Gems.update(currentGemId, {$set: gemProperties}, function(error){
 if (error) {
// display the error to the user
alert(error.reason); 
} 
else {
	Router.go('gemsList'); 
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
 var currentGemId = this._id;
Gems.remove(currentGemId, function(error){
 	if(error){
 	alert(error.reason); 
 	}
 	else{
 		Router.go('gemsList');
 	}
 	}); 
} 
}
});
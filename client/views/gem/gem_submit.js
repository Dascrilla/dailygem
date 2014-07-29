Template.gemSubmit.rendered=function() {
    $('#my-datepicker').datepicker({
    todayBtn: "linked",
    autoclose: true,
    todayHighlight: true
});
}
/* EVENT HANDLERS */

Template.gemSubmit.events({

  /* Canel handler  */
  'click .cancel': function(e){
    e.preventDefault(); 
    Router.go('gemsList'); 
  }, 

  /* Submit handler  */
  'submit form': function(e) {
    e.preventDefault();
    
  /* Defines the object handler  */
  /* Does "var" bind the object to submit.js only? TODO find a way to combine submit and edit objects */
  var gem = {
      item: $(e.target).find('[name=item]').val(),
      price: $(e.target).find('[name=price]').val(),
      originally: $(e.target).find('[name=originally]').val(),
      pictures: $(e.target).find('[name=pictures]').val(),
      description: $(e.target).find('[name=description]').val(),
      height: $(e.target).find('[name=height]').val(),
      width: $(e.target).find('[name=width]').val(),
      metal: $(e.target).find('[name=metal]').val(),
      dates: $(e.target).find('[name=dates]').val()
    }
    
/*Error handler for submit*/
/*Why is this code alot different that edit.js. TODO refactor the edit and submit in same template with {{#if}} */
Meteor.call('gem', gem, function(error, id) { 
  if (error) {
// display the error to the user
throwError(error.reason);
if (error.error === 302) 
  Router.go('gemsList');  
} else {
Router.go('gemsList');  

} });
} });


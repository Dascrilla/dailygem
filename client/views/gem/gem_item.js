/* HELPERS */

/* Helper function the checks if a coverage item was published by the current user */
Template.gemItem.helpers({
ownGem: function() {
return this.userId == Meteor.userId(); 
},

/* Something to do with linking the specific item and changing the URL*/
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  }
});

if (Meteor.isClient){

}

Template.gemsList.helpers({
  gems: function() {
    return Gems.find();
  }
});



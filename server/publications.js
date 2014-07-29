Meteor.publish('gems', function() {
	return Gems.find();
}); 

Meteor.publish('curators', function() {
	return Curators.find();
});

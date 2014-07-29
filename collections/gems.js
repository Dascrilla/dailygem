Gems = new Meteor.Collection('gems');

Gems.allow({
      insert: function () { return true; },
      update: function () { return true; },
      remove: function () { return true; }
});

Meteor.methods({

gem: function(gemAttributes) {
var user = Meteor.user(),
gemWithSameLink = Gems.findOne({url: gemAttributes.url});
// ensure the user is logged in
if (!user)
throw new Meteor.Error(401, "You need to login!");
// ensure the post has a title
if (!gemAttributes.item)
throw new Meteor.Error(422, 'Please fill in at least a title!');
// check that there are no previous coverages with the same link
if (gemAttributes.url && gemWithSameLink) { throw new Meteor.Error(302,
'This item has already been posted',
gemWithSameLink._id); }


// pick out the whitelisted keys
var gem = _.extend(_.pick(gemAttributes, 'item', 'pictures', 'price', 'originally', 'description', 'height', 'width', 'metal', 'dates'), { userId: user._id,
userId: user.username,
created: new Date().getTime()
});

var gemId = Gems.insert(gem);
return gemId; 
}
});
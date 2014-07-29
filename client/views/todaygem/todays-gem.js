Template.todaysGem.helpers({
	
	gems: function(){
		today = moment().format('MM/DD/YYYY'); 
		return Gems.find({dates: today}); 
	}, 
	gemToday: function(){
		today = moment().format('MM/DD/YYYY'); 
		if (Gems.findOne().dates == today){
			return true;
		}
		else{return false;}
	}
});

Template.gemItemToday.helpers({

	formatPrice: function() {
		return numeral(this.price).format('$0,0.00'); 
	}, 
	formatOriginally: function(){
		return numeral(this.originally).format('$0,0.00'); 
	}

});
app.factory('videoSearchBar', function(Video)
{
	'use strict';

	var sendParams = {
		kw : null,
	};

	var init = function()
	{

	};

	var find = function()
	{
		Video.find(this.sendParams);
	};

	return {
		init       : init,
		sendParams : sendParams,
		find       : find,
	};
});
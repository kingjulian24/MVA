$(document).ready(function(){
	
	$("#search").click(function(){ // send ajax request on search
		var address = $('#userInput').val();
		console.log(address);
		$.ajax({
			type:'GET',
			url: 'http://sandbox.dev:8080/GC/GCServer.php?a='+address,
			dataType: 'json',
			success: jsonParser(address)
		});
	});
	
});

function jsonParser (address){
	$.get('http://sandbox.dev:8080/GC/GCServer.php?a='+address,function(data){
		
		if(data.length > 3){ // validate data

			var edata = jQuery.parseJSON(data); //convert json to javascript object
			
			if(!!edata.pollingLocations){ // check for polling locations

				for (var i = edata.pollingLocations.length - 1; i >= 0; i--) {
					var locationName = edata.pollingLocations[i].address.locationName;
					var street = edata.pollingLocations[i].address.line1;
					var city = edata.pollingLocations[i].address.city;
					var state = edata.pollingLocations[i].address.state;
					var zip = edata.pollingLocations[i].address.zip;
					$('.row').append('<h1>'+locationName+'</h1>');
				};
			} else { // if no location
				$('.row').append('<h1>location info N/A</h1>');
			}
		} else { // if no data
			$('.row').append('<h1>invalid input</h1>');
		}
	});
}


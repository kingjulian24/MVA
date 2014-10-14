$(document).ready(function(){
	
	$("#search").click(function(){ // send ajax request on search
		var address = $('#userInput').val();
		console.log(address);
		$.ajax({
			type:'GET',
			url: 'https://www.googleapis.com/civicinfo/v2/voterinfo?address='+address+'&electionId=4100&key=AIzaSyBGtYVq_OZ35H4BY-r4IAx5cYAVTuOG7rQ',
			dataType: 'jsonp',
			success: function(data) { jsonParser(data)}
		});
	});
	
});

function jsonParser (data){

	$('.row').empty();
		if(data.contests.length > 0){ // validate data

			var edata = data; //get all contests
			
			

				for (var i = edata.contests.length - 1; i >= 0; i--) {
					$('.row').append('<h1></h1>');

					var electionType = edata.contests[i].type;
					
					var office = edata.contests[i].office;
					$('.row').append('<h2>'+office+' ('+electionType +')'+'</h2>');
					var district = edata.contests[i].district;


					$('.row').append('<h4>'+ district.name+' ('+district.scope+')'+'</h4>');

					var candidates = edata.contests[i].candidates;
					for (var j = 0; j <= candidates.length - 1; j++) {

						var party = candidates[j].party;
						party = party.replace("Democratic", "D");
						party = party.replace("Republican", "R");
						$('.row').append('<h3>'+ '&#x25A2;' +' ' + candidates[j].name +' ('+party+')</h3>');
						//j+1
					};
					
					



				};
			
		} else { // if no data

			$('.row').append('<h1>invalid input</h1>');
		}

}


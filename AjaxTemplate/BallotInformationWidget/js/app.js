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
					

					var electionType = edata.contests[i].type;
					
					var office = edata.contests[i].office;
					$('.row').append('<h3>'+office+' ('+electionType +')'+'</h3>');
					var district = edata.contests[i].district;


					$('.row').append('<h5>'+ district.name+' ('+district.scope+')'+'</h5>');

					var candidates = edata.contests[i].candidates;
					for (var j = 0; j <= candidates.length - 1; j++) {

						var party = candidates[j].party;
						party = party.replace("Democratic", "D");
						party = party.replace("Republican", "R");
						$('.row').append('<h4>'+ '&#x25A2;' +' ' + candidates[j].name +' ('+party+')</h4>');
						

					};
					
					$('.row').append('<h4>'+ '&#x25A2;' +' ' + '___________ ' +'(Write-in)'+'</h4>');
					
					$('.row').append('<br>');


				};
			
		} else { // if no data

			$('.row').append('<h1>invalid input</h1>');
		}

}


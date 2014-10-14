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

	$('.ballotinformation').empty();
		if(data.contests.length > 0){ // validate data

			var edata = data; //get all contests
			
			

				for (var i = edata.contests.length - 1; i >= 0; i--) {

					var electionType = edata.contests[i].type;
					$('.ballotinformation').append('<h1>'+electionType+'</h1>');
					var office = edata.contests[i].office;
					$('.ballotinformation').append('<h2>'+office+'</h2>');
					var district = edata.contests[i].district;


					$('.ballotinformation').append('<h4>'+ district.name+':'+district.scope+':'+district.id+':'+'</h4>');

					var candidates = edata.contests[i].candidates;
					for (var j = 0; j <= candidates.length - 1; j++) {

						$('.ballotinformation').append('<h3>'+(j+1) +' : ' + candidates[j].name +'('+candidates[j].party+')</h3>');

					};
					
					



				};
			
		} else { // if no data

			$('.ballotinformation').append('<h1>invalid input</h1>');
		}

}


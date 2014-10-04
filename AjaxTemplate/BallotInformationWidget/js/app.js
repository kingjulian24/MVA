$(document).ready(function(){
	
	$("#search").click(function(){ // send ajax request on search
		var address = $('#userInput').val();
		console.log(address);
		$.ajax({
			type:'GET',
			url: 'https://www.googleapis.com/civicinfo/v2/voterinfo?address='+address+'&electionId=2000&key={key}',
			dataType: 'jsonp',
			success: function(data) { jsonParser(data)}
		});
	});
	
});

function jsonParser (data){

		if(data.contests.length > 0){ // validate data

			var edata = data; //get all contests
			
			

				for (var i = edata.contests.length - 1; i >= 0; i--) {

					var electionType = edata.contests[i].type;
					$('.row').append('<h1>'+electionType+'</h1>');
					var office = edata.contests[i].office;
					$('.row').append('<h2>'+office+'</h2>');
					var district = edata.contests[i].district;


					$('.row').append('<h3>'+ district.name+':'+district.scope+':'+district.id+':'+'</h3>');

					var candidates = edata.contests[i].candidates;
					for (var j = candidates.length - 1; j >= 0; j--) {

						$('.row').append('<h4>'+(j+1) +' : ' + candidates[j].name +'('+candidates[j].party+')</h4>');

					};
					
					



				};
			
		} else { // if no data
			$('.row').append('<h1>invalid input</h1>');
		}

}


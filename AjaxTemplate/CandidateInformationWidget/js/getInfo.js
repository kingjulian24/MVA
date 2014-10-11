/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function(){
	
	$("#search").click(function(){ // send ajax request on search
		var address = $('#userInput').val();
                
		console.log(address);
		$.ajax({
			type:'GET',
			url: 'https://www.googleapis.com/civicinfo/v2/voterinfo?address='+address+'&electionId=2000&key=AIzaSyBGtYVq_OZ35H4BY-r4IAx5cYAVTuOG7rQ',
			dataType: 'jsonp',
			success: function(data) { jsonParser(data)}
		});
	});
	
});

function jsonParser (data){

		if(data.contests.length > 0){ // validate data
			var edata = data; //get all contests
			
				for (var i = edata.contests.length - 1; i >= 0; i--) {

					//$('.row').append('<h1>'+electionType+'</h1>');
					//var office = edata.contests[i].office;
					//$('.row').append('<h2>'+office+'</h2>');
					//var district = edata.contests[i].district;


					//$('.row').append('<h3>'+ district.name+':'+district.scope+':'+district.id+':'+'</h3>');

					var candidates = edata.contests[i].candidates;
					for (var j = candidates.length - 1; j >= 0; j--) {
						$('.row').append('<h4>Name : ' + candidates[j].name +'<br></h4>');

						if (candidates[j].party.length > 0)
							$('.row').append('<h4>Party : ' + candidates[j].party +'<br></h4>');
						else
							$('.row').append('<h4>'+'  '+'Party : N/A <br></h4>');


						if (candidates[j].hasOwnProperty("candidateUrl"))
							$('.row').append('<h4>'+'  '+'Candidate URL : ' +'<a href="'+ candidates[j].candidateUrl +'">' +candidates[j].candidateUrl+'</a><br></h4>');
						else
							$('.row').append('<h4>'+'  '+'Candidate URL : N/A <br></h4>');


						if (candidates[j].hasOwnProperty("phone"))
							$('.row').append('<h4>'+'  '+'Phone : ' + candidates[j].phone +'<br></h4>');
						else
							$('.row').append('<h4>'+'  '+'Phone : N/A <br></h4>');


						if (candidates[j].hasOwnProperty("photoUrl"))
							$('.row').append('<h4>'+'  '+'Photo : 3333333333' + '<img src="'+candidates[j].photoUrl+'" alt="'+candidates[j].name+'"/>' +'<br></h4>');
						else
							$('.row').append('<h4>'+'  '+'Photo : N/A <br></h4>');

						if (candidates[j].hasOwnProperty("email"))
							$('.row').append('<h4>'+'  '+'E-mail : ' +'<a href="'+ candidates[j].email +'">' +candidates[j].email+'</a><br></h4>');
						else
							$('.row').append('<h4>'+'  '+'E-mail : N/A <br></h4>');

						if (candidates[j].hasOwnProperty("channels")){
							$('.row').append('<h4>Channels : <br></h4>');
							var channels = candidates[j].channels;
						    
						    for (var k = 0; k<channels.length; k++){
						    	$('.row').append('<h5>Type: '+channels[k].type+'<br></h5>');
						    	$('.row').append('<h5>ID: <a href="'+channels[k].id+'">'+channels[k].id+'"</a><br></h5>');
						    };

						}
						else	
							$('.row').append('<h4>'+'  '+'Channels : N/A <br><br><br></h4>');


						$('.row').append('<br><br><br>');
 

					};

					
					



				};
			
		} else { // if no data
			$('.row').append('<h1>invalid input</h1>');
		}

}



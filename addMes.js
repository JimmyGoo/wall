function addNewMes(number, name, message, imageURL, leftMargin, originPosLeft){
	if(number >= maxMes){
		console.log('addNewMes number error');
	}
	else{
		console.log(originPosLeft);
		var newMesId = 'mes'+number;
		var mes = document.getElementById(newMesId);
		var moveTo = window.innerWidth + 'px';


		$("#"+newMesId).animate({left:moveTo}, function(){
			mes.getElementsByClassName("username")[0].innerHTML = name +':';
			preLoadImage(imageURL, mes.getElementsByClassName("userhead_image")[0]);



			var mar = mes.getElementsByClassName("usermes")[0];
			mar.parentNode.removeChild(mar);
			
			$('#new_text')[0].innerHTML = message;

			var text_length = $('#new_text').width();

			var newUserMes;
			set_width = window.innerWidth - originPosLeft - 150;
			if(text_length > set_width){
				newUserMes = document.createElement('marquee');
				newUserMes.setAttribute('scrollamount','30');
			}
			else{
				newUserMes = document.createElement('div');
			}
			newUserMes.setAttribute('class', 'usermes');
			newUserMes.innerHTML = message;
			newUserMes.setAttribute('width',set_width + 'px');
			newUserMes.style.position = 'absolute';
			newUserMes.style.top = $('.username').height() + 40 + 'px';
			newUserMes.style.left = originPosLeft + 180 + 'px';
			$("#"+newMesId).width($('#announcement').width());
			console.log(newUserMes.style.width);
			mes.appendChild(newUserMes);

			var moveFrom = -window.innerWidth;
			moveFrom += 'px';
			$("#"+newMesId).css('left',moveFrom);
			
		}).animate({left:leftMargin+'px'});
	}
}

function preLoadImage(url, showImage) {
	showImage.setAttribute('src', 'pre.gif');
	var down = new Image();
	down.src = url; 
	down.onload = function(){
		showImage.setAttribute("src", down.src); 
	}; 
} 
var ws = io('https://wall.cgcgbcbc.com');
	
ws.on('new message', function(data){
	if(data.content != undefined){
		addNewMes(currentMes, data.nickname, data.content, data.headimgurl, leftMargin, originLeftForMes);
		console.log(data);
		currentMes++;
		currentMes = currentMes >= maxMes ? 0 : currentMes;
	}
	else{
		console.log('new message error');
	}
	
});

ws.on('admin', function(data){
	console.log(data);
	if(data.content != undefined){
		adminClosePos_on = $("#admin_div").height();
		adminClosePos_on = 0 - adminClosePos_on + 'px';
		var admin_animate;

		var admin_mes = document.getElementById("admin_div");
		admin_mes.style.visibility = "visible";

		if(usingAdmin){
			console.log(adminClosePos_on);
			clearTimeout(admin_animate);
			$("#admin_div").animate({top: adminClosePos_on},function(){
			
				$('#new_text')[0].innerHTML = data.content;

				var text_length_admin = $('#new_text').width();
				var delete_admin = document.getElementById("admin_text");
				delete_admin.parentNode.removeChild(delete_admin);
				set_width_admin = window.innerWidth - originLeftForMes - 150;
				if(text_length_admin > set_width_admin){
					newUserMes_admin = document.createElement('marquee');
					newUserMes_admin.setAttribute('scrollamount','30');
				}
				else{
					newUserMes_admin = document.createElement('div');
				}

				newUserMes_admin.setAttribute('class', 'usermes');
				newUserMes_admin.setAttribute('id', "admin_text");
				newUserMes_admin.innerHTML = data.content;
				newUserMes_admin.setAttribute('width',set_width_admin + 'px');
				newUserMes_admin.style.position = 'absolute';
				newUserMes_admin.style.top = $('.username').height()  + 'px';
				newUserMes_admin.style.left = originLeftForMes + 180 + 'px';
				$("#admin_text").width($('#announcement').width());
				admin_mes.appendChild(newUserMes_admin);

				$("#admin_div").css("top",adminClosePos);
				$("#admin_div").css("left", leftMargin + 'px');
				$("#admin_div").width($("#announcement").width());


				$('#admin_div').animate({top:$("#announcement").offset().top + 'px'}, function(){
					usingAdmin = true;
					admin_animate = setTimeout(function(){
						$("#admin_div").animate({top: adminClosePos_on}, function(){
							usingAdmin = false;
							
						});
						usingAdmin = false;
					}, 10000);
				})
			})
		}
		else{
			$('#new_text')[0].innerHTML = data.content;

			var text_length_admin = $('#new_text').width();
			var delete_admin = document.getElementById("admin_text");
			delete_admin.parentNode.removeChild(delete_admin);
			set_width_admin = window.innerWidth - originLeftForMes - 150;
			if(text_length_admin > set_width_admin){
				newUserMes_admin = document.createElement('marquee');
				newUserMes_admin.setAttribute('scrollamount','30');
			}
			else{
				newUserMes_admin = document.createElement('div');
			}

			newUserMes_admin.setAttribute('class', 'usermes');
			newUserMes_admin.setAttribute('id', "admin_text");
			newUserMes_admin.innerHTML = data.content;
			newUserMes_admin.setAttribute('width',set_width_admin + 'px');
			newUserMes_admin.style.position = 'absolute';
			newUserMes_admin.style.top = $('.username').height()  + 'px';
			newUserMes_admin.style.left = originLeftForMes + 180 + 'px';
			$("#admin_text").width($('#announcement').width());
			admin_mes.appendChild(newUserMes_admin);

			$("#admin_div").css("top",adminClosePos);
			$("#admin_div").css("left", leftMargin + 'px');
			$("#admin_div").width($("#announcement").width());

			var originTop = $('#admin_div').offset().top;

			$('#admin_div').animate({top:$("#announcement").offset().top + 'px'}, function(){
				usingAdmin = true;
				admin_animate = setTimeout(function(){
					$("#admin_div").animate({top: adminClosePos_on}, function(){
						usingAdmin = false;
					});

					usingAdmin = false;
				}, 10000);
			})
		}
	}
	else{
		console.log('admin mes error');
	}
});
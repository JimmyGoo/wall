window.onload = function(){
	currentMes = 0;
	maxMes = 4;
	hasFul = false;
	firstAdminMes = true;
	usingAdmin = false;

	bgcolors = ['#edb168','#354c58','#dc5653','#4db09e'];

	//init the admin mes
	var adminEl = $('#announcement');
	adminEl.attr('direction','left');
	adminEl.attr('scrolldelay','0');
	adminEl.attr('scrollamount','20');
	adminEl.attr('behavior','scroll');
	
	leftMargin = $('#announcement').offset().left;
	var firstDivideLine = $("#firstLine");
	firstDivideLine.css("position","absolute");
	firstDivideLine.css('top',adminEl.height() + adminEl.offset().top + 'px');	

	for(currentMes = 0; currentMes < maxMes; currentMes++){
		mes_f = document.createElement('div');
		document.body.appendChild(mes_f);
		mes_f.style['background-color'] = bgcolors[currentMes];

		var toTopPos_f = $('#announcement').height() + $('#announcement').offset().top + currentMes 
		* (window.innerHeight * 0.21) + 'px';

		var newMesId_f = 'mes'+currentMes;
		mes_f.setAttribute('id',newMesId_f);
		mes_f.setAttribute('class','mes');

		mes_f.style.left = $('#announcement').offset().left+'px';
		mes_f.style.top = toTopPos_f;

		var newImage_f = document.createElement('img');
		newImage_f.setAttribute('class', 'userhead_image');
		newImage_f.setAttribute('src', 'default.png');
		mes_f.appendChild(newImage_f);

		var newUsername_f = document.createElement('a');
		newUsername_f.setAttribute('class', 'username');
		newUsername_f.innerHTML = ' ';
		mes_f.appendChild(newUsername_f);

		var divide_f = document.createElement('div');
		divide_f.setAttribute('class', 'divide_line');
		document.body.appendChild(divide_f);

		var newUserMes_f;
		setWidth_f = window.innerWidth - $('.username').offset().left - 150 + 'px';
		
		newUserMes_f = document.createElement('div');
		newUserMes_f.setAttribute('class', 'usermes');
		newUserMes_f.innerHTML = ' ';
		
		newUserMes_f.setAttribute('width',setWidth_f + 'px');

		newUserMes_f.style.position = 'absolute';
		newUserMes_f.style.top = $('.username').height() + 40 + 'px';
		newUserMes_f.style.left = $('.username').offset().left + 40 + 'px';

		originLeftForMes = ($('.username').offset().left);

		mes_f.appendChild(newUserMes_f);
	}
	currentMes = 0;


	//admin mes init
	$("#admin_div").height($("#announcement").height());
	adminClosePos = $("#admin_div").height();
	adminClosePos = 0 - adminClosePos + 'px';
	var newImage_a = document.createElement('img');

	var mes_a = document.getElementById('admin_div');

	newImage_a.setAttribute('class', 'adminhead_image');
	newImage_a.setAttribute('src', 'default.png');
	mes_a.appendChild(newImage_a);

	var newUsername_a = document.createElement('a');
	newUsername_a.setAttribute("id", 'admin_name'); 
	newUsername_a.innerHTML = "管理员小哥"
	mes_a.appendChild(newUsername_a);

	var newUserMes_a;
	newUserMes_a = document.createElement('div');
	newUserMes_a.setAttribute('id', "admin_text");
	mes_a.appendChild(newUserMes_a);
	mes_a.style.visibility = "hidden";

	//get history
	$.get('https://wall.cgcgbcbc.com/api/messages?num=4', function(data){
		console.log(data);

		for(currentMes = 0; currentMes < maxMes; currentMes++){
			addNewMes(currentMes, data[currentMes].nickname, data[currentMes].content, data[currentMes].headimgurl, leftMargin, originLeftForMes);
		}
		currentMes = 0;
	})
}
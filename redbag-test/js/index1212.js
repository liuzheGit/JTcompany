$(document).ready(function(){
	function bodyScale(){
		var devicewidth=document.documentElement.clientWidth;
		var scale=devicewidth/640;
		document.body.style.zoom=scale;
	}
	window.onload=window.onresize=function(){
		bodyScale();
		$('html,body').show();
	}
	var a =0;
	var num=Math.ceil(Math.random()*5);
	var Timerr = setInterval(aa,1000);
	var removepackage = setInterval(function(){
		for(var jj=0;jj<$('.div>div').size()/5;jj++){
			$('.div>div').eq($('.div>div').size()-jj).remove();
		}
	},400)
	function aa(){
		for(var i=0;i<5;i++){
		var m=parseInt(Math.random()*700+100);
		var j2=parseInt(Math.random()*300+1200);
		var j=parseInt(Math.random()*1600+000);
		var j1=parseInt(Math.random()*300+300);
		var n=parseInt(Math.random()*10+(-10));
		$('.div').prepend('<div class="dd"></div>');
		$('.div').children('div').eq(0).css({'left':j,'top':n});
		$('.div').children('div').eq(0).animate({'left':j-j1,'top':$(window).height()+20},3000);
		}
	}

	$('#ruleBtn').on('click',function(){
		$('.modal').modal();
		$('#rule').modal('open');
	});
	
	var str=window.location.search;
	localStorage.setItem('str',str)
	var arr=str.split('&');
	var openid=arr[0].substring(8,arr[0].length);
	var vipOpenid;
		if(localStorage.getItem('openid')){
			vipOpenid=localStorage.getItem('openid');
		};
		if(vipOpenid){
			if(openid != vipOpenid){
				localStorage.removeItem('person_id')	
			}
		};
	var act_id=arr[1].substring(7,arr[1].length);
	$('#share2w').on('tap',function(){//点击分享码
		window.open('http://wx.guaiguaixueche.com/test/share/index.html'+'?openid='+openid);
	})
	
		if(!act_id){//活动id不存在，进去活动结束页面，并判断是否有缓存信息，显示会员红包内容
				$('.for-login').css('display','none')
				$('.countbg').css('display','block')
				$('.countuptext').html('本次活动已经结束,敬请期待下次活动')
			if(localStorage.getItem('vipnum')&&localStorage.getItem('loginnum')&&localStorage.getItem('frednum')){
				$('#leijinum').empty();
				$('#leijinum').text(localStorage.getItem('loginnum'));
				$('#numpep').empty();
				$('#numpep').text(localStorage.getItem('vipnum'));
				$('#numred').empty();
				$('#numred').text(localStorage.getItem('frednum'));
			}else{
				$('#countleijirenshu').css('display','none');
				$('#countnumredbox').css('display','none');
				$('#countnumpepbox').css('display','none');
			}
		}else{//活动id存在
	var date2=arr[2].substring(4,arr[2].length);
	var date3=arr[3].substring(5,arr[3].length);
	var centertime=date3;
	var countdowntime;
	var daojishi;

	if(date3>0){
		daojishi=setInterval(function(){
			if(date3>0){
				date3=date3-1000;
				countdowntime=date3;
			}else{
				clearInterval(daojishi)
				countdowntime=0;
			}
		},1000)
	}else{
		countdowntime=0;
	};
	//console.log(countdowntime)
	var date4=arr[4].substring(8,arr[4].length);//date4改为关注人数
	var date5=arr[5].substring(7,arr[5].length);//抽奖次数
	$('.remaintime').text(date5)//页面显示次数
	
	var date6;//获取更新后的抽奖次数
			//更新次数和code
		if(localStorage.getItem('user_phone')){
			var usertel=localStorage.getItem('user_phone');
			$.ajax({
				type:"post",
				url:'http://wx.guaiguaixueche.com/redbag/login',
				data:'{"telephone":"'+usertel+'","openid":"'+openid+'"}',
				contentType:'application/json;charset=utf-8',
				success:function(data){
					$('.remaintime').text(data.chance);
					date6=data.chance;
				}
			})//更新次数ajax结束
		}
	
	var counttime;//页面倒计时变量
		//点击弹出红包——此时判断用户抽奖次数可以获取$('.remaintime')的值，因为能够点击抽奖，必须是登陆过，登录过抽奖次数肯定会有更新
		$(document).on('touchstart', '.dd', function(){
			var date5=$('.remaintime').text();
			if(date5>0){
				$(this).css("background-position","0 -120px");
				if(a>5){a=0}
				a++;
				if(a == num){
					$(".chuai_box").show();
					$('.chuai').css('display','block');
					//clearInterval(Timerr);
					$(".page_rain").removeClass("bg_1");
					setTimeout(function(){
						$(".page_rain").addClass("bg_2");
					},1000);
				}
			}else{
				$('.div').off().one('tap',function(){
					alert('您的中奖次数为0，请点击上方我的分享码分享获取更多次数')
				})
			}
		})//弹出红包事件结束

		/*以下是我要参与*/
	$('#join-btn').on('tap',function(){
		//console.log(countdowntime)
		var date3;
		if(countdowntime){
			date3=countdowntime
		}else{
			date3=centertime
		};
		if(localStorage.getItem('person_id')){//判断是否有缓存个人信息
	    	$('.for-login').css('display','none')
	    	if(date6 != 'undefined'){
	    		$('.remaintime').text(date6)//页面显示次数
	    	}else{
	    		$('.remaintime').text(date5)//页面显示次数
	    	};
	    	//alert('欢迎回来，您的抽奖次数还有'+$('.remaintime').text()+'次')
			if(date3<=0){
					$('.countbg').css('display','none')			
				}else{
					$('.countbg').css('display','block')
						counttime=setInterval(function(){
					if(date3>0){
						date3=date3-1000;
						if(date3<=0){
							$('.countbg').css('display','none');
							clearInterval(counttime);
						};
						if(date3 > 0){
							if(date3/600000==1 || date3/300000==1 ||date3/180000==1 || date3/60000==1 || date3/30000==1){
									window.open('http://wx.guaiguaixueche.com/redbag/redbag2?openid='+openid,'_self');
								};
							};	
						var thours=parseInt(date3/(60*60*1000))%24;
						if(thours<10){thours='0'+thours};
						var tminutes=parseInt(date3/1000/60)%60 ;
						if(tminutes<10){tminutes="0"+tminutes};
						var tseconds=parseInt(date3/1000)%60;
						if(tseconds<10){tseconds="0"+tseconds};
						$('#timedate').html(thours+'时'+tminutes+'分'+tseconds+'秒');
						var date1=new Date().getTime();
						var sevenAM = new Date().setHours(7,0,0);
						var eightAM = new Date().setHours(8,0,0);
						//如果大于七点并且小于八点
						if(sevenAM < date1 && date1 <eightAM){
							$('.countbg .redbagCom').text('一大波红包马上来袭');
						}else{
							$('.countbg .redbagCom').text('还没到时间呢，每天早上8点开始');
							$('.countuptext').text('')
						}
						//if(date1-date2>=300000){
						//	alert('页面停留时间过久，请刷新一下页面哦');
						//	window.open('http://wx.guaiguaixueche.com/redbag/redbag2?openid='+openid,'_self');
						//};
						}			
					},1000);
				}//有个人缓存信息，直接打开
	    }else{//没有个人缓存信息，登录
	    	$('.start-box').css('display','none');
			$('.login-cont-box').css('display','block')
	    }
	})
	//我要参与结束
	
	//密码可见
	$('#passshow').on('tap',function(){
		if($('#login-user-pwd_hide').css('display') == 'block'){
			$('#login-user-pwd_hide').css('display','none');
			$('#login-user-pwd_show').css('display','block');
			$('#login-user-pwd_show').val($('#login-user-pwd_hide').val());
		}else{
			$('#login-user-pwd_show').css('display','none');
			$('#login-user-pwd_hide').css('display','block');
			$('#login-user-pwd_hide').val($('#login-user-pwd_show').val());
		}
	})
	
	
	
	/*以下是登录*/
	$('#login-btn').on('tap',function(){
		//console.log(countdowntime)
		var date3=countdowntime;
		var tel=$('#login-user-tel').val();
		var	pwd;
		if($('#login-user-pwd_hide').css('display') == 'block'){
			pwd=$('#login-user-pwd_hide').val();
		}else{
			pwd=$('#login-user-pwd_show').val();
		};
		if(tel==''||pwd==''){
			//dnoclick=false;
			$('.error-box').eq(2).html('请填写您的手机号或者密码')
		}else{
			//用户账号和密码正确登录验证ajax
			pwd=(hex_md5(pwd+'salt_ggxc')).toUpperCase();
			//console.log(pwd)
			$.ajax({
				type:"post",
				url:'https://guaiguaixueche.com/employee/login',
				data:JSON.stringify({telephone:tel,salt:pwd,openid:openid}),
				dataType:'json',
				contentType:'application/json;charset=utf-8',
				success:function(data){
					//console.log(data)
					if(data.msgid == -4){
						$('.error-box').eq(2).html("账号不存在，请注册后登录！")
					}else if(data.msgid == -5){
						$('.error-box').eq(2).html("手机号或密码有误，请重新输入！")
					}else if(data.msgid == 0){
						$('.error-box').eq(2).html('');
						localStorage.setItem('person_id',data.msg);//此处设置person_id
						localStorage.setItem('user_phone',tel);//登录成功获取存储用户电话
						//localStorage.setItem('money_userpwd',pwd);//登录成功存储用户密码
						$('.for-login').css('display','none');
						//倒计时页面
						if(date3<=0){
							$('.countbg').css('display','none')			
						}else{
							$('.countbg').css('display','block')
							counttime=setInterval(function(){
							if(date3>0){
								date3=date3-1000;
								if(date3<=0){
									$('.countbg').css('display','none');
									clearInterval(counttime);
								};
								if(date3 > 0){
									if(date3/600000==1 || date3/300000==1 ||date3/180000==1 || date3/60000==1 || date3/30000==1){
										window.open('http://wx.guaiguaixueche.com/redbag/redbag2?openid='+openid,'_self');
									};
								};
								var thours=parseInt(date3/(60*60*1000))%24;
								if(thours<10){thours='0'+thours};
								var tminutes=parseInt(date3/1000/60)%60 ;
								if(tminutes<10){tminutes="0"+tminutes};
								var tseconds=parseInt(date3/1000)%60;
								if(tseconds<10){tseconds="0"+tseconds};
								$('#timedate').html(thours+'时'+tminutes+'分'+tseconds+'秒')
								var date1=new Date().getTime();
								var sevenAM = new Date().setHours(7,0,0);
								var eightAM = new Date().setHours(8,0,0);
								//如果大于七点并且小于八点
								if(sevenAM < date1 && date1 <eightAM){
									$('.countbg .redbagCom').text('一大波红包马上来袭');
									$('.countuptext').text('请稍等')
								}else{
									$('.countbg .redbagCom').text('还没到时间呢，每天早上8点开始');
									$('.countuptext').text('')
								}
								if(date1-date2>=300000){
									alert('页面停留时间过久，请刷新一下页面哦');
									window.open('http://wx.guaiguaixueche.com/redbag/redbag2?openid='+openid,'_self');
									};
								}			
							},1000);
						}//倒计时结束
						//$('#onlinepepnum').text(date4)//显示在线关注人数
						var date6;//获取更新后的抽奖次数
						//更新次数和code
						$.ajax({
							async:false,
							type:"post",
							url:'http://wx.guaiguaixueche.com/redbag/login',
							data:'{"telephone":"'+tel+'","openid":"'+openid+'"}',
							//data:{telephone:tel,openid:openid},
							//dataType:'json',
							contentType:'application/json;charset=utf-8',
							success:function(data){
								$('.remaintime').text(data.chance);
								date6=data.chance;
							}
						})//更新次数ajax结束
						alert('欢迎您'+tel+'，'+'您的抽奖次数还有'+date6+'次')
					}
				}//登录成功回调函数
			})//登录验证ajax结束
		}	
	})
	//登录结束
	
	//以下拆红包
	$('.chuai').on('tap',function(){
		/*以下是钱数*/
			var date5=$('.remaintime').text();
			//console.log(date5);
			var person_id=localStorage.getItem('person_id');
			var tel=localStorage.getItem('user_phone');
				$('.chuai_box').css('display','block');
				$('.chuai').css('display','none');
				$('.win-money').css('display','block');
				$('.win-info').html('正在开启红包');
				$.ajax({
					type:'post',
					url:"http://wx.guaiguaixueche.com/redbag/zhong",
					data:'{"act_id":"'+act_id+'","openid":"'+openid+'","telephone":"'+tel+'","personid":"'+person_id+'"}',
					contentType:'application/json;charset=utf-8',
					success:function(data){
						if($('#faceimg')){$('#faceimg').remove()};
						$('.win-money').append('<img id="faceimg"/>')
						if(data.code==0){//中奖时次数减去一，并且次数没有时提示
							$('.chuai_box').show();
							$('.win-money').css('display','block')
							var money=(data.money)/100;
							$('.win-info').html('恭喜您抢得'+money+'元'+'<br/>'+'请到乖乖学车公众号红包中领取');
							$('#faceimg').attr('src','img/qiangzhong.png')
							date5=date5-1;//中奖一次，次数减去1
							$('.chuai_box').on('tap',function(){
								$('.chuai_box').hide();
								$('.win-money').css('display','none')
								if(date5<=0){
								date5=0;
								if(confirm('是否打开我的分享码?')){
									window.open('http://wx.guaiguaixueche.com/test/share/index.html'+'?openid='+openid);//分享地址要改
									}//打开我的我二维码链接
								}
							})
						}else if(data.code == -1){
							var money=(data.money)/100;
							$('.win-info').html('抢得'+money+'元')
							$('.chuai_box').on('tap',function(){
								$('.chuai_box').css('display','none')
							})
						}else if(data.code == 6){//为6时，设置次数为0，并且点击提示分享
							$('.win-info').html('您的抢红包机会已经用完，请点击上方我的分享码分享获取更多机会!');
							$('#faceimg').attr('src','img/nojihui.png')
							$('.chuai_box').on('tap',function(){
								$('.chuai_box').css('display','none')
								$('.win-money').css('display','none')
							})
							date5=0;
							
						}else if(data.code == 4 || data.code == 3){//打开提示活动结束，返回活动倒计时页面
							$('.win-info').html('晚啦！活动已经结束了!没关系，还有下次活动,记得早点来啊！');
							$('#faceimg').attr('src','img/huodongjieshu.png')
							$('.chuai_box').on('tap',function(){
							$('.countbg').css('display','block');
								$('.countuptext').html('本次活动已经结束,敬请期待下次活动');
								$('#leijinum').text(loginnum);
								$('#numred').text(frednum);
								$('#numpep').text(vipnum);
							})
							date5=date5;
														
						}else if(data.code == 2){
							$('.chuai_box').show();
							$('.win-money').css('display','block')
							$('.win-info').html('本次活动，每个用户只能领取一次');
							$('#faceimg').attr('src','img/yici.png')
							$('.chuai_box').on('tap',function(){
								$('.chuai_box').hide();
								$('.win-money').css('display','none')
							})
							date5=date5;
							$('.div').off().one('tap',function(){
									alert('本次活动您已领取过，敬请期待下次活动。您可以点击上方分享链接分享给更多好友哦！')
								})
							
						}else if(data.code == 7){//没有中奖，可以返回去重新点击
							$('.chuai_box').show();
							$('.win-money').css('display','block')
							$('.win-info').html('手气不太好，再来一次');
							$('#faceimg').attr('src','img/meiqiangzhong.png')
							date5=date5;
							$('.chuai_box').on('tap',function(){
								$('.chuai_box').hide();
								$('.win-money').css('display','none')
							})
							
						}else if(data.code == 5){
							$('.chuai_box').show();
							$('.win-money').css('display','block')
							$('.win-info').html('谢谢关注乖乖学车');
							$('#faceimg').attr('src','img/xiexieguanzhu.png');
							$('.chuai_box').on('tap',function(){
								$('.chuai_box').hide();
								$('.win-money').css('display','none')
							})
						}else if(data.code == 8){
							$('.chuai_box').show();
							$('.win-money').css('display','block')
							$('.win-info').html('时间很晚了，请及时休息哦');
							$('#faceimg').attr('src','img/xiexieguanzhu.png');
							$('.chuai_box').on('tap',function(){
								$('.countbg').css('display','block');
								$('.countuptext').html('本次活动已经结束,敬请期待下次活动');
								$('#leijinum').text(loginnum);
								$('#numred').text(frednum);
								$('#numpep').text(vipnum);
							})
						}else{
							$('.chuai_box').show();
							$('.win-money').css('display','block')
							$('.win-info').html('谢谢关注乖乖学车');
							$('#faceimg').attr('src','img/xiexieguanzhu.png');
							$('.chuai_box').on('tap',function(){
								$('.chuai_box').hide();
								$('.win-money').css('display','none')
							})
						}//判断code完毕
						$('.remaintime').empty();
						$('.remaintime').text(date5);//页面显示次数
					}
				})//判断
			//拆红包函数结束	
	})//拆红包结束
	var vipnum,loginnum,frednum;
	function runup(){
			/*以下是列表*/
		$.ajax({
		async:false,	
		type:'post',
		url:"http://wx.guaiguaixueche.com/redbag/zlist",
		data:'{"act_id":"'+act_id+'"}',
		contentType:'application/json;charset=utf-8',
		success:function(data){
			$('#leijinum').empty();
			$('#leijinum').text(data.activer);
			$('#knumpep').empty();
			$('#knumpep').text(data.person);
			$('#knumred').empty();
			$('#knumred').text(data.redbag);
			$('#numpep').empty();
			$('#numpep').text(data.person);
			$('#numred').empty();
			$('#numred').text(data.redbag);
			vipnum=data.person;
			loginnum=data.activer;
			frednum=data.redbag;
			//活动关注人数
			$('#onlinepepnum').empty();
			$('#onlinepepnum').text(data.activer);
			if(data.list.length==0){
				$('.no-winner').css('display','block');
				$('.list-info').css('display','none');
			}else if(data.list.length>4){//信息数量大于4
				$('.no-winner').css('display','none');
				$('.list-info').css('display','block');
				
				if($('.winli')){//判断是否有信息
					if($('.winli').length < data.list.length){//长度小于等于增加新数据
						var addwinli=data.list.slice($('.winli').length);//增加的新数据截取保存数组
						
						for(var i=0;i<addwinli.length;i++){
							var m;
							var money=addwinli[i].money;
							var phone=addwinli[i].phone;
							var phone2=phone.substring(0,3)+'****'+phone.substring(7,11);
							if(money%100==0){
								 m=money/100+'.00';
							}else{
								 m=(money/100).toFixed(2);
							}
							var oLi=$('<li class="winli"><b class="winner-tel">'+phone2+'</b><span class="winner-money">'+m+'</span></li> ');
							$('#top ul').append(oLi);
						}
					}
				}else{//不存在旧数据或者第一次进入，直接循环添加数据
					for(var i=0;i<data.list.length;i++){
						var m;
						var money=data.list[i].money;
						var phone=data.list[i].phone;
						var phone2=phone.substring(0,3)+'****'+phone.substring(7,11);
						if(money%100==0){
							 m=money/100+'.00';
						}else{
							 m=(money/100).toFixed(2);
						}
						
						var oLi=$('<li class="winli"><b class="winner-tel">'+phone2+'</b><span class="winner-money">'+m+'</span></li> ');
						$('#top ul').append(oLi);
					}
				}//添加数据结束
				//以下是不断滚动的效果
				var interval=1000;//两次滚动之间的时间间隔 
				//var stepsize=35;//滚动一次的长度，必须是行高的倍数,这样滚动的时候才不会断行 
				var stepsize=36;
				var objInterval=null; 
				$("#bottom").html($("#top").html()); 
				StartScroll(); 
				function StartScroll(){ 
					objInterval=setInterval(verticalloop,interval); 
				} 
				function StopScroll(){ 
					window.clearInterval(objInterval); 
				} 
				function verticalloop(){ 
					//判断是否上部内容全部移出显示区域 
					//如果是，从新开始;否则，继续向上移动 
					if($("#content").scrollTop()>=$("#top").outerHeight()){ 
						$("#content").scrollTop($("#content").scrollTop()-$("#top").outerHeight()); 
					} 
					//使用jquery创建滚动时的动画效果 
					$("#content").stop(true).animate( 
					{"scrollTop" : $("#content").scrollTop()+stepsize+"px"},1000); 
				}
			}else if(data.list.length<=4){//信息数量小于4
				$('#top ul').empty()
				$('.no-winner').css('display','none');
				$('.list-info').css('display','block');
				for(var i=0;i<data.list.length;i++){
					var m;
					var money=data.list[i].money;
					var phone=data.list[i].phone;
					var phone2=phone.substring(0,3)+'****'+phone.substring(7,11);
					if(money%100==0){
						 m=money/100+'.00';
					}else{
						 m=(money/100).toFixed(2);
					}
					var oLi=$('<li><b class="winner-tel">'+phone2+'</b><span class="winner-money">'+m+'</span></li>');
					$('#top ul').append(oLi);
				}
			}
		}
	})
	}//移动函数
	runup();
	setInterval(runup,10000);
	localStorage.setItem('vipnum',vipnum)
	localStorage.setItem('loginnum',loginnum)
	localStorage.setItem('frednum',frednum)
	}//判断act_id结束

	//var oldact_id=act_id;
	localStorage.setItem('Aopenid',openid);
})
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
	var myScroll=new IScroll('#wrapper',{
        snap:true,
        hScrollbar:false
	})
	function reloadScroll(){
			setTimeout(function(){myScroll.refresh()},500)
	}
	
	if(window.location.search==''){
		recommend_telephone=''
	}else{
		var str=window.location.search;
		var str1=str.substring(6,str.length);
		localStorage.setItem('recommend_telephone',true);
		$.ajax({
			type:"post",
			url:'https://guaiguaixueche.com.cn/api/getRecTel',
			data:{ggxc:str1},
			dataType:'json',
			async:false,
			success:function(data){
				if(data.code=="success"){
					recommend_telephone = data.content;
				}	
			}
		})
	}
	
	
	var para=localStorage.getItem('str');
	var per=window.location.search;
	var per1=per.substring(6,per.length);
	var send=false;
	$('#get-code-btn').on('tap',function(){
		if(send){return false;}	//如果正在发送验证码则不执行下边程序
		$('.error-box').eq(4).empty();
		var tel=$('#reg-user-tel').val(),
			reg=/^1(3|4|5|7|8)\d{9}$/;
		if(tel==''){
			$('.error-box').eq(0).html('号码不能为空')
		}else if(reg.test(tel)==false){
			$('.error-box').eq(0).html('号码格式错误,请重新输入!')
		}else{
				$('.error-box').eq(0).empty();
				$('.error-box').eq(1).empty();
				$.ajax({
					type:"post",
					url:'https://guaiguaixueche.com/employee/getcode',
					data:JSON.stringify({telephone:tel,type:"0"}),
					contentType:'application/json;charset=utf-8',
					dataType:'json',
					async:false,
					cache: false,
					success:function(data){
						//console.log(data)
						if(data.msgid == -3){
							var txt1=data.msg;
							$('.error-box').eq(0).html(txt1)
						}else if(data.msgid == -4){
							$('.error-box').eq(1).html(data.msg)
						}else if(data.msgid == 0){
							send=true;
							$('.error-box').eq(1).html('验证码已发送,如未收到,请在120S后再次获取');
							countDown($('#get-code-btn'));
						}else if(data.msgid == -5){
							$('.error-box').eq(1).html(data.msg);
						}
					}
				})
			}
	})
	function countDown(obj) {
	    if (obj.val() == "获取验证码") {
	    	var msg = "等待";
	        var _delay = 120;
	        var delay = _delay;
	        obj.val(msg + _delay).addClass("code-disabled");
	        var timer = setInterval(function() {
	            if (delay > 1) {
	                delay--;
	                obj.val(msg + delay);
	                setLocalDelay(msg + delay);
	                obj.attr('disabled','disabled');
	            }else {
	            	send=false;
	                clearInterval(timer);
	                $('.error-box').eq(1).html('')
	                obj.val("获取验证码").removeClass("code-disabled").removeAttr('disabled');
	            }
	        }, 1000);
		} 
	}
	$('#reg-user-pwd_hide').blur(function(){
		var 
			reg=/^[\w]{6,12}$/,
			pwd=$('#reg-user-pwd_hide').val();
		if(reg.test(pwd)==false){
			$('.error-box').eq(2).html('密码为6-12位的数字、字母或者下划线');
		}else{
			$('.error-box').eq(2).html(' ');
		}
	})
	$('#reg-user-pwd_show').blur(function(){
		var 
			reg=/^[\w]{6,12}$/,
			pwd=$('#reg-user-pwd_show').val();
		if(reg.test(pwd)==false){
			$('.error-box').eq(2).html('密码为6-12位的数字、字母或者下划线');
		}else{
			$('.error-box').eq(2).html(' ');
		}
	})
	$('#deal-cont').on('tap',function(){
		$('.deal-bg').css('display','block');
		$('.deal-box').css('display','block');
		reloadScroll();
	})
	$('#agree-btn').on('tap',function(){
		$('.deal-bg').css('display','none');
		$('.deal-box').css('display','none');
		$('#agree-box').attr('checked','checked');
	})
	
	$('.deal-bg').on('tap',function(){
		$('.deal-bg').css('display','none');
		$('.deal-box').css('display','none');
	})
	
	//密码可见
	$('#reg_passshow').on('tap',function(){
		if($('#reg-user-pwd_hide').css('display') == 'block'){
			$('#reg-user-pwd_hide').css('display','none');
			$('#reg-user-pwd_show').css('display','block');
			$('#reg-user-pwd_show').val($('#reg-user-pwd_hide').val());
		}else{
			$('#reg-user-pwd_show').css('display','none');
			$('#reg-user-pwd_hide').css('display','block');
			$('#reg-user-pwd_hide').val($('#reg-user-pwd_show').val());
		}
	})
	
	var openid=localStorage.getItem('Aopenid');
	var noclick=false;
	$('#reg-btn').on('tap',function(){
		if(noclick){ return false}
		noclick=true;
		var tel=$('#reg-user-tel').val(),
			code=$('#reg-user-code').val();
		var	pwd;
			if($('#reg-user-pwd_hide').css('display') == 'block'){
				pwd=$('#reg-user-pwd_hide').val();
			}else{
				pwd=$('#reg-user-pwd_show').val();
			}
		var reg=/^[\w]{6,12}$/;
		
		if(tel==''||code==''||pwd==''){
			noclick=false;
			$('.error-box').eq(4).html('请先完善您的注册信息');
		}else if(reg.test(pwd)==false){
			noclick=false;
			$('.error-box').eq(2).html('密码为6-12位的数字、字母或者下划线');
		}else if($('#agree-box').attr('checked')!='checked'){
			noclick=false;
			$('.error-box').eq(4).html('请先阅读用户协议');
		}else{
			$('.error-box').eq(4).html('');
			pwd=(hex_md5(pwd+'salt_ggxc')).toUpperCase();
			console.log(pwd)
			$.ajax({
				async:false,
				type:"post",
				url:'https://guaiguaixueche.com/employee/register',
				data:JSON.stringify({telephone:tel,salt:pwd,code:code,userid:recommend_telephone,openid:openid}),
				dataType:'json',
				contentType:'application/json;charset=utf-8',
				success:function(data){
					noclick=false;
					//console.log(data);
						if(data.msgid == -5){
							$('.error-box').eq(4).html('验证码已过期，请重新获取!');
						}else if(data.msgid == -6){
							$('.error-box').eq(4).html('验证码错误，请重新输入!');
						}else if(data.msgid == -7){
							$('.error-box').eq(4).html('注册失败，请重新注册!');
						}else if(data.msgid == 0){
							$('.error-box').eq(4).empty();
							alert('注册成功');
							localStorage.setItem('phone',tel);
							if(per1){
								window.open('http://weixin.qq.com/r/Gjrm-qvEmfbmre_d928I','_self');
							}else{
								window.open('../index.html'+para,'_self');
							}
						}
				}
			})
		}
	})
})

						
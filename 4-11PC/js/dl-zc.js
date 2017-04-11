$(document).ready(function () {
    //设置cookie
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires + ";path=/";
    }
    //获取cookie的值
    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
    }
    //清除指定cookie
    function clearCookie(name) {
        setCookie(name, "", -1);
    }
    var openid = getCookie('openid');
    var user_phone = getCookie('user_phone');
    if (openid != '' && user_phone != '') {
        $('.gg-header .login-reg').html('<p class="logged">亲，您已登录！&nbsp;<span id="exit">退出</span></p>');
        //添加退出
        onExit();
    }
    //登录DOM
    $('body').append('<div id="log-dl" class="modal"></div>');
    $('#log-dl').append('<form></form>');
    $('#log-dl form').append('<p class="yellow darken-3 white-text login-form-p center-align">账户登录</p>');
    $('#log-dl form').append('<p class="hintbox"></p>');
    $('#log-dl form').append(
        '<div class="gg-login-input">' +
        '<div class="gg-login-input-img">' +
        '<img src="../../Images/login_img/login_04.png">' +
        '</div>' +
        '<input class="inputbox" type="tel" id="logintel" placeholder="请输入手机号">' +
        '</div>'
    );
    $('#log-dl form').append('<p class="hintbox"></p>');
    $('#log-dl form').append(
        '<div class="gg-login-input">' +
        '<div class="gg-login-input-img">' +
        '<img src="../../Images/login_img/login_05.png">' +
        '</div>' +
        '<input class="inputbox" type="password" id="loginpwd" placeholder="请输入密码">' +
        '</div>'
    );
    $('#log-dl').append('<p class="gg-login-lost-pw"><a href="#reset-pwd">忘记密码?</a></p>');
    $('#log-dl').append('<a id="logintap" class="gg-login-btn solid">登录</a>');
    $('#log-dl').append('<a href="#log-zc" class="modal-close gg-login-btn hollow">没注册?马上注册</a>')
    $('#log-dl').append('<div class="QRcode"><img src="../../Images/login_img/login_11.png"><p class="markWords">乖乖学车&nbsp;一步到位</p></div>')

    //登录请求
    var reg = /^1(3|4|5|7|8)\d{9}$/;
    $('#logintel').on('blur', function () {
        if (reg.test($(this).val())) {
            $('.hintbox').eq(0).html('');
        } else(
            $('.hintbox').eq(0).html('手机号格式错误')
        )
    });
    var isLogin = false;
    $('#logintap').on('click', function () {
        if (isLogin) {
            return false
        }
        isLogin = true;
        var tel = $('#logintel').val(), pwd = $('#loginpwd').val();
        //var openid = localStorage.getItem('openid');
        var openid = getCookie('openid');
        if (tel == '' || pwd == '') {
            $('.hintbox').eq(0).html('请填写您的手机号或者密码');
            isLogin = false;
        } else if (reg.test(tel) == false) {
            $('.hintbox').eq(0).html('手机号输入有误请重新输入');
            isLogin = false;
        } else {
            pwd = (hex_md5(pwd + 'salt_ggxc')).toUpperCase();
            loginFn(tel, pwd, openid);
        }
    });
    //封装登录
    function loginFn(tel, pwd, openid) {
        $.ajax({
            type: "post",
            url: 'https://guaiguaixueche.com/employee/login',
            data: JSON.stringify({telephone: tel, salt: pwd, openid: openid}),
            async: false,
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: function (data) {
                isLogin = false;
                if (data.msgid == -4) {
                    $('.hintbox').eq(0).html('账号不存在，请先注册后再登录');
                } else if (data.msgid == -5) {
                    $('.hintbox').eq(0).html('手机号或密码错误')
                } else if (data.msgid == 0) {
                    $('.hintbox').eq(0).html('');
                    setCookie('openid', data.msg, 7);
                    setCookie('user_phone', tel, 7);
                    alert('登录成功');
                    $('#log-dl').modal('close');
                    $('#log-zc').modal('close');
                    $('.gg-header .login-reg').html('<p class="logged">亲，您已登录！&nbsp;<span id="exit">退出</span></p>');
                    //退出
                    onExit();
                }
            }
        })
    }

    //封装点击退出清理cookie
    function onExit() {
        $('#exit').on('click', function () {
            clearCookie('openid');
            clearCookie('user_phone');
            $('.login-reg').html('<a href="#log-dl">登录</a> | <a href="#log-zc">注册</a>')
            alert('亲,您已退出,期待您下次到来');
        });
    }

    //注册DOM
    $('body').append('<div id="log-zc" class="modal"></div>');
    $('#log-zc').append('<form></form>');
    $('#log-zc form').append('<p class="yellow darken-3 white-text login-form-p center-align">手机注册</p>');
    $('#log-zc form').append('<div class="hasReg"><span class="right">已注册&nbsp;<a href="#log-dl" class="modal-close yellow-text text-darken-3">登录</a></span></div>');
    $('#log-zc form').append('<p class="reghintbox"></p>');
    $('#log-zc form').append(
        '<div class="gg-login-input">' +
        '<div class="gg-login-input-img">' +
        '<img src="../../Images/login_img/login_04.png">' +
        '</div>' +
        '<input class="inputbox" type="tel" id="tel" placeholder="请输入手机号">' +
        '</div>');
    $('#log-zc form').append('<p class="reghintbox"></p>');
    $('#log-zc form').append(
        '<div class="gg-login-input auth-code">' +
        '<div class="gg-login-input-img">' +
        '<img src="../../Images/login_img/login_06.png">' +
        '</div>' +
        '<input class="inputbox" type="tel" id="code"  placeholder="请输入验证码">' +
        '<input type="button" value="获取验证码" id="codebtn" class="auth-code-btn">'
    );
    $('#log-zc form').append('<p class="reghintbox"></p>');
    $('#log-zc form').append(
        '<div class="gg-login-input">' +
        '<div class="gg-login-input-img">' +
        '<img src="../../Images/login_img/login_05.png">' +
        '</div>' +
        '<input class="inputbox" type="password" id="pwd" placeholder="请输入密码">' +
        '</div>');
    $('#log-zc form').append('<p class="reghintbox"></p>');
    $('#log-zc form').append(
        '<div class="gg-login-input">' +
        '<div class="gg-login-input-img">' +
        '<img src="../../Images/login_img/login_05.png">' +
        '</div>' +
        '<input class="inputbox" type="password" id="pwd1" placeholder="请再次输入密码">' +
        '</div>');
    $('#log-zc form').append('<p class="reghintbox"></p>');
    $('#log-zc form').append('<a id="regbtn" class="gg-login-btn solid reg">注册</a>');
    $('#log-zc form').append('<p class="gg-login-readme">注册即视为同意<a href="#modal1" class="rule">《用户注册协议》</a></p>');
    $('#log-zc form').append('<div class="QRcode"><img src="../../Images/login_img/login_11.png"><p class="markWords">乖乖学车&nbsp;一步到位</p></div>')
//	注册请求
    var recommend_telephone = '';
    var send = false;
    //验证码ajax
    $('#codebtn').on('click', function () {
        if (send) {
            return false;
        }	//如果正在发送验证码则不执行下边程序
        $('.reghintbox').eq(4).empty();
        var tel = $('#tel').val(),
            reg = /^1(3|4|5|7|8)\d{9}$/;
        //console.log(tel)
        if (tel == '') {
            $('.reghintbox').eq(0).html('号码不能为空')
        } else if (reg.test(tel) == false) {
            $('.reghintbox').eq(0).html('号码格式错误,请重新输入!')
        } else {
            $('.reghintbox').eq(0).html(' ');
            $.ajax({
                type: "post",
                url: 'https://guaiguaixueche.com/employee/getcode',
                data: JSON.stringify({telephone: tel, type: "0"}),
                dataType: 'json',
                contentType: 'application/json;charset=utf-8',
                async: false,
                cache: false,
                success: function (data) {
                    if (data.msgid == -3) {
                        var txt1 = data.msg;
                        $('.reghintbox').eq(0).html(txt1)
                    } else if (data.msgid == -4) {
                        $('.reghintbox').eq(1).html(data.msg)
                    } else if (data.msgid == 0) {
                        send = true;
                        $('.reghintbox').eq(1).html('验证码已发送,如未收到,请120S后再次获取');
                        countDown($('#codebtn'));
                    } else if (data.msgid == -5) {
                        $('.reghintbox').eq(1).html(data.msg);
                    }
                }
            })
        }
    });
    function countDown(obj) {
        if (obj.val() == "获取验证码") {
            var msg = "等待";
            var _delay = 120;
            var delay = _delay;
            obj.val(msg + _delay);
            obj.css('backgroundColor', '#cecece');
            var timer = setInterval(function () {
                if (delay > 1) {
                    delay--;
                    obj.val(msg + delay);
                    obj.attr('disabled', 'disabled');
                } else {
                    send = false;
                    clearInterval(timer);
                    $('.reghintbox').eq(1).html('');
                    obj.css('backgroundColor', '#F8BA2A');
                    obj.val("获取验证码").removeAttr('disabled');
                }
            }, 1000);
        }
    }

    var isLeg = false;
    $('#regbtn').on('click', function () {
        if (isLeg == true) {
            return false;
        }
        isLeg = true;
        var reg = /^[\w]{6,12}$/;
        var
            tel = $('#tel').val(),
            code = $('#code').val(),
            pwd = $('#pwd').val(),
            pwd1 = $('#pwd1').val();
        //var openid = localStorage.getItem('openid');
        var openid = getCookie('openid');
        if (tel == '' || code == '' || pwd == '') {
            $('.reghintbox').eq(4).html('请先完善您的注册信息');
            isLeg = false;
        } else if (pwd != pwd1) {
            $('.reghintbox').eq(4).html('两次密码输入不一致，请检查后重新输入');
            isLeg = false;
        } else if (reg.test(pwd) == false) {
            $('.reghintbox').eq(4).html('密码为6-12位的数字、字母或者下划线');
            isLeg = false;
        } else {
            $('.reghintbox').eq(4).html('');
            pwd = (hex_md5(pwd + 'salt_ggxc')).toUpperCase();
            //console.log(pwd)
            $.ajax({
                type: "post",
                url: 'https://guaiguaixueche.com/employee/register',
                data: JSON.stringify({
                    telephone: tel,
                    salt: pwd,
                    code: code,
                    userid: recommend_telephone,
                    openid: openid
                }),
                async: false,
                dataType: 'json',
                contentType: 'application/json;charset=utf-8',
                success: function (data) {
                    isLeg = false;
                    if (data.msgid == -5) {
                        $('.reghintbox').eq(4).html('验证码已过期，请重新获取!');
                    } else if (data.msgid == -6) {
                        $('.reghintbox').eq(4).html('验证码错误，请重新输入!');
                    } else if (data.msgid == -7) {
                        $('.reghintbox').eq(4).html('注册失败，请重新注册!');
                    } else if (data.msgid == 0) {
                        $('.reghintbox').eq(4).html('注册成功了,两秒后自动登录');
                        setTimeout(function () {
                            loginFn(tel, pwd, openid);
                        }, 2000)
                    }
                }
            })
        }
    });
//	重置密码DOM
    $('body').append('<div id="reset-pwd" class="modal"></div>');
    $('#reset-pwd').append('<form></form>');
    $('#reset-pwd form').append('<p class="yellow darken-3 white-text reset-form-p center-align">重置密码</p>');
    $('#reset-pwd form').append('<div class="back-log">' +
        '<span>已重置<a href="#log-dl" class="modal-close yellow-text text-darken-3">去登录</a></span>' +
        '</div>');
    $('#reset-pwd form').append('<div class="reset-header">' +
        '<img src="../../Images/login_img/shareguaiguaitop.png">' +
        '</div>');
    $('#reset-pwd form').append('<div class="reset-word">重置密码</div>')
    $('#reset-pwd form').append('<div class="reset-cont-box">' +
        '<div class="reset-tel-box">' +
        '<input type="tel" placeholder="请输入需重置密码的手机号" id="reset-tel">' +
        '</div>' +
        '</div>');
    $('#reset-pwd form').append('<p class="error-box"></p>');
    $('#reset-pwd form').append('<div class="reset-btn-box">' +
        '<input type="button" value="确认重置密码" id="reset-btn">' +
        '</div>');
    $('#reset-pwd form').append('<p class="hint-box">' +
        '确认重置密码，我们将会以短信的形式将新密码发送至您的手机账号。请确认手机号输入无误，重置密码后您可登录账号在个人中心重新修改密码' +
        '</p>');
//重置请求
    $('#reset-btn').on('click', function () {
        reg = /^1(3|4|5|7|8)\d{9}$/;
        var onetel = $('#reset-tel').val();
        if (reg.test(onetel) == false) {
            $('.error-box').html("号码格式有误，请重新输入");
        } else {
            $.ajax({
                type: "post",
                url: "https://guaiguaixueche.com/employee/getcode",
                async: true,
                data: JSON.stringify({telephone: onetel, type: "2"}),
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                success: function (data) {
                    data={
                        msgid:0
                    }
                    if (data.msgid == -5) {
                        $('.error-box').html(data.msg);
                    } else if (data.msgid == 0) {
                        //localStorage.setItem('phone',onetel)
                        $('.error-box').html('密码已发送至您的手机，三秒跳转至登录页面');
                        setTimeout(function () {
                            $('#reset-pwd').modal('close');
                        }, 3000)
                    } else if (data.msgid == -6) {
                        $('.error-box').html("该号码没有注册，请先注册！");
                    }
                }
            });
        }
    });
//	协议DOM
    $('body').append('<div id="modal1" class="modal"></div>');
    $('#modal1').append('<div class="modal-content"></div>');
    $('#modal1 .modal-content').append('<div class="title" style="font-size: 30px;">乖乖学车平台服务协议</div>' +
        '<div class="data-main-cont">' +
        '<p>本协议是您与河南炯途网络科技有限公司（下称“应用服务提供者”）之间关于使用其提供的服务之间签署的正式的、完整的协议。</p>' +
        '<h6>相关定义</h6>' +
        '<p>1、学员：指具有学车或练车需求、按照乖乖学车平台要求完成注册的自然人。</p>' +
        '<p>2、驾驶培训提供方：指依法取得驾驶培训许可、在乖乖学车平台登记注册的驾驶培训机构。</p>' +
        '<p>3、乖乖学车服务平台：由河南炯途网络科技有限公司利用先进的互联网信息技术创建，整合机动车驾驶人培训和机动车驾驶人考试资源，致力于为驾驶培训提供方及学员提供高效、便捷、高品质、可选择的学车信息服务。平台包括PC端网站（www.guaiguaixueche.com）、无线移动终端APP（安卓与苹果）和微信端（“乖乖学车”公众号）。</p>' +
        '<p>4、预约练车服务：由学员在乖乖学车平台上使用驾驶培训提供方发布的驾驶培训计划，由学员根据该计划预约练车的服务。</p>' +
        '<p>5、教学服务：由学员选择的驾驶培训提供方按照驾驶培训法律、法规、规章、规范、规范性文件之规定，与学员签订的驾驶培训服务协议及产品服务协议之约定提供的服务。</p>' +
        '<p>6、电子优惠券：由乖乖学车服务平台提供的，登记学员学车具体信息的电子优惠券，学员选择的驾驶培训提供方按照电子优惠券的折扣报名时进行减免。</p>' +
        '<p>7、服务商品价格或产品价格：学员在乖乖学车平台上订购的驾驶培训提供方发布的驾驶培训服务产品所对应的价款。</p>' +
        '<h6><span style="font-size: 16px;">一、协议范围</span></h6>' +
        '<p>1.1协议适用范围</p>' +
        '<p>本协议是您与应用服务提供者之间关于您下载、安装、使用、复制本应用，以及使用应用服务提供者相关服务所订立的协议。</p>' +
        '<p>1.2协议完整性</p>' +
        '<p>本协议内容同时包括应用服务提供者可能不断发布的关于本服务的相关协议、业务规则等内容。上述内容一经正式发布，即为本协议不可分割的组成部分，您同样应当遵守。</p>' +
        '<h6><span style="font-size: 16px;">二、知识产权声明</span></h6>' +
        '<p>2.1“乖乖学车”服务平台是河南炯途网络科技有限公司开发。“乖乖学车”服务平台的一切版权、商标权、专利权、商业秘密等知识产权，以及相关的所有信息内容，包括但不限于：文字表述及其组合、图标、图饰、图表、色彩、界面设计、版面框架、有关数据、印刷材料或电子文档等均受中华人民共和国著作权法、商标法、专利法、反不正当竞争法和相应的国际条约以及其他知识产权法律法规的保护，除涉及第三方授权的软件或技术外，本公司享有上述知识产权。</p>' +
        '<p>2.2未经本公司书面同意，用户不得为任何盈利性或非盈利性的目的自行实施、利用、转让或许可任何第三方实施、利用、转让上述知识产权，本公司保留追究上述未经许可行为的权利。</p>' +
        '<h6><span style="font-size: 16px;">三、乖乖学车提供的服务</span></h6>' +
        '<p>3.1、乖乖学车基于互联网、移动互联网技术以O2O的全新商业模式整合驾驶培训机构、教练员、学员等资源信息为学员、驾驶培训提供方提供信息共享平台。</b>' +
        '<p>3.2、专业的预约培训信息服务平台：乖乖学车服务平台利用先进的信息集散技术，构建了专业预约培训信息服务平台，致力于为学员及驾驶培训提供方提供高效、便捷、高品质的预约培训信息服务。</p>' +
        '<p>3.3、高度一致的服务标准：乖乖学车平台制定详细的学车服务标准，包括对相对应的班型每车人数的要求，教练员专业水平评价、7天无理由退款、一费制统一价格、学员利益受损先行赔付和专属学车顾问一对一服务</p>' +
        '<p>3.4、线下考场资源整合：驾驶培训提供方必须配套体检照相、信息录入和考场，平台采用邀请的方式考核符合标准的驾驶培训提供方入驻平台，做到在哪里培训就在哪里考试，实现驾驶员培训和考试相结合的一站式服务。</p>' +
        '<h6><span style="font-size: 16px;">四、服务费用</span></h6>' +
        '<p>4.1、对于乖乖学车平台提供的信息服务，河南炯途网络科技有限公司不向学员收取服务费用。</p>' +
        '<p>4.2、学员在乖乖学车平台中选择培训服务，线上通过在线支付获得电子优惠券；根据优惠凭证向驾驶培训提供方线下支付优惠后的学车费用，同时学员与驾驶培训提供方签订《河南省机动车驾驶员培训合同》</p>' +
        '<p>4.3、学员订购完成、并将订购产品所对应的全部价款支付完毕，即视为学员与驾驶培训提供方就订购产品订立了产品服务协议及《河南省机动车驾驶员培训合同》。有关订购产品涉及的学员与驾驶培训提供方之间的权利义务，详见上述产品服务协议及《河南省机动车驾驶员培训合同》。</p>' +
        '<h6><span style="font-size: 16px;">五、通知的发送</span></h6>' +
        '<p>河南炯途网络科技有限公司可以向学员注册时预留手机号码以及安装乖乖学车APP的手机通知栏向学员发送通知。河南炯途网络科技有限公司向学员发送通知时，可以在平台公告栏上公布该通知，该种通知模式与向学员发送通知具有同样的法律效力。</p>' +
        '<h6><span style="font-size: 16px;">六、投诉处理</span></h6>' +
        '<p>6.1、若学员对驾驶培训提供方的培训服务不满意，学员可以选择向乖乖学车平台进行投诉。</p>' +
        '<p>6.2、乖乖学车平台收到投诉之后，在2小时内通过与学员、驾驶培训提供方充分沟通, 作出初步调查报告，并通知学员及驾驶培训提供方处理解决，平台负责协调解决并至双方满意为止。</p>' +
        '<p>6.3、对于学员向乖乖学车平台提出的投诉，乖乖学车平台有权进行定性和处理。乖乖学车平台将从学员的感受出发，快速有效地处理学员的投诉。</p>' +
        '<p>6.4、乖乖学车制定服务质量监管体系，制定投诉率指标并定期公布，投诉率将作为衡量驾驶培训提供方工作质量的重要指标，纳入到学员对服务的整体评价之中。</p>' +
        '<h6><span style="font-size: 16px;">七、应用的获取</span></h6>' +
        '<p>7.1您可以直接从应用服务提供者的网站上获取本应用，也可以从得到应用服务提供者授权的第三方获取。</p>' +
        '<p>7.2如果您从未经应用服务提供者授权的第三方获取本应用或与本应用名称相同的安装程序，应用服务提供者无法保证该应用能够正常使用，并对因此给您造成的损失不予负责。</P>' +
        '<h6><span style="font-size: 16px;">八、应用的安装与卸载</span></h6></b>' +
        '<p>8.1应用服务提供者可能为不同的终端设备开发了不同的应用版本，您应当根据实际情况选择下载合适的版本进行安装。</p>' +
        '<p>8.2下载安装程序后，您需要按照该程序提示的步骤正确安装。</p>' +
        '<p>8.3为提供更加优质、安全的服务，在本应用安装时应用服务提供者可能推荐您安装其他应用，您可以选择安装或不安装。</p>' +
        '<p>8.4如果您不再需要使用本应用或者需要安装新版应用，可以自行卸载。</p>' +
        '<h6><span style="font-size: 16px;">九、应用的更新</span></h6>' +
        '<p>9.1为了改善用户体验、完善服务内容，应用服务提供者将不断努力开发新的服务，并为您不时提供应用更新（这些更新可能会采取应用替换、修改、功能强化、版本升级等形式）</p>' +
        '<p>9.2为了保证本应用及服务的安全性和功能的一致性，应用服务提供者有权不经向您特别通知而对应用进行更新，或者对应用的部分功能效果进行改变或限制。</p>' +
        '<p>9.3本应用新版本发布后，旧版本的应用可能无法使用。应用服务提供者不保证旧版本应用继续可用及相应的客户服务，请您随时核对并下载最新版本。</p>' +
        '<h6><span style="font-size: 16px;">十、用户个人信息保护</span></h6>' +
        '<p>10.1保护用户个人信息是应用服务提供者的一项基本原则，应用服务提供者将会采取合理的措施保护用户的个人信息。除法律法规规定的情形外，未经用户许可应用服务提供者不会向第三方公开、透露用户个人信息。应用服务提供者对相关信息采用专业加密存储与传输方式，保障用户个人信息的安全。</p>' +
        '<p>10.2您在注册账号或使用本服务的过程中，需要提供一些必要的信息，例如：所提供的身份证真实姓名、实名制手机号码等。若您提供的信息不完整，则无法使用本服务或在使用过程中受到限制。</p>' +
        '<p>10.3一般情况下，您可随时浏览、修改自己提交的信息，但出于安全性和身份识别的考虑，在审核完毕后，您可能无法自主修改所提供的信息，需要修改信息时请联系河南炯途网络科技有限公司进行修改。</p>' +
        '<p>10.4应用服务提供者将运用各种安全技术和程序建立完善的管理制度来保护您的个人信息，以免遭受未经授权的访问、使用或披露。</p>' +
        '<p>10.5未经您的同意，应用服务提供者不会向应用服务提供者以外的无关的公司、组织和个人披露您的个人信息，但法律法规另有规定的除外。</p>' +
        '<h6><span style="font-size: 16px;">十一、驾驶培训提供方使用规范</span></h6>' +
        '<p>在使用乖乖学车服务平台过程中，需要承诺遵守以下约定：</p>' +
        '<p>（1）实施的所有行为均遵守法律、法规、规章、规范、标准、行政规范性文件及平台上发布的各项规则，不违背社会公共利益或公共道德，不损害他人的合法权益，不违反本协议及相关规则。</p>' +
        '<p>（2）不得在平台上复制、发布任何形式的虚假信息，或复制、发布含有下列内容的信息：' +
        'a. 危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一；</br>' +
        'b. 损害国家荣誉和利益；</br>' +
        'c. 煽动民族仇恨、民族歧视，破坏民族团结；</br>' +
        'd.破坏国家宗教政策，宣扬邪教和封建迷信；</br>' +
        'e.散布谣言，扰乱社会秩序，破坏社会稳定；</br>' +
        'f. 散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪；</br>' +
        'g. 任何虚假、骚扰性、中伤他人、辱骂性、恐吓性、庸俗淫秽或其他任何非法的信息；</br>' +
        'h. 含有法律、行政法规禁止的其他内容。</p>' +
        '<p>（3）遵守诚实信用原则，提供真实的注册信息；不得为任何非法目的而使用平台。</p>' +
        '<p>（4）不得随意盗取学员个人身份信息，进行各种形式的谋利，骚扰。</p>' +
        '<p>（5）不对平台上的任何数据、资料作商业性利用。</p>' +
        '<p>（6）不使用任何装置、软件或例行程序干预或试图干预乖乖学车应用的正常运行。</p>' +
        '<p>（7）不得以任何形式侵犯本公司的商业利益，包括并不限于发布未经河南炯途网络科技有限公司许可的商业广告。</p>' +
        '<p>（8）不得实施任何不利于河南炯途网络科技有限公司的行为。' +
        '<h6><span style="font-size: 16px;">十二、不可抗力</span></h6>' +
        '<p>12.1、不可抗力指不能预见、不能避免并不能克服的事件，其直接影响各方根据本协议的条款履行其项下的义务。该等事件包括但不限于地震、台风、暴乱、洪水、火灾、战争、罢工、交通系统瘫痪、戒严的实施、网络中断、系统故障、病毒入侵或其他类似事件。</p>' +
        '<p>12.2、由于不可抗力的原因致使任何一方不能适当履行其本协议项下义务的，不能履行的一方不因不可抗力引致的履行不能或延迟履行承担违约责任。但是，不能履行的一方应以书面形式将不可抗力事由立刻告知其他方。不可抗力事由消失之后，各方应继续履行本协议项下的义务。</p>' +
        '<h6><span style="font-size: 16px;">十三、终止服务及安全责任</span></h6>' +
        '<p>13.1 、若驾驶培训提供方存在违反法律、法规、规章、规范性文件或本协议约定之行为，不能提供所承诺的高质量服务，河南炯途网络科技有限公司有权视具体情形决定是否终止对驾驶培训提供方的服务。若河南炯途网络科技有限公司选择终止服务的，不向驾驶培训提供方承担任何法律责任，由此导致的损失均由驾驶培训提供方自行承担。</p>' +
        '<p>13.2 由于驾驶培训提供方的原因导致学员受到意外伤害的，由驾驶培训提供方负责承担责任，由此导致的损失由驾驶培训提供方自行承担。</p>' +
        '<h6><span style="font-size: 16px;">十四、法律适用、管辖与其他</span></h6>' +
        '<p>14.1、本协议之效力、解释、变更、执行与争议解决均适用中华人民共和国法律。</p>' +
        '<p>14.2、因本协议产生争议的，双方友好协商解决；协商不成的，提交河南炯途网络科技有限公司住所地有管辖权的人民法院处理。</p>' +
        '<div>');
    $('.modal').modal();
//input选中的border
    $(".inputbox").focus(function (e) {
        $('.inputbox').parent().css('border', '1px solid #BDBDBD');
        $(e.target).parent().css('border', '1px solid #f9a825');
    });
    //enter进入
    $(document).keydown(function (event) {
        if (event.keyCode == 13 || event.keyCode == 108) {
            $('#logintap').click();
        }
    });
});






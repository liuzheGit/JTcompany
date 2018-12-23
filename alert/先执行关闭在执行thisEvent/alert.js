/**
 * Created by admin on 2017/8/7.
 */
// JavaScript Document

eflower_alert={
    LMark:null,

    show:function(g,h,k,i){

        var j=document.body;
        var b=document.createElement("div");
        b.style.background="rgba(0,0,0,.2)";

        b.style.position="fixed";

        b.style.zIndex = "9999";

        b.style.top="0";

        b.style.left="0";

        b.style.width="100%";

        b.style.height=window.screen.height+'px';
        //b.style.height=document.body.clientHeight;

        b.setAttribute("id","LMark");

        this.LMark=b;

        var e=document.createElement("div");

        e.style.position="absolute";

        e.style.top="50%";

        e.style.left="50%";

        e.style.background="#fff";

        e.style.borderRadius="4px";

        e.style.transform="translate(-50%,-70%)";

        e.style.padding="15px 20px";

        e.style.width="80%";

        e.style.textAlign="center";

        b.appendChild(e);

        var a=document.createElement("h1");

        a.style.padding="0 0 10px";

        a.style.borderBottom="1px solid #ccc";

        a.style.margin="0px";

        a.style.color="#333";

        a.style.fontWeight="normal";

        a.style.fontSize="16px";

        if(typeof h!="undefined"){

            if(typeof h=="function"){

                a.innerHTML=""

            }else{

                a.innerHTML=h

            }
        }else{

            a.innerHTML=""

        }if(a.innerHTML!=""){

            e.appendChild(a)

        }
        var f=document.createElement("p");

        f.style.padding="0";

        f.style.lineHeight="25px";

        f.style.margin="30px 10px";

        f.style.fontSize="18px";

        f.style.color="#666";

        f.innerHTML=g;

        e.appendChild(f);

        var c=document.createElement("button");

        c.style.padding="5px 16px";

        c.style.margin="5px 16px";

        c.style.border="1px solid #ccc";

        c.style.fontSize="14px";

        c.style.borderRadius="4px";

        c.style.color="#0894ec";

        c.style.background="#fff";

        c.style.cursor="pointer";

        c.innerHTML="取消";

        c.setAttribute("id","Lback");

        if(typeof h!="undefined"){

            if(typeof h=="function"){

                this.cancel_event.event=k
            }else{

                this.cancel_event.event=i

            }if(typeof this.cancel_event.event=="function"){

                e.appendChild(c)}

        }

        c.setAttribute("onclick","eflower_alert.cancel_event.back()");

        var d=document.createElement("button");

        d.style.padding="5px 16px";

        d.style.margin="5px 16px";

        d.style.border="1px solid #ccc";

        d.style.fontSize="14px";

        d.style.borderRadius="4px";

        //d.style.color="#0894ec";
        d.style.color="#f5a81f";
        d.style.background="#fff";

        d.style.cursor="pointer";

        d.innerHTML="确定";

        d.setAttribute("id","LBtn");

        e.appendChild(d);
        if(typeof h!="undefined"){

            if(typeof h=="function"){

                this.ok_event.event=h

            }else{

                this.ok_event.event=k

            }
        }
        d.setAttribute("onclick","eflower_alert.ok_event.go()");

        j.appendChild(b)},


    ok_event:{
        event:function(){},
        go:function(){
            eflower_alert.LMark.remove();
            this.event();
        }
    },
    cancel_event:{
        event:function(){},
        back:function(){
            eflower_alert.LMark.remove();
            this.event();
        }
    }
};
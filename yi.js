const indi = document.getElementById("indi-roa"),
      angdp = document.getElementById("ds"),
      cl=document.getElementById("c-line"),
      sl=document.getElementById("s-line"),
      cds = document.getElementById("cds"),
      sds = document.getElementById("sds"),
      mh = document.getElementById("mov-hint");

let xl,yl,cx,cy,ang,lock=false;
xl=window.innerWidth;
yl=window.innerHeight;
cx=xl/2;
cy=yl/2;
window.addEventListener("mousemove",function(info){
if(lock==false){
    if(mh.innerText != null){
        mh.innerText = ``;
    }
    //console.log(info.pageX + ", " + info.pageY);
    //console.log(Math.atan((info.pageY - cy)/(info.pageX - cx))*-57.13);
    ang=(Math.atan((info.pageY - cy)/(info.pageX - cx))*-57.13);
    
    if(info.pageX < cx){ //rotate things
        indi.style.transform = "rotate(" + (180 - ang) + "deg) ";
        cl.style.width = (Math.cos((ang)/57.13)) * 200 + "px";
        cl.style.transform = "translate(-" + (Math.cos(ang/57.13)) * 200 + "px,-50%)"; 
        cds.innerText ="cosθ=" + (-1 * Math.cos(ang/57.13)).toFixed(4);
        sds.innerText ="sinθ=" + -1 * Math.sin(ang/57.13).toFixed(4);
    }
    else{
        indi.style.transform = "rotate(" + -ang + "deg)";
        cl.style.width = (Math.cos(ang/57.13)) * 200 + "px";
        cl.style.transform = "translate(0,-50%)";
        cds.innerText = "cosθ=" + Math.cos(ang/57.13).toFixed(4);
        sds.innerText = "sinθ=" + Math.sin(ang/57.13).toFixed(4);
    }
    if(ang<0||info.pageX<cx){ //display things
        if(ang<0&&info.pageX>cx){ //4
            angdp.innerText = "θ=" + (ang+360).toFixed(2);
            sl.style.height=Math.sin(ang/57.13) * -200 + "px";
            sl.style.transform = "translate(" + cl.clientWidth + "px)";
        }
        else{
            angdp.innerText = "θ=" + (ang+180).toFixed(2);

            if(info.pageY>cy){ //3
                sl.style.height = Math.sin(ang/57.13) * 200 + "px";
                sl.style.transform = "translate(-" + cl.clientWidth + "px)";
            }
            else{ //2
                sl.style.height = Math.sin(ang/57.13) * -200 + "px";
                sl.style.transform = "translate(-" + cl.clientWidth + "px,-" + sl.clientHeight + "px)";
            }
        }
    }
    else{ //1
        angdp.innerText = "θ=" + ang.toFixed(2);
        sl.style.height = Math.sin(ang/57.13) * 200 + "px";
        sl.style.transform = "translate(" + cl.clientWidth + "px,-" + sl.clientHeight + "px)";
    }
    //console.log(ang);
}
})
window.addEventListener("mousedown",function(){
    if(lock){
        lock=false;
        this.document.body.style.cursor = "crosshair";
    }
    else{
        lock=true;
        this.document.body.style.cursor = "context-menu";
        //this.document.all.style.cursor = "context-menu";
    }
})
window.addEventListener("resize",function(){
    xl=window.innerWidth;
    yl=window.innerHeight;
    cx=xl/2;
    cy=yl/2;
})

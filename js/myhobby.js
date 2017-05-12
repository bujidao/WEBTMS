var num = 0;
var iNow = 0;
var oContainer = document.getElementById('container');
var oNext = document.getElementById('next');
var oPrev = document.getElementById('prev');
for(var i=0;i<24;i++){
    var oImg = new Image();
    oImg.onload = function(){
        num++;
        if(num == 48){
            loadSuccess();
        }
    }
    oImg.src = 'img/'+(i+1)+'.jpg';
}

for(var i=0;i<24;i++){
    var oImg = new Image();
    oImg.onload = function(){
        num++;
        if(num == 48){
            loadSuccess();
        }
    }
    oImg.src = 'img/thumbs/'+(i+1)+'.jpg';
}

var index = 0;
function loadSuccess(){
    var colWidth = (oContainer.offsetWidth - 6 * (125+10)) / 7;
    var rowHeight = (oContainer.offsetHeight - 4 * (125+10)) / 5;
    for(var i=0;i<4;i++){
        for(var j=0;j<6;j++){
            var oDiv = document.createElement('div');
            oDiv.className = 'img';
            oDiv.style.background = 'url(img/thumbs/'+ (index+1) +'.jpg)';
//                    oDiv.style.left = j * (135 + colWidth) + colWidth + 'px';
//                    oDiv.style.top = i * (135 + rowHeight) + rowHeight + 'px';
            oDiv.pos = {
                left: j * (135 + colWidth) + colWidth,
                top:i * (135 + rowHeight) + rowHeight
            }
            oDiv.rowCol = {
                row:i,
                col:j
            }
            oDiv.index = index;
            oDiv.onclick = fn;
            oDiv.innerHTML = "<span></span>";
            oContainer.appendChild(oDiv);
            index++;
        }
    }

    index--; //让index ==  23;
    var aDiv = oContainer.getElementsByTagName('div');
    var timer = setInterval(function(){
        aDiv[index].style.left = aDiv[index].pos.left + 'px';
        aDiv[index].style.top = aDiv[index].pos.top + 'px';
        var rotateDeg = parseInt(Math.random() * 40 - 20);
        aDiv[index].style.WebkitTransform = 'rotate('+ rotateDeg +'deg)';
        index--;
        if(index == -1){
            clearInterval(timer);
        }
    },100);

    var flag = true;
    function fn(){
        if(flag){
            var fnleft = (oContainer.offsetWidth - 750) / 2 ;
            var fntop = (oContainer.offsetHeight - 500) / 2 ;
            for(var i=0;i<aDiv.length;i++){
                aDiv[i].style.left = aDiv[i].rowCol.col * 125 + fnleft +'px';
                aDiv[i].style.top = aDiv[i].rowCol.row * 125 + fntop +'px';
                aDiv[i].style.WebkitTransform = 'rotate(0deg)';
                aDiv[i].style.border = '1px solid #fff';
                var oSpan = aDiv[i].getElementsByTagName('span')[0];
//                    aDiv[i].children();
                oSpan.style.opacity = 1;
                oSpan.style.background = 'url(../img/'+ (this.index+1) +'.jpg) '+ (-125*aDiv[i].rowCol.col) +'px '+ (-125*aDiv[i].rowCol.row) +'px';
            }
            iNow = this.index;
            oNext.style.display = 'block';
            oPrev.style.display = 'block';
        }else{
            for(var i=0;i<aDiv.length;i++){
                aDiv[i].style.left = aDiv[i].pos.left +'px';
                aDiv[i].style.top = aDiv[i].pos.top +'px';
                var rotateDeg = parseInt(Math.random() * 40 - 20);
                aDiv[i].style.WebkitTransform = 'rotate('+ rotateDeg +'deg)';
                aDiv[i].style.border = '5px solid #fff';
                var oSpan = aDiv[i].getElementsByTagName('span')[0];
//                    aDiv[i].children();
                oSpan.style.opacity = 0;

            }
            oNext.style.display = 'none';
            oPrev.style.display = 'none';

        }
        flag = !flag;

    }


    oNext.onclick = oPrev.onclick = function(){

        if(this == oNext){
            iNow++;
            if(iNow == aDiv.length){
                iNow = 0;
            }
        }else{
            iNow--;
            if(iNow == -1){
                iNow = aDiv.length - 1;
            }
        }


        var arr = [];
        for(var i=0;i<24;i++){
            arr.push(i);
        }

        arr.sort(function(){
            return Math.random() - 0.5;
        });


        var aa = 0;
        var timer2 = setInterval(function(){
            var idx = arr.pop();
            var oSpan = aDiv[idx].getElementsByTagName('span')[0];
            oSpan.style.background = 'url(img/'+ (iNow+1) +'.jpg) '+ (-125*aDiv[idx].rowCol.col) +'px '+ (-125*aDiv[idx].rowCol.row) +'px';
            aa++;
            if(aa == 24){
                clearInterval(timer2);
            }
        },30);

    }

}/**
 * Created by ZJing on 2017/5/13.
 */

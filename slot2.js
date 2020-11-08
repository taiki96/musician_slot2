 var artistName = document.getElementById("artistName");
 var slot = document.getElementById("slot");
 var cvs = document.getElementById("cv1");
 var ctx = cvs.getContext("2d");
 var counter;
 var timer = 10;
 var stopHandle = false;
 var stopTimer;
 var arrImg = [];
 var p = document.getElementById('waku');
 var arrNum = [];
 

 //登録ボタンを押した時
 function saveCookie(){
     
     if(artistName.value == ""){
         alert('アーティスト名が入力されてません');
         return false;
     } else {
     
         var arr = []; // 空の配列を用意
         var cookie = document.cookie; // cookieを取り出す
         var posStart = cookie.indexOf("string="); // 配列内の最初のstring=の位置
         var posEnd = 0;
         if(posStart >= 0){ // cookieデータに何かが保存されてる場合
             posStart += 7; //string=が7文字のため
             posEnd = cookie.indexOf(";", posStart+1);
             var old_cookie = "";
             if(posEnd >= 0){
                 old_cookie = cookie.substring(posStart, posEnd);
             } else {
                 old_cookie = cookie.substring(posStart);
             }
             // 登録済みのcookieを配列に登録する
             if(old_cookie.indexOf(",") >= 0){ // 複数ある場合
                 arr = old_cookie.split(",");
             } 
             else if(old_cookie.length > 0){
                 // 一つだけの場合
                 arr.push(old_cookie);
             }
         }
         
         if(arr.indexOf(artistName.value) == -1){
             arr.push(artistName.value);
         } else {
             alert("『" + artistName.value + "』は過去に登録されています");
             return false;
         }
         
         
         var question = confirm("『" + artistName.value + "』を登録しますか？");
         if(question == true){
             // 有効期限設定
             var now= new Date();
             now.setTime(now.getTime() + 60*60*24*1825); // 5年に設定
             // cookieの配列内に格納する
             document.cookie = "string=" + arr.join(",") + ";expires=" + now.toUTCString();
             
             artistName.value = "";
         } else {
             return false;
         }
         
     }
     
     registList();
 }  
 

 // cookieデータの削除
 function delCookie(){
     var delquestion = confirm("過去の登録履歴を削除しますか？");
     if(delquestion == true){
         document.cookie = "string=;expires=0";
         ctx.clearRect(0,0,400,150);
         arrImg.length = 0;
     } else {
         return false;
     }
     
     registList();
 }
 
 // slotリールの画像変換
 function makeImage(name){
     cvs.height = 50;
     ctx.fillStyle = "rgb(0,0,0)";
     ctx.fillRect(0,0,400,50);
     ctx.font = "bold 40px Times Roman";
     ctx.fillStyle = "rgba(255,255,255)";
     ctx.fillText(name,20,40);
     var png = cvs.toDataURL();
     return png;
     
 }
 
 // startボタンを押した時
 function reelStart(){
     // 一度画像の削除
     p.style.display = 'none';

     stopHandle = false;
     timer=10;
     var arr = []; // 空の配列を用意
     var cookie = document.cookie; // cookieを取り出す
     var posStart = cookie.indexOf("string="); // 配列内の最初のstring=の位置
     var posEnd = 0;
     if(posStart >= 0){ // cookieデータに何かが保存されてる場合
         posStart += 7; //string=が7文字のため
         posEnd = cookie.indexOf(";", posStart+1);
         var old_cookie = "";
         if(posEnd >= 0){
             old_cookie = cookie.substring(posStart, posEnd);
         } else {
             old_cookie = cookie.substring(posStart);
         }
         // 登録済みのcookieを配列に登録する
         if(old_cookie.indexOf(",") >= 0){ // 複数ある場合
             arr = old_cookie.split(",");
         } 
         else if(old_cookie.length > 0){
             // 一つだけの場合
             arr.push(old_cookie);
         }
     }
     
    //cookie配列分の画像を作成
    for(var i=0; i<arr.length; i++){
        arrImg[i] = new Image();
        arrImg[i].src = makeImage(arr[i]);
    }
    cvs.height = 150;
    for(var j=0; j<3; j++){ //3個分の画像を合成
        let randomnum = Math.floor(Math.random()*arr.length);
        ctx.drawImage(arrImg[randomnum], 0, i*50);
        arrNum[j] = randomnum; // 配列の末尾に追加
    }
    if(arr.length > 0){
        counter = 5;
        runSlot();
    }
 }
 
 function runSlot(){
     var arr = []; // 空の配列を用意
     var cookie = document.cookie; // cookieを取り出す
     var posStart = cookie.indexOf("string="); // 配列内の最初のstring=の位置
     var posEnd = 0;
     if(posStart >= 0){ // cookieデータに何かが保存されてる場合
         posStart += 7; //string=が7文字のため
         posEnd = cookie.indexOf(";", posStart+1);
         var old_cookie = "";
         if(posEnd >= 0){
             old_cookie = cookie.substring(posStart, posEnd);
         } else {
             old_cookie = cookie.substring(posStart);
         }
         // 登録済みのcookieを配列に登録する
         if(old_cookie.indexOf(",") >= 0){ // 複数ある場合
             arr = old_cookie.split(",");
         } 
         else if(old_cookie.length > 0){
             // 一つだけの場合
             arr.push(old_cookie);
         }
     }
     

     //画像をスクロールする
     ctx.drawImage(cvs, 0, 0, 400, 140, 0, 10, 400, 140);
     ctx.fillStyle = "rgb(0,0,0)";
     ctx.fillRect(0,0,400,10);
     
     if(counter==0){
         //カウンターが0になったら、新しい画像を追加する
         let randomnum = Math.floor(Math.random()*arr.length);
         ctx.drawImage(arrImg[randomnum], 0, 0);
         arrNum.shift(); // 配列の先頭を消す
         arrNum.push(randomnum); // 配列の末尾に追加
         
         counter = 5;
         if(stopHandle){
             console.log(arr[arrNum[1]]);
             clearTimeout(artistName.timeoutId);
             return;
         }
     }  
    ctx.stroke();
    artistName.timeoutId = setTimeout(function(){
        runSlot();
    }, timer);
    counter--;
    
 }
 
 function reelStop(){
    if(timer==10){
        timer=40;
        stopTimer = setTimeout(function(){
            reelStop();
        }, 3000);
    } else if(timer==40){
        timer=80;
        stopTimer = setTimeout(function(){
            reelStop();
        }, 2000);
    } else if(timer==80){
        timer=100;
        stopTimer = setTimeout(function(){
            reelStop();
        }, 2000);
    } else {
        p.style.display = 'block';
        clearTimeout(stopTimer);
        stopHandle = true;
    }
    
 }
 
 // 過去の登録リストの作成
 function registList(){
     var list = document.getElementById("list");
     var arr = []; // 空の配列を用意
     var cookie = document.cookie; // cookieを取り出す
     var posStart = cookie.indexOf("string="); // 配列内の最初のstring=の位置
     var posEnd = 0;
     if(posStart >= 0){ // cookieデータに何かが保存されてる場合
         posStart += 7; //string=が7文字のため
         posEnd = cookie.indexOf(";", posStart+1);
         var old_cookie = "";
         if(posEnd >= 0){
             old_cookie = cookie.substring(posStart, posEnd);
         } else {
             old_cookie = cookie.substring(posStart);
         }
         // 登録済みのcookieを配列に登録する
         if(old_cookie.indexOf(",") >= 0){ // 複数ある場合
             arr = old_cookie.split(",");
         } 
         else if(old_cookie.length > 0){
             // 一つだけの場合
             arr.push(old_cookie);
         }
     }
     
     var html = "<ul id='ddmenu'><li id='list1'><a href='#'>" + "登録リスト" + "</a><ul id='sub_ddmenu'>";
     for(var x=0; x<arr.length; x++){
         html += "<li id='list2'><a href='#'>" + arr[x] + "</a></li>";
     }
     html += "</ul></li></ul>";
     list.innerHTML = html;
}

registList();
// スロットリールの真ん中の値を取得
var arr = [];
var cookie = document.cookie;
var posStart = cookie.indexOf("string=");
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

var arrNum = [];
let randomnum = Math.floor(Math.random()*arr.length);
arrNum.shift();
arrNum.push(randomnum);
 

var Client_ID = "ffb9e096cc744a53bd21d0675085ee73";
var Client_Secret = "5c9ccc2b2c1d47f588e2f1aba66f29c6";

var base64 = btoa(Client_ID + ":" + Client_Secret);

var taken = "";
var type = "";
function spSearch() {
    
        location.href = "./spotify.html";
        var artist = arrNum[1];
        var ajax = new XMLHttpRequest();
        ajax.open("post", "https://accounts.spotify.com/api/token");
        // サーバに対して解析方法を指定する
        ajax.setRequestHeader( 'Authorization', 'Basic '+ base64 );
        ajax.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
        // データをリクエスト ボディに含めて送信する
        ajax.send( "grant_type=client_credentials" );
        ajax.responseType = "json";
        ajax.addEventListener("load", function(){ // loadイベントを登録します。
            var json = this.response;
            token = json["access_token"];
    
            var ajax2 = new XMLHttpRequest();
            ajax2.open("get", "https://api.spotify.com/v1/search?q=" + artist + "&type=artist");
            ajax2.setRequestHeader( 'Authorization', 'Authorization: Bearer '+ token );
            ajax2.send();
            ajax2.responseType = "json";
            ajax2.addEventListener("load", function(){ // loadイベントを登録します。
                var html="<ul>"
                var json2 = this.response;
                for (var i=0;i<json2.artists.items.length;i++) {
                    var name=json2.artists.items[i].name;
                    var url=json2.artists.items[i].external_urls.spotify;
                    var img=null;
                    if (json2.artists.items[i].images.length > 2) {
                        img=json2.artists.items[i].images[2].url;
                    }
                    html += "<li><a href='"+url+"'>";
                    if (img!=null) {
                        html += "<img src='"+img+"' width='160px' height='160px'>";
                    }
                    html += name+"</a></li>";
                }
                var list = document.getElementById("kekka");
                list.innerHTML = html + "</ul>";
            }, false);
        }, false);
    }
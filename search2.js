var artistName = document.getElementById("artistName");

//検索ボタンを押した時    
function search_youtube() {
    if(artistName.value == ""){
        alert("アーティスト名が入力されていません");
        return false;
    } else {
        var apikey = 'AIzaSyDVsrNkmebY4xS1X73l9c9I_CQzfPK4dOA';
        var search_catch = document.getElementById('artistName').value;
        
        var ajax = new XMLHttpRequest();
        ajax.open("get", "https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&q=" + search_catch + "&key=" + apikey);
        ajax.responseType = "json";
        ajax.send();
        ajax.addEventListener("load", function(){
            var json = this.response;
            var search_containar = document.getElementById("search_containar");
            search_containar.innerHTML = "<p id='kennsakukekka'>Search Results</p>";
            for(var i=0; i<json.items.length; i++){
                var videoId = json.items[i].id.videoId;
                var title = json.items[i].snippet.title;
                var description = json.items[i].snippet.description;
                console.log("VideoID:"+videoId+" Title:"+title+" Description:"+description);
                
                search_containar.innerHTML += "<div id='searchresult'>" + "<p id='ptitle'>"+ title + "</p>" + "<br><iframe id=\"player\" type=\"text/html\" width=\"854\" height=\"480\" src=\"https://www.youtube.com/embed/"+videoId+"\" frameborder=\"0\"></iframe>";
                search_containar.innerHTML += "</div>";
                
            }
        }, false);
    }
}
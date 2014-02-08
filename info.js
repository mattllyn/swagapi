//It is suggested that your bot is at least a featured DJ
songs = [];
woots = 0;
woots = woots + API.getRoomScore().positive;
mehs = 0;
mehs = mehs + API.getRoomScore().negative;
curates = 0;
curates = curates + API.getRoomScore().curates;

songModel = {};
songModel.id = null;
songModel.cid = null;
songModel.title = null;
songModel.lastPlayed = null;
songModel.firstPlayed = null;
songModel.timesPlayed = null;
songModel.averageWoots = null;
songModel.averageMehs = null;

defineTime = function(){
    var date = new Date();
    var hours;
    var period;
    switch(date.getHours()) {
        case 12:
            period = "PM";
            break;
        case 13:
            hours = 1;
            period = "PM";
            break;
        case 14:
            hours = 2;
            period = "PM";
            break;
        case 15:
            hours = 3;
            period = "PM";
            break;
        case 16:
            hours = 4;
            period = "PM";
            break;
        case 17:
            hours = 5;
            period = "PM";
            break;
        case 18:
            hours = 6;
            period = "PM";
            break;
        case 19:
            hours = 7;
            period = "PM";
            break;
        case 20:
            hours = 8;
            period = "PM";
            break;
        case 21:
            hours = 9;
            period = "PM";
            break;
        case 22:
            hours = 10;
            period = "PM";
            break;
        case 23:
            hours = 11;
            period = "PM";
            break;
        case 24:
            hours = 12;
            period = "AM";
            break;
        default:
            hours = date.getHours();
            period = "AM";
    }

    var rightNow = (date.getMonth()+1)  + "/"
        + date.getDate() + "/"
        + date.getFullYear() + " "
        + hours + ":"
        + date.getMinutes() + " "
        + period;

    return rightNow;
};
defineSong = function(obj){
    songModel.id            = obj.lastPlay.media.attributes.id;
    songModel.cid           = obj.lastPlay.media.attributes.cid;
    songModel.title         = obj.lastPlay.media.attributes.author + " - " + obj.lastPlay.media.attributes.title;
    songModel.lastPlayed    = defineTime();
    songModel.firstPlayed   = defineTime();
    songModel.lastPlayedBy  = obj.lastPlay.dj.attributes.username;
    songModel.firstPlayedBy = obj.lastPlay.dj.attributes.username;
    songModel.timesPlayed   = 1;
    //songModel.averageWoots = getMean();
    //songModel.averageMehs = getMean();
    songs.push(songModel);
};

API.on(API.DJ_ADVANCE, function(a){
    currentSong = API.getMedia();
    currentTitle = API.getMedia().author + " - " + API.getMedia().title;
 for(var i = 0; i < songs.length; i++){
     if(currentSong.id == songs[i].id){
         if(currentTitle != songs[i].title){
             songs[i].title = songs[i].title + " / " + currentTitle;
         }
         songs[i].lastPlayed = defineTime();
         songs[i].timesPlayed++;
         songs[i].lastPlayedBy = a.lastPlay.dj.attributes.username;
     }else{
         defineSong(a);
     }
 }
});

API.on(API.CHAT, function(obj){
    command = false; var chatCommand = "";
    if(obj.message.indexOf("!") === 0) command = true;
    if(command){
        chatCommand = obj.message.substring(1);
        var commands = chatCommand.split(" ");
        commands.push("undefined");
        for(var i = 2; i < commands.length; i++){
            if(commands[i] !== "undefined") commands[1] = commands[1] + " " + commands[i];
        }
    switch(commands[0].toLowerCase()){
        case "songinfo":
            API.sendChat("Available Song Info: !titles - All known titles for this song, !lastplayed - Last time the song was played, !firstplayed - First time the song was played, !id - Song ID");
            break;
        case "id":
            API.sendChat("@"+obj.from+" "+API.getMedia().id);
            break;
        case "lastplayed":
            for(var i = 0; i < songs.length; i++){
                if(API.getMedia().id == songs[i].id){
                    API.sendChat("This song was last played on "+songs[i].lastPlayed');
                }else{
                    API.sendChat("I don't have any data for this song!");
                }
            }
            break;
        case "firstplayed":
            for(var i = 0; i < songs.length; i++){
                if(API.getMedia().id == songs[i].id){
                    API.sendChat("This song was first played on "+songs[i].firstPlayed);
                }else{
                    API.sendChat("I don't have any data for this song!");
                }
            }
            break;
        case "titles":
            for(var i = 0; i < songs.length; i++){
                if(API.getMedia().id == songs[i].id){
                    API.sendChat("Known titles: "+songs[i].title);
                }else{
                    API.sendChat("I don't have any data for this song!");
                }
            }
        
}
}
});

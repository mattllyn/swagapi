var swagbot = {};
var ruleSkip = {};
var songBoundary = 60 * 7;

swagbot.misc = {};
swagbot.settings = {};
swagbot.moderators = {};
swagbot.filters = {};
botMethods = {};
swagbot.pubVars = {};

toSave = {};
toSave.settings = swagbot.settings;
toSave.moderators = swagbot.moderators;
toSave.ruleSkip = ruleSkip;

swagbot.misc.version = "2.0";
swagbot.misc.origin = "This bot was created by Sidewinder.";
swagbot.misc.changelog = "Info1";
swagbot.misc.ready = true;
swagbot.misc.lockSkipping = false;
swagbot.misc.lockSkipped = "0";
swagbot.misc.tacos = new Array();

joined = new Date().getTime();

cancel = false;

swagbot.filters.swearWords = new Array();
swagbot.filters.racistWords = new Array();
swagbot.filters.beggerWords = new Array();

swagbot.settings.maxLength = 10; //minutes
swagbot.settings.cooldown = 10; //seconds
swagbot.settings.staffMeansAccess = true;
swagbot.settings.historyFilter = true;
swagbot.settings.swearFilter = true;
swagbot.settings.racismFilter = true;
swagbot.settings.beggerFilter = true;
swagbot.settings.interactive = true;
swagbot.settings.ruleSkip = true;
swagbot.settings.removedFilter = true;


//                          Side                               
swagbot.admins = ["52d363bdc3b97a416d5c837f"];

swagbot.filters.swearWords = ["slut","feg","fegs","yuki-ki","mofo","penis","penus",":b:itch","fuck","shit","bitch","cunt","twat","faggot","queer","dumb ass","pussy","dick","cocksucker","🙊","yuki","asshole","vagina","tit","mangina","tits","cock","jerk","puta","puto","cum","sperm","ass-hat","ass-jabber","assbanger","assfuck","assfucker","assnigger","butt plug","bollox","blowJob","Blow job","bampot","cameltoe","chode","clitfuck","cunt","dildo","douche","doochbag","dike","dyke","fatass","fat ass","fuckass","fuckbag","fuckboy","fuckbrain","gay","gaylord","handjob","hoe","Jizz","jerk off","kunt","lesbian","lesbo","lezzie","minge","munging","nut sack","nutsack","queer","queef","rimjob","scrote","schlong","titfuck","twat","unclefucker","va-j-j","vajayjay","vjayjay","wankjob","whore"];

swagbot.filters.racistWords = ["nigger","kike","spick","porchmonkey","camel jockey","towelhead","towel head","chink","gook","porch monkey","Coolie","nigga","nigguh","black shit","black monkey","you ape","you monkey","you gorilla","black ass","assnigger","honkey","White bread","white ass","jungle bunny","niglet","nigaboo","paki","ruski","sand nigger","sandnigger","wetback","wet back"];

swagbot.filters.beggerWords = ["fanme","fan for fan","fan me","fan4fan","fan 4 fan","fan pls","fans please","need fan","more fan","fan back","give me fans","gimme fans"];

var blockedSongs = [
    "Rick Roll",
    "GANGNAM",
    "GANGNAM STYLE",
    "Friday",
    "The Fox",
    "The Fox [Official music video HD]",
    "vine",
    "parody",
    "Yuno Gasai",
    "Yuki",
    "10 hour",
    "10 hours"];
 
var blockedArtists = [
    "Rick Astley",
    "Miley Cyrus",
    "Justin bieber",
    "Rebbeca black",
    "2pac",
    "Drake",
    "2 Chainz",
    "2Chainz",
    "Yuno Gasai"];
swagbot.misc.ball = [" It is certain",
" It is decidedly so",
" Without a doubt",
" Yes definitely",
" You may rely on it",
" As I see it yes",
" Most likely",
" Outlook good",
" Yes",
" Signs point to yes :trollface:",
" Reply hazy try again",
" Ask again later",
" Better not tell you now",
" Cannot predict now",
" Concentrate and ask again",
" Don't count on it",
" My reply is no",
" My sources say no",
" Outlook not so good",
" Very doubtful"];
swagbot.misc.ht = ["My magic coins says: Tails", "My magic coin says: Heads"];

swagbot.misc.roll = [
"You rolled A 1. Bummer :(",
"You rolled A 2. Bummer :(",
"You rolled A 3. Bummer :("];

swagbot.misc.roll2 = [
"4. Awesome!",
"5. Awesome!",
"6. Awesome!"];

swagbot.misc.fortune = [
" There is a true and sincere friendship between you and your friends.",
" You find beauty in ordinary things, do not lose this ability.",
" Ideas are like children; there are none so wonderful as your own.",
" It takes more than good memory to have good memories.",
" A thrilling time is in your immediate future.",
" Plan for many pleasures ahead.",
" The joyfulness of a man prolongeth his days.",
" Your everlasting patience will be rewarded sooner or later.",
" Make two grins grow where there was only a grouch before.",
" Something you lost will soon turn up.",
" Your heart is pure, and your mind clear, and your soul devout.",
" Excitement and intrigue follow you closely wherever you go!",
" A pleasant surprise is in store for you.",
" May life throw you a pleasant curve.",
" As the purse is emptied the heart is filled.",
" Be mischievous and you will not be lonesome.",
" You have a deep appreciation of the arts and music.",
" Your flair for the creative takes an important place in your life.",
" Your artistic talents win the approval and applause of others.",
" Pray for what you want, but work for the things you need.",
" Your many hidden talents will become obvious to those around you.",
" Don't forget, you are always on our minds.",
" Don't forget, you are always on our minds.",
" Your greatest fortune is the large number of friends you have.",
" A firm friendship will prove the foundation on your success in life.",
" Don't ask, don't say. Everything lies in silence.",
" Look for new outlets for your own creative abilities.",
" Be prepared to accept a wondrous opportunity in the days ahead!",
" Fame, riches and romance are yours for the asking.",
" Good luck is the result of good planning.",
" Good things are being said about you.",
" Smiling often can make you look and feel younger.",
" Someone is speaking well of you.",
" The time is right to make new friends.",
" You will inherit some money or a small piece of land.",
" Your life will be happy and peaceful.",
" A friend is a present you give yourself.",
" A member of your family will soon do something that will make you proud.",
" A quiet evening with friends is the best tonic for a long day.",
" A single kind word will keep one warm for years.",
" Anger begins with folly, and ends with regret.",
" Generosity and perfection are your everlasting goals.",
" Happy news is on its way to you.",
" He who laughs at himself never runs out of things to laugh at.",
" If your desires are not extravagant they will be granted.",
" Let there be magic in your smile and firmness in your handshake.",
" If you want the rainbow, you must to put up with the rain. D. Parton",
" Nature, time and patience are the three best physicians.",
" Strong and bitter words indicate a weak cause.",
" The beginning of wisdom is to desire it.",
" You will have a very pleasant experience.",
" You will inherit some money or a small piece of land.",
" You will live a long, happy life.",
" You will spend old age in comfort and material wealth.",
" You will step on the soil of many countries.",
" You will take a chance in something in the near future.",
" You will witness a special ceremony.",
" Your everlasting patience will be rewarded sooner or later.",
" Your great attention to detail is both a blessing and a curse.",
" Your heart is a place to draw true happiness.",
" Your ability to juggle many tasks will take you far.",
" A friend asks only for your time, not your money.",
" You will be invited to an exciting event."];

swagbot.misc.tacos = ["crispy taco","mexican taco","vegetarian taco","spicy taco","meatlover taco","cheese taco","wet hamburger","taco shell","delicious taco","gross taco"];

swagbot.pubVars.skipOnExceed;
swagbot.pubVars.command = false;

Array.prototype.remove=function(){var c,f=arguments,d=f.length,e;while(d&&this.length){c=f[--d];while((e=this.indexOf(c))!==-1){this.splice(e,1)}}return this};

 
API.on(API.DJ_ADVANCE, djAdvanceEvent);
 
//API.on(API.USER_JOIN, UserJoin);
//function UserJoin(user)
//{
//var JoinMsg = ["@user has joined!","welcome @user!","Hey there @user!","Glad you came by @user"];
//r = Math.floor(Math.random() * JoinMsg.length);
//API.sendChat(JoinMsg[r].replace("user", user.username));
//}

 

function djAdvanceEvent(data){
    setTimeout(function(){ botMethods.djAdvanceEvent(data); }, 500);
}
function grab() {
        $(".icon-curate").click();
        $($(".curate").children(".menu").children().children()[0]).mousedown();
        $('.pop-menu.curate .menu ul li').each(function() {
        if($(this).children('span').text() == playlistName) {
            $(this).mousedown();
            djBotExecuting = false; return true;
  }
    });
}
API.on(API.CURATE_UPDATE, callback);
function callback(obj)
{
  var media = API.getMedia();
  API.sendChat(obj.user.username + " Added this song!");
}

botMethods.skip = function(){
    setTimeout(function(){
        if(!cancel) API.moderateForceSkip();
    }, 3500);
};

botMethods.load = function(){
    toSave = JSON.parse(localStorage.getItem("swagbotSave"));
    swagbot.settings = toSave.settings;
    ruleSkip = toSave.ruleSkip;
};

botMethods.save = function(){localStorage.setItem("swagbotSave", JSON.stringify(toSave))};

botMethods.loadStorage = function(){
    if(localStorage.getItem("swagbotSave") !== null){
        botMethods.load();
    }else{
        botMethods.save();
    }
};

botMethods.checkHistory = function(){
    currentlyPlaying = API.getMedia(), history = API.getHistory();
    caught = 0;
    for(var i = 0; i < history.length; i++){
        if(currentlyPlaying.cid === history[i].media.cid){
            caught++;
        }
    }
    caught--;
    return caught;
};
 API.on(API.DJ_ADVANCE, listener);
function listener(data)
{
    if (data == null)
    {
        return;
    }
 
    var title = API.getMedia().title;
    var author = API.getMedia().author;
    for (var i = 0; i < blockedSongs.length; i++)
    {
        if (title.indexOf(blockedSongs[i]) != -1 || author.indexOf(blockedArtists[i]) != -1)
        {
            API.moderateForceSkip();
            API.sendChat("I Skipped: \"" + title + "\" because it is blocked.");
            return;
        }
    }
 
    var songLenRaw = $("#time-remaining-value").text();
    var songLenParts = songLenRaw.split(":");
    var songLen = (parseInt(songLenParts[0].substring(1)) * 60) + parseInt(songLenParts[1]);
    if (songLen >= songBoundary)
    {
        window.setTimeout(skipLongSong, 1000 * songBoundary);
    }
}
 function skipLongSong()
{
    API.moderateForceSkip();
    chatMe("Skipping song because it has exceeded the song limit (" + (songBoundary / 60) + " minutes.)");
}
botMethods.getID = function(username){
    var users = API.getUsers();
    var result = "";
    for(var i = 0; i < users.length; i++){
        if(users[i].username === username){
            result = users[i].id;
            return result;
        }
    }

    return "notFound";
};

botMethods.cleanString = function(string){
    return string.replace(/&#39;/g, "'").replace(/&amp;/g, "&").replace(/&#34;/g, "\"").replace(/&#59;/g, ";").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
};

botMethods.djAdvanceEvent = function(data){
    clearTimeout(swagbot.pubVars.skipOnExceed);
    if(swagbot.misc.lockSkipping){
        API.moderateAddDJ(swagbot.misc.lockSkipped);
        swagbot.misc.lockSkipped = "0";
        swagbot.misc.lockSkipping = false;
        setTimeout(function(){ API.moderateRoomProps(false, true); }, 500);
    }
    var song = API.getMedia();
    if(botMethods.checkHistory() > 0 && swagbot.settings.historyFilter){
        if(API.getUser().permission < 2){
            API.sendChat("This song is in the history! You should make me a mod so that I could skip it!");
        }else if(API.getUser().permission > 1){
            API.sendChat("@" + API.getDJ().username + ", playing songs that are in the history isn't allowed, please check next time! Skipping..");
           API.moderateForceSkip();
        }else if(getMedia.duration > swagbot.settings.maxLength * 60){
            swagbot.pubVars.skipOnExceed = setTimeout( function(){
               API.sendChat("@"+ API.getDJ().username +" You have now played for as long as this room allows, time to let someone else have the booth!");
             API.moderateForceSkip();
            }, swagbot.settings.maxLength * 60000);
            API.sendChat("@"+ API.getDJ().username +" This song will be skipped " + swagbot.settings.maxLength + " minutes from now because it exceeds the max song length.");
        }else{
            setTimeout(function(){
                if(botMethods.checkHistory() > 0 && swagbot.settings.historyFilter){
                 API.sendChat("@" + API.getDJ().username + ", playing songs that are in the history isn't allowed, please check next time! Skipping..");
                    API.moderateForceSkip();
                };
            }, 1500);
        }
    }
};

    API.on(API.CHAT, function(data){
        if(data.message.indexOf('!') === 0){
            var msg = data.message, from = data.from, fromID = data.fromID;
            var command = msg.substring(1).split(' ');
            if(typeof command[2] != "undefined"){
                for(var i = 2; i<command.length; i++){
                    command[1] = command[1] + ' ' + command[i];
                }
            }
                   API.moderateDeleteChat(data.chatID);
            if(swagbot.misc.ready || swagbot.admins.indexOf(fromID) > -1 || API.getUser(data.fromID).permission > 1){
                switch(command[0].toLowerCase()){
                    case "marco":
                        API.sendChat("Polo");
                        if(swagbot.admins.indexOf(fromID) == -1 || API.getUser(fromID).permission < 2){
                            swagbot.misc.ready = false;
                            setTimeout(function(){ swagbot.misc.ready = true; }, swagbot.settings.cooldown * 1000);
                        }
                        break;
                    case "ping":
                        API.sendChat("Pong");
                        if(swagbot.admins.indexOf(fromID) == -1 || API.getUser(fromID).permission > 2){
                            swagbot.misc.ready = false;
                            setTimeout(function(){ swagbot.misc.ready = true; }, swagbot.settings.cooldown * 1000);
                        }
                        break;
                    case "test":
                        if(API.getUser(fromID).permission > 1 || swagbot.admins.indexOf(fromID) > -1){
                        API.sendChat("Should require ResidentDJ");
                        swagbot.misc.ready = false;
                            setTimeout(function(){ swagbot.misc.ready = true; }, swagbot.settings.cooldown * 1000);
                        }
                        break;
    case "say":
                    if(API.getUser(fromID).permission > 1 || swagbot.admins.indexOf(fromID) > -1){
                        if(typeof command[1] === "undefined"){
                            }else{
                            API.sendChat(command[1]);
                        }
                    }
                        break; 
                       

                    case "djinfo":
                        if(API.getUser(fromID).permission > 1 || swagbot.admins.indexOf(fromID) > -1){
                            var total = + API.getDJ().djPoints + API.getDJ().listenerPoints + API.getDJ().curatorPoints;
                            API.sendChat("Current dj is: "+ API.getDJ().username +". Points: "+ total +" | Fans: "+API.getDJ().fans+" | Curated: "+ API.getDJ().curatorPoints +".");
                            swagbot.misc.ready = false;
                            setTimeout(function(){ swagbot.misc.ready = true; }, swagbot.settings.cooldown * 1000);
                        }
                        break;

        case "op":
        case "overplayed":
          if(API.getUser(fromID).permission < 2 || swagbot.admins.indexOf(fromID) > -1){
            API.sendChat("@" + data.from + " " + " Oveplayed List http://pastebin.com/Qj8pLGCL");
            swagbot.misc.ready = false;
            setTimeout(function(){ swagbot.misc.ready = true; }, swagbot.settings.cooldown * 1000);
          }
          break;

        case "bl":
        case "blacklist":
          if(API.getUser(fromID).permission < 2 || swagbot.admins.indexOf(fromID) > -1){
            API.sendChat("@" + data.from + " " + " Blacklist http://pastebin.com/xf8LMAwt");
            swagbot.misc.ready = false;
            setTimeout(function(){ swagbot.misc.ready = true; }, swagbot.settings.cooldown * 1000);
          }
          break;

        case "facebook":
        case "fb":
          if(API.getUser(fromID).permission < 2 || swagbot.admins.indexOf(fromID) > -1){
            API.sendChat("@" + data.from + " " + " Please join our facebook group here: www.facebook.com/swagcraftmc");
            swagbot.misc.ready = false;
            setTimeout(function(){ swagbot.misc.ready = true; }, swagbot.settings.cooldown * 1000);
          }
          break;

        case "adblock":
          if(API.getUser(fromID).permission < 2 || swagbot.admins.indexOf(fromID) > -1){
            API.sendChat("@" + data.from + " " + " Get AdBlock here: http://getadblock.com");
            swagbot.misc.ready = false;
            setTimeout(function(){ swagbot.misc.ready = true; }, swagbot.settings.cooldown * 1000);
          }
          break;

        case "emoji":
          if(API.getUser(fromID).permission < 2 || swagbot.admins.indexOf(fromID) > -1){
            API.sendChat("@" + data.from + " " + " Emoji list: http://www.emoji-cheat-sheet.com/");
            swagbot.misc.ready = false;
            setTimeout(function(){ swagbot.misc.ready = true; }, swagbot.settings.cooldown * 1000);
          }
          break;

                    case "rules":
                        if(typeof command[1] == "undefined"){
                            API.sendChat("@" + data.from + " " + "Room Rules - 1.Do not play troll songs 2.Do not ask for ranks 3.Don\'t spam 4.No Advertising rooms, websites, etc.. 5.No songs over 5 minutes unless approved by a mod 6.Dont spam dislike peoples videos, or you will be banned.");
                        }else if(command[1].indexOf("@") > -1){
                            API.sendChat(command[1]+"Room Rules - 1.Do not play troll songs 2.Do not ask for ranks 3.Don\'t spam 4.No Advertising rooms, websites, etc.. 5.No songs over 5 minutes unless approved by a mod 6.Dont spam dislike peoples videos, or you will be banned.");
                        }else{
                            API.sendChat("Room Rules - 1.Do not play troll songs 2.Do not ask for ranks 3.Don\'t spam 4.No Advertising rooms, websites, etc.. 5.No songs over 5 minutes unless approved by a mod 6.Dont spam dislike peoples videos, or you will be banned.");
                        }
                        if(swagbot.admins.indexOf(fromID) == -1 || API.getUser(fromID).permission < 2){
                            swagbot.misc.ready = false;
                            setTimeout(function(){ swagbot.misc.ready = true; }, swagbot.settings.cooldown * 1000);
                        }
                        break;
                     case "flip":
                     case "flipcoin":
                        if(typeof command[1] == "undefined"){
                            var crowd = API.getUsers();
                            var randomUser = Math.floor(Math.random() * crowd.length);
                            var randomHt = Math.floor(Math.random() * swagbot.misc.ht.length);
                            var randomSentence = Math.floor(Math.random() * 1);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat(swagbot.misc.ht[randomHt]);
                                    break;
                                case 1:
                                    API.sendChat(swagbot.misc.ht[randomHt]);
                                    break;
                            }
                        }else{
                            if(command[1].indexOf("@") === 0) command[1] = command[1].substring(1);
                            var randomHt = Math.floor(Math.random() * swagbot.misc.ht.length);
                            var randomSentence = Math.floor(Math.random() * 1);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat(swagbot.misc.ht[randomHt]);
                                    break;
                                case 1:
                                    API.sendChat(swagbot.misc.ht[randomHt]);
                                    break;
                           }
                        }
                        if(swagbot.admins.indexOf(fromID) == -1 || API.getUser(fromID).permission < 2){
                            swagbot.misc.ready = false;
                            setTimeout(function(){ swagbot.misc.ready = true; }, swagbot.settings.cooldown * 1000);
                        }
                        break;
 
                     case "8ball":
                        if(typeof command[1] == "undefined"){
                            var crowd = API.getUsers();
                            var randomUser = Math.floor(Math.random() * crowd.length);
                            var randomBall = Math.floor(Math.random() * swagbot.misc.ball.length);
                            var randomSentence = Math.floor(Math.random() * 1);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("@" + data.from + ", "+ swagbot.misc.ball[randomBall]);
                                    break;
                                case 1:
                                    API.sendChat("@" + data.from + ", "+ swagbot.misc.ball[randomBall]);
                                    break;
                            }
                        }else{
                            if(command[1].indexOf("@") === 0) command[1] = command[1].substring(1);
                            var randomBall = Math.floor(Math.random() * swagbot.misc.ball.length);
                            var randomSentence = Math.floor(Math.random() * 1);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("@" + data.from + ", "+ swagbot.misc.ball[randomBall]);
                                    break;
                                case 1:
                                    API.sendChat("@" + data.from + ", "+ swagbot.misc.ball[randomBall]);
                                    break;
                           }
                        }
                        if(swagbot.admins.indexOf(fromID) == -1 || API.getUser(fromID).permission < 2){
                            swagbot.misc.ready = false;
                            setTimeout(function(){ swagbot.misc.ready = true; }, swagbot.settings.cooldown * 1000);
                        }
                        break;
                       case "fortune":
                        if(typeof command[1] == "undefined"){
                            var crowd = API.getUsers();
                            var randomUser = Math.floor(Math.random() * crowd.length);
                            var randomFortune = Math.floor(Math.random() * swagbot.misc.fortune.length);
                            var randomSentence = Math.floor(Math.random() * 1);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("@" + data.from + " ,"+ swagbot.misc.fortune[randomFortune]);
                                    break;
                                case 1:
                                    API.sendChat("@" + data.from + ","+ swagbot.misc.fortune[randomFortune]);
                                    break;
                            }
                        }else{
                            if(command[1].indexOf("@") === 0) command[1] = command[1].substring(1);
                            var randomFortune = Math.floor(Math.random() * swagbot.misc.fortune.length);
                            var randomSentence = Math.floor(Math.random() * 1);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("@" + data.from + ","+ swagbot.misc.fortune[randomFortune]);
                                    break;
                                case 1:
                                    API.sendChat("@" + data.from + ","+ swagbot.misc.fortune[randomFortune]);
                                    break;
                           }
                        }
                        if(swagbot.admins.indexOf(fromID) > -1 || API.getUser(fromID).permission < 2){
                            swagbot.misc.ready = false;
                            setTimeout(function(){ swagbot.misc.ready = true; }, swagbot.settings.cooldown * 1000);
                        }
                        break;
                     case "roll":
                        if(typeof command[1] == "undefined"){
                            var crowd = API.getUsers();
                            var randomUser = Math.floor(Math.random() * crowd.length);
                            var randomRoll = Math.floor(Math.random() * swagbot.misc.roll.length);
                            var randomSentence = Math.floor(Math.random() * 2);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("@"+ data.from +" You rolled a "+ swagbot.misc.roll2[randomRoll]);
                                    setTimeout(function(){
                                    document.getElementById("woot").click()
                                    }, 650);
                                    break;
                                case 1:
                                    API.sendChat("@" + data.from + ", "+ swagbot.misc.roll[randomRoll]);
                                    break;
                            }
                        }else{
                            if(command[1].indexOf("@") === 0) command[1] = command[1].substring(1);
                            var randomRoll = Math.floor(Math.random() * swagbot.misc.roll.length);
                            var randomSentence = Math.floor(Math.random() * 2);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("@"+ data.from +" You rolled a "+ swagbot.misc.roll2[randomRoll]);
                                    setTimeout(function(){
                                    document.getElementById("woot").click()
                                    }, 650);
                                    break;
                                case 1:
                                    API.sendChat("@" + data.from + ", "+ swagbot.misc.roll[randomRoll]);
                                    break;
                           }
                        }
                        if(swagbot.admins.indexOf(fromID) > -1 || API.getUser(fromID).permission < 2){
                            swagbot.misc.ready = false;
                            setTimeout(function(){ swagbot.misc.ready = true; }, swagbot.settings.cooldown * 1000);
                        }
                        break;
                      case "commands":
                        if(typeof command[1] == "undefined"){
              API.sendChat("User Commands -| Rules | wiki | Define | Adblock | emoji | Roll | overplayed | blacklist | Fortune | 8ball | Flipcoin | Help | Songlink | cookie | hug | marco | slap|");
                        }else if(command[1].indexOf("@") > -1){
                         ("User Commands -| Rules | Roll | overplayed | blacklist | Fortune | 8ball | Flipcoin | Help | Songlink | cookie | hug | marco | slap|");
                        }else{
                          ("User Commands -| Rules | Roll | overplayed | blacklist | Fortune | 8ball | Flipcoin | Help | Songlink | cookie | hug | marco | slap|");
                        }
                        if(swagbot.admins.indexOf(fromID) == -1 || API.getUser(fromID).permission < 2){
                            swagbot.misc.ready = false;
                            setTimeout(function(){ swagbot.misc.ready = true; }, swagbot.settings.cooldown * 1000);
                        }
                        break;
						
					case "linkify":
                        if(typeof command[1] == "undefined"){
                            API.sendChat("@" + data.from + " You need to put a link!");
                        }else if(command[1].toLowerCase().indexOf("plug.dj") === -1 && command[1].toLowerCase().indexOf("bug.dj") === -1){
                            API.sendChat("http://"+command[1]);
                        }else{
                            API.sendChat("Nice try! Advertising is not allowed in this room.");
                        }
                        if(swagbot.admins.indexOf(fromID) == -1 || API.getUser(fromID).permission < 2){
                            swagbot.misc.ready = false;
                            setTimeout(function(){ swagbot.misc.ready = true; }, swagbot.settings.cooldown * 1000);
                        }
                        break;
case "votes":
                        if(API.getUser(fromID).permission < 2 || swagbot.admins.indexOf(fromID) > -1){
                        API.sendChat("Users vote:  :+1: " + API.getRoomScore().positive + " | :-1: " + API.getRoomScore().negative + " | :purple_heart: " + API.getRoomScore().curates);
                            swagbot.misc.ready = false;
                            setTimeout(function(){ swagbot.misc.ready = true; }, swagbot.settings.cooldown * 1000);
                        }
                        break;
                case "define":
          if(typeof command[1] == "undefined"){
            API.sendChat("@" + data.from + " Define what?!");
          }else if(command[1].toLowerCase().indexOf("xxx") === -1 && command[1].toLowerCase().indexOf("porn") === -1 && command[1].toLowerCase().indexOf("sex") === -1){
            API.sendChat("@"+ data.from +" http://www.urbandictionary.com/define.php?term="+command[1]);
          }else{
            API.sendChat("@"+ data.from +" What are you an idiot?");
          }
          if(swagbot.admins.indexOf(fromID) == -1 || API.getUser(fromID).permission < 2){
            swagbot.misc.ready = false;
            setTimeout(function(){ swagbot.misc.ready = true; }, swagbot.settings.cooldown * 1000);
          }
          break;
        case "wiki":
          if(typeof command[1] == "undefined"){
            API.sendChat("@"+data.from+" https://en.wikipedia.org/wiki/Special:Random");
          }else{
            var r = data.message.substring(6).replace(/,/g, "_");
            $.getJSON("http://jsonp.appspot.com/?callback=?&url=" + escape("http://en.wikipedia.org/w/api.php?action=query&prop=links&format=json&titles="+r.replace(/,/g,"_")),
                function(wikiData){
                  if (!wikiData || !wikiData.query || !wikiData.query.pages);
                  return API.sendChat("@"+data.from+" http://en.wikipedia.org/wiki/"+r+" (NOT GUARANTEED TO BE CORRECT)");
                  if (wikiData.query.pages[-1]) {
                    API.sendChat("@"+data.from+" article not found");
                  }else{
                    for (var i in wikiData.query.pages)
              // note: the #... is just to make the url look nicer
              return API.sendChat("@"+data.from+" https://en.wikipedia.org/wiki/?curid="+i+"#"+escape(wikiData.query.pages[i].title) );
                  }
                }
                );
          }
          if(swagbot.admins.indexOf(fromID) == -1 || API.getUser(fromID).permission < 2){
            swagbot.misc.ready = false;
            setTimeout(function(){ swagbot.misc.ready = true; }, swagbot.settings.cooldown * 1000);
          }
          break;
			case "songlink":
                        if(API.getMedia().format == 1){
                            API.sendChat("@" + data.from + " " + "Songlink @ http://youtu.be/" + API.getMedia().cid);
                        }else{
                            var id = API.getMedia().cid;
                            SC.get('/tracks', { ids: id,}, function(tracks) {
                                API.sendChat("@"+data.from+" "+tracks[0].permalink_url);
                            });
                        }
                        if(swagbot.admins.indexOf(fromID) == -1 || API.getUser(fromID).permission < 2){
                            swagbot.misc.ready = false;
                            setTimeout(function(){ swagbot.misc.ready = true; }, swagbot.settings.cooldown * 1000);
                        }
                         /*
                        break;case "punish":
          if(typeof command[1] == "@"){
            var crowd = API.getUsers();
            var randomUser = Math.floor(Math.random() * crowd.length);
            var randomSentence = Math.floor(Math.random() * 6);
            switch(randomSentence){
              case 0:
                API.sendChat("/me rubs sandpaper on @"+command[1]+"'s scrotum");
                break;
              case 1:
                API.sendChat("/me penetrates @"+command[1]+" with a sharpie");
                break;
              case 2:
                API.sendChat("/me pokes @"+command[1]+" in the eyes");
                break;
              case 3:
                API.sendChat("/me makes @"+command[1]+"'s mother cry");
                break;
              case 4:
                API.sendChat("/me pinches @"+command[1]+"'s nipples super hard");
                break;
              case 5:
                API.sendChat("/me gives @"+command[1]+" a wet willy");
                break;

              case 6:
                API.sendChat("/me Sets @"+command[1]+" hair on fire");
                break;
            }
          }else{
            if(command[1].indexOf("@") === 0) command[1] = command[1].substring(1);
            var randomSentence = Math.floor(Math.random() * 6);
            switch(randomSentence){
              case 0:
                API.sendChat("/me rubs sandpaper on @"+command[1]+"'s scrotum");
                break;
              case 1:
                API.sendChat("/me penetrates @"+command[1]+" with a sharpie");
                break;
              case 2:
                API.sendChat("/me pokes @"+command[1]+" in the eyes");
                break;
              case 3:
                API.sendChat("/me makes @"+command[1]+"'s mother cry");
                break;
              case 4:
                API.sendChat("/me pinches @"+command[1]+"'s nipples super hard");
                break;
              case 5:
                API.sendChat("/me gives @"+command[1]+" a wet willy");
                break;

              case 6:
                API.sendChat("/me Sets @"+command[1]+" hair on fire");
                break;
            }
          }*/
          if(swagbot.admins.indexOf(fromID) == -1 || API.getUser(fromID).permission < 2){
            swagbot.misc.ready = false;
            setTimeout(function(){ swagbot.misc.ready = true; }, swagbot.settings.cooldown * 1000);
          }
          break;
          break;
					
					case "bitchslap":
                case "slap":
                        if(typeof command[1] == "undefined"){
                        API.sendChat("@"+ data.from +" just gave a huge slap to @"+ API.getDJ().username +" for playing this awful track!");
                        
                         }
                        break;
                        
                case "join":
                        if(swagbot.admins.indexOf(fromID) > -1 || swagbot.admins.indexOf(fromID) > -1){
                        if(typeof command[1] === "undefined"){
                            API.djJoin();
                        }
                    }
                        break;
 
                case "leave":
                        if(swagbot.admins.indexOf(fromID) > -1 || swagbot.admins.indexOf(fromID) > -1){
                        if(typeof command[1] === "undefined"){
                            API.djLeave();
                        }
                    }
                        break;
                case "add":
                    if(API.getUser(fromID).permission > 1 || swagbot.admins.indexOf(fromID) > -1){
                        if(typeof command[1] === "undefined"){
                            $(".icon-curate").click();
                            $($(".curate").children(".menu").children().children()[0]).mousedown();
                        }
                    }
                        break;
                        /*
					case "residentdj":
                    case "residentdjs":
                        if(swagbot.admins.indexOf(fromID) > -1 || API.getStaff().permission > 2){
                            API.sendChat("Resident DJs have no moderation privileges but their name will appear in the chat the same color as the community staff.");
                         setTimeout(function(){
                            API.sendChat("This role is usually given to artists, promoters or friends of the Community Staff to make the person stand out from the crowd. Resident DJs can, however, join an empty DJ booth.");
                         }, 650);
                            swagbot.misc.ready = false;
                            setTimeout(function(){ swagbot.misc.ready = true; }, swagbot.settings.cooldown * 1000);
                        }
                        break;
                        
                        
                    case "bouncer":
                    case "bouncers":
                        if(swagbot.admins.indexOf(fromID) > -1 || API.getStaff().permission > 2){
                            API.sendChat("Bouncers are people you trust to maintain order in the community, and a community can have an unlimited number of Bouncers. They can add/remove DJs, force skip, ban people from the community and delete offensive chat messages.");
                         setTimeout(function(){
                            API.sendChat("Bouncers cannot create other bouncers.");
                         }, 650);
                            swagbot.misc.ready = false;
                            setTimeout(function(){ swagbot.misc.ready = true; }, swagbot.settings.cooldown * 1000);
                        }
                        break;
                        
                    case "manager":
                    case "managers":
                        if(swagbot.admins.indexOf(fromID) > -1 || API.getStaff().permission > 3){
                            API.sendChat("There is currently a limit of 10 managers per community. Managers cannot add other managers; they can only add bouncers. Managers cannot change the community name or description, but they can change the community settings like disable/enable");
                            setTimeout(function(){
                            API.sendChat("The Wait List, toggle DJ cycling, etc.) and perform all the other moderation actions.");
                         }, 650);
                            swagbot.misc.ready = false;
                            setTimeout(function(){ swagbot.misc.ready = true; }, swagbot.settings.cooldown * 1000);
                        }
                        break;
                        
                    case "host":
                    case "hosts":
                        if(swagbot.admins.indexOf(fromID) > -1 || API.getUser(fromID).permission < 2){
                            API.sendChat("A Host is the person who created the community. Hosts can create co-hosts (up to 2 currently). Hosts and co-hosts have the same privileges except that co-hosts cannot create other co-hosts. Hosts and co-hosts can change the community name and");
                         setTimeout(function(){
                            API.sendChat("description, as well as the community rules and can perform all of the normal moderation actions such as force skip a DJ, ban a person from the community, delete inappropriate chat messages, and move people in the Wait List as well as add/remove them.");
                         }, 650);
                            swagbot.misc.ready = false;
                            setTimeout(function(){ swagbot.misc.ready = true; }, swagbot.settings.cooldown * 1000);
                        }
                        break;
                            */
                    case "ba":
                    case "brandambassador":
                    case "ambassador":
                        if(swagbot.admins.indexOf(fromID) > -1 || API.getUser(fromID).permission < 2){
                            API.sendChat("Brand Ambassadors have all of the same abilities of Managers, except their privileges extend across all of the communities on plug.dj. Brand Ambassadors are a good resource for answering");
                         setTimeout(function(){
                            API.sendChat(" general questions you may have. Brand Ambassadors will have a green microphone next to their name in chat. They are there to assist you.");
                         }, 650);
                            swagbot.misc.ready = false;
                            setTimeout(function(){ swagbot.misc.ready = true; }, swagbot.settings.cooldown * 1000);
                        }
                        break;
					
					case "help":
                        if(typeof command[1] == "undefined"){
                            API.sendChat("Create a playlist and populate it with songs from either YouTube or Soundcloud. Click the 'Join Waitlist' button and wait your turn to play music.");
                                setTimeout(function(){
                            API.sendChat("Ask a mod if you're unsure about your song choice.");
                         }, 650);
                        }else if(command[1].indexOf("@") > -1){
                            API.sendChat(command[1]+ "Create a playlist and populate it with songs from either YouTube or Soundcloud. Click the 'Join Waitlist' button and wait your turn to play music.");
                                setTimeout(function(){
                            API.sendChat("Ask a mod if you're unsure about your song choice.");
                         }, 650);
                        }
                        if(swagbot.admins.indexOf(fromID) == -1 || API.getUser(fromID).permission < 2){
                            swagbot.misc.ready = false;
                            setTimeout(function(){ swagbot.misc.ready = true; }, swagbot.settings.cooldown * 1000);
                        }
                        break;

                }
            }
        }
    });

    API.on(API.CHAT, function(data){
        if(data.message.indexOf('!') === 0){
            var msg = data.message, from = data.from, fromID = data.fromID;
            var command = msg.substring(1).split(' ');
            if(typeof command[2] != "undefined"){
                for(var i = 2; i<command.length; i++){
                    command[1] = command[1] + ' ' + command[i];
                }
            }
            if(swagbot.misc.ready || swagbot.admins.indexOf(fromID) > -1 || API.getUser(fromID).permission > 1){
                switch(command[0].toLowerCase()){
                     case "meh":
                     if(API.getUser(data.fromID).permission > 1 || swagbot.admins.indexOf(fromID) > -1) $("#meh").click();
                     break;
                               
                     case "woot":
                     if(API.getUser(data.fromID).permission > 1 || swagbot.admins.indexOf(fromID) > -1)  $("#woot").click();
                     break;

                     case "skip":
                     if(API.getUser(data.fromID).permission > 1){
                     if(typeof command[1] === "undefined"){
                     API.moderateForceSkip();
	API.moderateDeleteChat(data.chatID);
                        }else{
                            API.sendChat('@'+API.getDJs()[0].username+' '+command[1]);
                            API.moderateForceSkip();
                        }
                    }
                        break;
                        break;
                    case 'cancel':
                        cancel = true;
                        API.sendChat('AutoSkip cancelled');
                        break;
						
					case 'clearchat':
                        if( API.getUser(data.fromID).permission > 1){
						var arg = $('#chat-messages').children();
						       for(var i=0;i<arg.length;i++) API.moderateDeleteChat(arg[i].className.substr(arg[i].className.indexOf('cid-')+4,14));
                        deleteAll = true;
			  setTimeout(function(){			
                          API.sendChat('Chat Cleared!');
						}, 950);
                        }
                        break;



                    case "lockskip":
                     if(API.getUser(data.fromID).permission > 1 || swagbot.admins.indexOf(fromID) > -1){
                     API.moderateLockWaitList(true);
                     API.moderateForceSkip();
            setTimeout(function(){
              API.moderateLockWaitList(false);
            }, 650);
          }else{
            API.sendChat("This command requires Admins only!");
          }
          break;
                    case 'rvf':
                    case 'removedfilter':
                        if(API.getUser(fromID).permission > 1 || swagbot.admins.indexOf(fromID) > -1) swagbot.settings.removedFilter ? API.sendChat("Removed video filter is enabled") : API.sendChat("Removed video is disabled");
                        break;
                    case 'trvf':
                    case 'toggleremovedfilter':
                        swagbot.settings.removedFilter = !swagbot.settings.removedFilter;
                        if(API.getUser(fromID).permission > 1 || swagbot.admins.indexOf(fromID) > -1) swagbot.settings.removedFilter ? API.sendChat("Removed video filter is enabled") : API.sendChat("Removed video is disabled");
                        break;
                    case "historyfilter":
                    case "hf":
                        if(API.getUser(fromID).permission > 1 || swagbot.admins.indexOf(fromID) > -1) swagbot.settings.historyFilter ? API.sendChat("History filter is enabled") : API.sendChat("History filter is disabled");
                        botMethods.save();
                        break;

                    case "swearfilter":
                    case "sf":
                        if(API.getUser(fromID).permission > 1 || swagbot.admins.indexOf(fromID) > -1) swagbot.settings.swearFilter ? API.sendChat("Swearing filter is enabled") : API.sendChat("Swearing filter is disabled");
                        botMethods.save();
                        break;

                    case "racismfilter":
                    case "rf":
                        if(API.getUser(fromID).permission > 1 || swagbot.admins.indexOf(fromID) > -1) swagbot.settings.racismFilter ? API.sendChat("Racism filter is enabled") : API.sendChat("Racism filter is disabled");
                        botMethods.save();
                        break;

                    case "beggerfilter":
                    case "bf":
                        if(API.getUser(fromID).permission > 1 || swagbot.admins.indexOf(fromID) > -1) swagbot.settings.beggerFilter ? API.sendChat("Begger filter is enabled") : API.sendChat("Begger filter is disabled");
                        botMethods.save();
                        break;
						
					case "welcomefilter":
                    case "wf":
                        if(API.getUser(fromID).permission > 1 || swagbot.admins.indexOf(fromID) > -1) swagbot.settings.greetMessage ? API.sendChat("Welcome filter is enabled") : API.sendChat("Welcome filter is disabled");
                        botMethods.save();
                        break;
						
                    case "tsf":
                        if(API.getUser(fromID).permission > 1 || swagbot.admins.indexOf(fromID) > -1){
                            if(swagbot.settings.swearFilter){
                                swagbot.settings.swearFilter = false;
                                API.sendChat("Bot will no longer filter swearing.");
                            }else{
                                swagbot.settings.swearFilter = true;
                                API.sendChat("Bot will now filter swearing.");
                            }
                        }
                        botMethods.save();
                        break;

                    case "trf":
                        if(API.getUser(fromID).permission > 1 || swagbot.admins.indexOf(fromID) > -1){
                            if(swagbot.settings.racismFilter){
                                swagbot.settings.racismFilter = false;
                                API.sendChat("Bot will no longer filter racism.");
                            }else{
                                swagbot.settings.racismFilter = true;
                                API.sendChat("Bot will now filter racism.");
                            }
                        }
                        botMethods.save();
                        break;

                    case "tbf":
                        if(API.getUser(fromID).permission > 1 || swagbot.admins.indexOf(fromID) > -1){
                            if(swagbot.settings.beggerFilter){
                                swagbot.settings.beggerFilter = false;
                                API.sendChat("Bot will no longer filter fan begging.");
                            }else{
                                swagbot.settings.beggerFilter = true;
                                API.sendChat("Bot will now filter fan begging.");
                            }
                        }
                        botMethods.save();
                        break;
                    case "thf":
                        if(API.getUser(fromID).permission > 1 || swagbot.admins.indexOf(fromID) > -1){
                            if(swagbot.settings.historyFilter){
                                swagbot.settings.historyFilter = false;!
                                    API.sendChat("Bot will no longer skip songs that are in the room history.");
                            }else{
                                swagbot.settings.historyFilter = true;
                                API.sendChat("Bot will now skip songs that are in the room history.");
                            }
                        }
                        botMethods.save();
                        break;

                    case "version":
                        API.sendChat("SwagBot Script version " + swagbot.misc.version);
                        if(swagbot.admins.indexOf(fromID) == -1 || API.getUser(fromID).permission < 2){
                            swagbot.misc.ready = false;
                            setTimeout(function(){ swagbot.misc.ready = true; }, swagbot.settings.cooldown * 1000);
                        }
                        break;

                    case "origin":
                    case "author":
                    case "authors":
                    case "creator":
                        API.sendChat(swagbot.misc.origin);
                        if(swagbot.admins.indexOf(fromID) == -1 || API.getUser(fromID).permission < 2){
                            swagbot.misc.ready = false;
                            setTimeout(function(){ swagbot.misc.ready = true; }, swagbot.settings.cooldown * 1000);
                        }
                        break;

                     case "status":
                        if(swagbot.admins.indexOf(fromID) > -1){
                            var response = "";
                            var currentTime = new Date().getTime();
                            var minutes = Math.floor((currentTime - joined) / 60000);
                            var hours = 0;
                            while(minutes > 60){
                                minutes = minutes - 60;
                                hours++;
                            }
                            hours == 0 ? response = "Running for " + minutes + "m " : response = "Running for " + hours + "h " + minutes + "m";
                            response = response + " | Begger filter: "+swagbot.settings.beggerFilter;
                            response = response + " | Swear filter: "+swagbot.settings.swearFilter;
                            response = response + " | Racism filter: "+swagbot.settings.racismFilter;
                            response = response + " | History filter: "+swagbot.settings.historyFilter;
                            response = response + " | MaxLength: " + swagbot.settings.maxLength + "m";
                            response = response + " | Cooldown: " + swagbot.settings.cooldown + "s";
                            response = response + " | Removed Video Filter: "+ swagbot.settings.removedFilter;
                            API.sendChat(response);
                        }
                        break;
 

                    case "cooldown":
                        if(API.getUser(fromID).permission > 1 || swagbot.admins.indexOf(fromID) > -1){
                            if(typeof command[1] == "undefined"){
                                if(swagbot.settings.cooldown != 0.0001){
                                    API.sendChat('Cooldown is '+swagbot.settings.cooldown+' seconds');
                                }else{
                                    API.sendChat('Cooldown is disabled');
                                }
                            }else if(command[1] == "disable"){
                                swagbot.settings.cooldown = 0.0001;
                                API.sendChat('Cooldown disabled');
                            }else{
                                swagbot.settings.cooldown = command[1];
                                API.sendChat('New cooldown is '+swagbot.settings.cooldown+' seconds');
                            }
                        }
                        botMethods.save();
                        break;

                    case "maxlength":
                        if(API.getUser(fromID).permission > 1 || swagbot.admins.indexOf(fromID) > -1){
                            if(typeof command[1] == "undefined"){
                                if(swagbot.settings.maxLength != 1e+50){
                                    API.sendChat('Maxlength is '+swagbot.settings.maxLength+' minutes');
                                }else{
                                    API.sendChat('Maxlength is disabled');
                                }
                            }else if(command[1] == "disable"){
                                swagbot.settings.maxLength = Infinity;
                                API.sendChat('Maxlength disabled');
                            }else{
                                swagbot.settings.maxLength = command[1];
                                API.sendChat('New maxlength is '+swagbot.settings.maxLength+' minutes');
                            }
                        }
                        botMethods.save();
                        break;

                    case "interactive":
                        if(API.getUser(fromID).permission > 1 || swagbot.admins.indexOf(fromID) > -1){
                            swagbot.settings.interactive ? API.sendChat("Bot is interactive.") : API.sendChat("Bot is not interactive.");
                        }
                        break;

                    case "toggleinteractive":
                    case "ti":
                        if(API.getUser(fromID).permission > 1 || swagbot.admins.indexOf(fromID) > -1){
                            if(swagbot.settings.interactive){
                                swagbot.settings.interactive = false;
                                API.sendChat("Bot will no longer interact.");
                            }else{
                                swagbot.settings.interactive = true;
                                API.sendChat("Bot will now interact.");
                            }
                        }
                        botMethods.save();
                        break;

                    case "save":
                        if(API.getUser(fromID).permission > 1 || swagbot.admins.indexOf(fromID) > -1){
                            botMethods.save();
                            API.sendChat("Settings saved.");
                        }
                        break;

                    case "silence":
                        if(API.getUser(fromID).permission > 1 || swagbot.admins.indexOf(fromID) > -1){
                            swagbot.settings.interactive = false;
                            API.sendChat("Yessir!");
                        }
                        botMethods.save();
                        break;
/*
                    case "changelog":
                        if(API.getUser(fromID).permission > 1 || swagbot.admins.indexOf(fromID) > -1){
                            API.sendChat("New in version " + swagbot.misc.version + " - " + swagbot.misc.changelog)
                        }
                        break;*/

                }
            }
        }
    });

    API.on(API.CHAT, function(data){
        if(data.message.indexOf('!') === 0){
            var msg = data.message, from = data.from, fromID = data.fromID;
            var command = msg.substring(1).split(' ');
            if(typeof command[2] != "undefined"){
                for(var i = 2; i<command.length; i++){
                    command[1] = command[1] + ' ' + command[i];
                }
            }
            if(swagbot.misc.ready || swagbot.admins.indexOf(fromID) > -1 ||API.getUser(fromID).permission > 1){
                switch(command[0].toLowerCase()){
                    case "hug":
                        if(typeof command[1] == "undefined"){
                            var crowd = API.getUsers();
                            var randomUser = Math.floor(Math.random() * crowd.length);
                            var randomSentence = Math.floor(Math.random() * 3);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("Hugs? Forget that!");
                                    setTimeout(function(){
                                        API.sendChat("/me give's @"+crowd[randomUser].username+" a big huge hug.");
                                    }, 650);
                                    break;
                                case 1:
                                    API.sendChat("/me gives @"+crowd[randomUser].username+" a big bear hug");
                                    break;
                                case 2:
                                    API.sendChat("/me gives @"+crowd[randomUser].username+" a soft, furry hug");
                                    break;
                                case 3:
                                    API.sendChat("/me gives @"+crowd[randomUser].username+" an awkward hug");
                                    break;
                            }
                        }else{
                            if(command[1].indexOf("@") === 0) command[1] = command[1].substring(1);
                            var crowd = API.getUsers();
                            var randomUser = Math.floor(Math.random() * crowd.length);
                            var randomSentence = Math.floor(Math.random() * 3);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("Hugs? Forget that!");
                                    setTimeout(function(){
                                        API.sendChat("/me give's @"+botMethods.cleanString(command[1])+" a big huge hug.");
                                    }, 650);
                                    break;
                                case 1:
                                    API.sendChat("/me gives @"+botMethods.cleanString(command[1])+" a big bear hug");
                                    break;
                                case 2:
                                    API.sendChat("/me gives @"+botMethods.cleanString(command[1])+" a soft, furry hug");
                                    break;
                                case 3:
                                    API.sendChat("/me gives @"+botMethods.cleanString(command[1])+" an awkward hug");
                                    break;
                            }
                        }
                        if(swagbot.admins.indexOf(fromID) == -1 || API.getUser(fromID).permission < 2){
                            swagbot.misc.ready = false;
                            setTimeout(function(){ swagbot.misc.ready = true; }, swagbot.settings.cooldown * 1000);
                        }
                        break;
                     case "cookie":
                        if(typeof command[1] == "undefined"){
                            var crowd = API.getUsers();
                            var randomUser = Math.floor(Math.random() * crowd.length);
                            var randomSentence = Math.floor(Math.random() * 3);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("/me throws a STICK OF DYNAMITE at @"+crowd[randomUser].username);
                                    break;
                                case 1:
                                    API.sendChat("/me drowns @"+crowd[randomUser].username+" in batter");
                                    break;
                                case 2:
                                    API.sendChat("/me shows @"+crowd[randomUser].username+" the power of friendship. BY SLAPPING THEM WITH A COOKIE");
                                    break;
                                case 3:
                                    API.sendChat("/me hands an anthrax laced cookie to @"+crowd[randomUser].username);
                                    break;
                            }
                        }else{
                            if(command[1].indexOf("@") === 0) command[1] = command[1].substring(1);
                            var randomSentence = Math.floor(Math.random() * 3);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("/me throws a STICK OF DYNAMITE at @"+botMethods.cleanString(command[1]));
                                    break;
                                case 1:
                                    API.sendChat("/me drowns @"+botMethods.cleanString(command[1])+" in batter");
                                    break;
                                case 2:
                                    API.sendChat("/me hands an anthrax laced cookie to @"+botMethods.cleanString(command[1]));
                                    break;
                                case 3:
                                    API.sendChat("/me shows @"+botMethods.cleanString(command[1])+" the power of friendship. BY SLAPPING THEM WITH A COOKIE");
                                    break;
                            }
                        }
                        if(swagbot.admins.indexOf(fromID) == -1 || API.getUser(fromID).permission < 2){
                            swagbot.misc.ready = false;
                            setTimeout(function(){ swagbot.misc.ready = true; }, swagbot.settings.cooldown * 1000);
                        }
                        break;

                    case "run":
                        if(swagbot.admins.indexOf(fromID) > -1){
                            a = botMethods.cleanString(command[1]);
                            console.log(a);
                            eval(a);
                        }
                        break;

                }
            }
        }
    });

    API.on(API.CHAT, function(data){
        if(data.message.indexOf('!rule ') === 0){
            var msg = data.message, from = data.from, fromID = data.fromID;
            var command = msg.substring(1).split(' ');

            if(swagbot.misc.ready || swagbot.admins.indexOf(fromID) > -1 ||API.getUser(fromID).permission > 1){
                switch(command[1]){
                    case '1':
                        API.sendChat('Please keep all chat to English only.');
                        break;
                    case '2':
                        API.sendChat('No swearing in chat.');
                        break;
                    case '3':
                        API.sendChat('Do not spam in chat.');
                        break;
                    case '4':
                        API.sendChat('Do not ask for ranks.');
                        break;
                    case '5':
                        API.sendChat('No web links in chat exept swag-craft related links.');
                        break;
                    case '6':
                        API.sendChat('No songs over 10 minutes. (some songs a little bit over may be allowed, ask a mod)');
                        break;
                    case '7':
                        API.sendChat('Spamming in chat will result in kicked');
                        break;
                    case '8':
                        API.sendChat('FOR THE LOVE OF CELESTIA, CONTROL THE CANTERLOCK');
                        break;
                    case '9':
                        API.sendChat('There is a no tolerance policy for fighting');
                        break;
                    case '10':
                        API.sendChat('All visitors to the room must be treated equally and fairly by all');
                        break;
                    case '11':
                        API.sendChat('Do not ask for, bouncer/manager/host positions');
                        break;
                    case '12':
                        API.sendChat('Respect other users and moderators, continuous disrespect will result in being kicked');
                        break;
                    case '13':
                        API.sendChat('No R34/clop/porn/gore. This includes links, songs, and chat. (If you want to post this stuff anywhere, talk to a moderator about being added to the Skype group, you can post it there with proper tags [NSFW/NSFL])');
                        break;
                    case '14':
                        API.sendChat('No playing episodes/non-music shorts unless you’re the (co)host or were giving permission to play a episode/non-music short by a (co)host');
                        break;
                    case '15':
                        API.sendChat('When posting links, please add NSFW for anything suggestive (anything saucy, porn, gore, or clop is NOT allowed). Add Spoiler tags when necessary as well');
                        break;
                    case '16':
                        API.sendChat('Swearing is allowed in moderation. Racist and derogatory slurs can result in being kicked');
                        break;
                    case '17':
                        API.sendChat('Only moderators may ask who mehed or why');
                        break;
                    case '18':
                        API.sendChat('Impersonating other artists, users, etc. can result in being kicked');
                        break;
                    case '19':
                        API.sendChat('If you\'re going to autojoin, be responsive when someone @mentions you, otherwise you risk being kicked');
                        break;
                    case '20':
                        API.sendChat('Using multiple accounts to DJ or enter the booth or waitlist is not allowed');
                        break;
                    case '21':
                        API.sendChat('Don\'t spam emotes, don\'t use overly large emotes, and don\'t use emotes in your name (Referring to ponymotes)');
                        break;
                    case '22':
                        API.sendChat('Do not ask for fans');
                        break;
                    case '23':
                        API.sendChat('Songs such as Nigel, Pingas, etc. are subject to being skipped on any day but Sunday. !weird for full list');
                        break;
                    case '24':
                        API.sendChat('Do not ask for Fans in chat. Earn them by being polite, helpful, or by playing good music.');
                        break;
                    case '25':
                        API.sendChat('If you have a complaint, do not argue in the chat where everyone can see, instead submit a complaint to the form (http://bit.ly/145oLLW) or take it up with a moderator on Skype. (if you don’t have Skype ask for another form of contact)');
                        break;
                    case '26':
                        API.sendChat('Don’t use excessively long or offensive names');
                        break;
                    case '27':
                        API.sendChat('Have fun and enjoy yourselves!');
                        break;
                    case '34':
                        API.sendChat('hue hue hue');
                        break;
                    case '99':
                        API.sendChat('Just no..');
                        break;
                    default:
                        API.sendChat('Unknown rule!');
                        break;
                }
            }
        }
    });

    API.on(API.CHAT, function(data){
        var msg = data.message, fromID = data.fromID;
        command = msg.substring(1).split(' ');
        if(typeof command[3] != "undefined"){
            for(var i = 3; i<command.length; i++){
                command[2] = command[2] + ' ' + command[i];
            }
        }
        if(API.getUser(data.fromID).permission > 1){
            switch(command[0]){
                case 'ruleskip':
                    if(command[1].length === 13 && command[1].indexOf(':') === 1 && command[1].indexOf(1) === 0){
                        ruleSkip[command[1]] = {id: command[1], rule: command[2]};
                        $.getJSON("http://gdata.youtube.com/feeds/api/videos/"+command[1].substring(2)+"?v=2&alt=jsonc&callback=?", function(json){
                            setTimeout(function(){
                                if(typeof json.data.title !== 'undefined'){
                                    API.sendChat(json.data.title+' added to ruleskip');
                                }else{
                                    API.sendChat('Added to ruleskip');
                                }
                            }, 500)
                        });
                    }else if(command[1].length === 10 && command[1].indexOf(':') === 1 && command[1].indexOf(2) === 0){
                        ruleSkip[command[1]] = {id: command[1], rule: command[2]};
                        SC.get('/tracks', {ids: command[1].substring(2)}, function(tracks) {
                            if(typeof tracks[0].title !== 'undefined'){
                                API.sendChat(tracks[0].title+' added to ruleskip');
                            }else{
                                API.sendChat('Added to ruleskip');
                            }
                        });
                    }else if(typeof ruleSkip[API.getMedia().id] === 'undefined'){
                    ruleSkip[API.getMedia().id] = {id: API.getMedia().id, rule: command[1]};
                    API.sendChat(API.getMedia().author+ ' - ' +API.getMedia().title+' added to ruleskip');
                    API.moderateForceSkip();
                }
                    botMethods.save();
                    break;
                case 'checkruleskip':
                    if(typeof command[1] !== 'undefined'){
                        if(typeof ruleSkip[command[1]] !== 'undefined') API.sendChat(command[1]+' is in the ruleskip array!');
                        else API.sendChat(command[1]+' is not in the ruleskip array!');
                    }else{
                        if(typeof ruleSkip[API.getMedia().id] !== 'undefined') API.sendChat(API.getMedia().id+' is in the ruleskip array')
                        else API.sendChat(API.getMedia().id+' is not in the ruleskip array');
                    }
                    break;
                case 'ruleskipdelete':
                    if(typeof command[1] !== 'undefined' && typeof ruleSkip[command[1]] !== 'undefined'){
                        delete ruleSkip[command[1]];
                        API.sendChat(command[1]+' removed from ruleskip');
                    }else if(typeof command[1] === 'undefined' && typeof ruleSkip[API.getMedia().id] !== 'undefined'){
                        delete ruleSkip[API.getMedia().id];
                        API.sendChat(API.getMedia().id+' removed from ruleskip');
                    }else if(typeof command[1] !== 'undefined'){
                        API.sendChat(command[1]+' was not in the ruleskip array!');
                    }else{
                        API.sendChat(API.getMedia().id+' was not in the ruleskip array!');
                    }
                    botMethods.save()
                break;
            }
        }
    });

    API.on(API.CHAT, function(data){
        msg = data.message.toLowerCase(), chatID = data.chatID;

        for(var i = 0; i < swagbot.filters.swearWords.length; i++){
            if(msg.indexOf(swagbot.filters.swearWords[i].toLowerCase()) > -1 && swagbot.settings.swearFilter){
                API.moderateDeleteChat(chatID);
            }
        }
        for(var i = 0; i < swagbot.filters.racistWords.length; i++){
            if(msg.indexOf(swagbot.filters.racistWords[i].toLowerCase()) > -1 && swagbot.settings.racismFilter){
                API.moderateDeleteChat(chatID);
            }
        }
        for(var i = 0; i < swagbot.filters.beggerWords.length; i++){
            if(msg.indexOf(swagbot.filters.beggerWords[i].toLowerCase()) > -1 && swagbot.settings.beggerFilter){
                API.moderateDeleteChat(chatID);
            }
        }

    });

    API.on(API.CHAT, function(data){
        msg = data.message.toLowerCase(), chatID = data.chatID, fromID = data.fromID;
        if(swagbot.misc.ready || swagbot.admins.indexOf(fromID) > -1 ||API.getUser(fromID).permission > 1){
            if(msg.indexOf('help bot') > -1){
                API.sendChat('/me Have you tried, !Help or !rules ?');
                if(swagbot.admins.indexOf(fromID) == -1 || API.getUser(fromID).permission < 2){
                    swagbot.misc.ready = false;
                    setTimeout(function(){ swagbot.misc.ready = true; }, swagbot.settings.cooldown * 1000);
                }
            }
            if(msg.indexOf(':yuno:') > -1){
                API.sendChat('/me ლ(ಥ益ಥლ');
                if(swagbot.admins.indexOf(fromID) == -1 || API.getUser(fromID).permission < 2){
                    swagbot.misc.ready = false;
                    setTimeout(function(){ swagbot.misc.ready = true; }, swagbot.settings.cooldown * 1000);
                }
            }
        }

    });
	
	API.on(API.CHAT, function(data){
        msg = data.message.toLowerCase(), chatID = data.chatID, fromID = data.fromID;
        if(swagbot.misc.ready || swagbot.admins.indexOf(fromID) > -1 || API.getUser(fromID).permission > 1){
            if(msg.indexOf('hello bot') !== -1 || msg.indexOf('bot hello') !== -1 || msg.indexOf('hi bot') !== -1 || msg.indexOf('bot hi') !== -1 || msg.indexOf('sup bot') !== -1 || msg.indexOf('bot sup') !== -1 || msg.indexOf('hey bot') !== -1 || msg.indexOf('bot hey') !== -1 || msg.indexOf('hi bot') !== -1 || msg.indexOf('bot howdy') !== -1 || msg.indexOf('aye bot') !== -1 || msg.indexOf('yo bot') !== -1 || msg.indexOf('waddup bot') !== -1 || msg.indexOf('bot waddup') !== -1){
                var HelloMsg = ["Hey!","Oh hey there!","Good day sir!","Hi","Howdy!","Waddup!"];
                API.sendChat("@" + data.from + " " + HelloMsg[Math.floor(Math.random() * HelloMsg.length)]);
                    swagbot.misc.ready = false;
                    setTimeout(function(){ swagbot.misc.ready = true; }, swagbot.settings.cooldown * 1000);
                }
            
        }
        if(swagbot.misc.ready || swagbot.admins.indexOf(fromID) > -1 || API.getUser(fromID).permission > 1){
            if(msg.indexOf("how are you bot") !== -1 || msg.indexOf("bot how are you") !== -1 || msg.indexOf("hru bot") !== -1 || msg.indexOf("bot hru") !== -1 || msg.indexOf("doing good bot?") !== -1 || msg.indexOf("bot doing good?") !== -1 || msg.indexOf("hows it going bot") !== -1 || msg.indexOf("bot how is it going") !== -1 || msg.indexOf("how you doing bot") !== -1 || msg.indexOf("bot how you doing") !== -1){
                var HRUMsg = ["I'm good thanks for asking :)","Doing great yo and yourself?","All Good Mate!","I'm good thanks for asking!","Yeee i'm cool and youself yo?"];
                API.sendChat("@" + data.from + " " + HRUMsg[Math.floor(Math.random() * HRUMsg.length)]);
                    swagbot.misc.ready = false;
                    setTimeout(function(){ swagbot.misc.ready = true; }, swagbot.settings.cooldown * 1000);
                }
        }
        if(swagbot.misc.ready || swagbot.admins.indexOf(fromID) > -1 || API.getUser(fromID).permission > 1){
            if(msg.indexOf("ty bot") !== -1 || msg.indexOf("bot ty") !== -1 || msg.indexOf("thank you bot") !== -1 || msg.indexOf("bot thank you") !== -1 || msg.indexOf("thanks bot") !== -1 || msg.indexOf("bot thanks") !== -1 || msg.indexOf("thx bot") !== -1 || msg.indexOf("bot thx") !== -1){
                var TYMsg = ["You're welcome! :D","Your always welcome bro!","No prob man.."];
                API.sendChat("@" + data.from + " " + TYMsg[Math.floor(Math.random() * TYMsg.length)]);
                    swagbot.misc.ready = false;
                    setTimeout(function(){ swagbot.misc.ready = true; }, swagbot.settings.cooldown * 1000);
                }
        }
        if(swagbot.misc.ready || swagbot.admins.indexOf(fromID) > -1 || API.getUser(fromID).permission > 1){
            if(msg.indexOf("ily bot") !== -1 || msg.indexOf("bot ily") !== -1 || msg.indexOf("i love you bot") !== -1 || msg.indexOf("bot i love you") !== -1 || msg.indexOf("i luv you bot") !== -1 || msg.indexOf("bot i luv you") !== -1 || msg.indexOf("i luv u bot") !== -1 || msg.indexOf("bot i luv u") !== -1 || msg.indexOf("i luv you bot") !== -1 || msg.indexOf("i love you more bot") !== -1){
                var LoveMsg = [" I love you too baby <3","I love you too <3","I love you too o.0","Sweet.. Love you to <3"];
                API.sendChat("@" + data.from + " " + LoveMsg[Math.floor(Math.random() * LoveMsg.length)]);
                    swagbot.misc.ready = false;
                    setTimeout(function(){ swagbot.misc.ready = true; }, swagbot.settings.cooldown * 1000);
                }
        }
        if(swagbot.misc.ready || swagbot.admins.indexOf(fromID) > -1 || API.getUser(fromID).permission > 1){
            if(msg.indexOf("fuck you bot") !== -1 || msg.indexOf("I hate you bot") !== -1 || msg.indexOf("stupid bot") !== -1 || msg.indexOf("bot fuck you") !== -1 || msg.indexOf("f u bot") !== -1 || msg.indexOf("bot f u") !== -1 || msg.indexOf("fuhk yuh bot") !== -1 || msg.indexOf("bot fuhk you") !== -1){
                var FuckMsg = ["watch what you are saying to me...","Did you're mom teach you to swear like that?"];
                API.sendChat("@" + data.from + " " + FuckMsg[Math.floor(Math.random() * FuckMsg.length)]);
                    swagbot.misc.ready = false;
                    setTimeout(function(){ swagbot.misc.ready = true; }, swagbot.settings.cooldown * 1000);
                }
        }        
        if(swagbot.misc.ready || swagbot.admins.indexOf(fromID) > -1 || API.getUser(fromID).permission > 1){
            if(msg.indexOf("son of a bitch bot") !== -1 || msg.indexOf("bot son of a bitch") !== -1 || msg.indexOf("soab bot") !== -1 || msg.indexOf("bot soab") !== -1 || msg.indexOf("son of a biatch bot") !== -1 || msg.indexOf("bot son of a biatch") !== -1){
                var FuckMsg = ["Nah.. Actually im the son of Bender.","http://stream1.gifsoup.com/webroot/animatedgifs/980837_o.gif"];
                API.sendChat("@" + data.from + " " + FuckMsg[Math.floor(Math.random() * FuckMsg.length)]);
                    swagbot.misc.ready = false;
                    setTimeout(function(){ swagbot.misc.ready = true; }, swagbot.settings.cooldown * 1000);
                }
        }
        
    });
	
    API.on(API.DJ_ADVANCE, DJ_ADVANCE);
    function DJ_ADVANCE(data){
        if(swagbot.settings.ruleSkip && typeof ruleSkip[data.media.id] != "undefined"){
            switch(ruleSkip[data.media.id].rule){
                case '1':
                    API.sendChat('@'+data.dj.username+' Dont play troll songs.');
                    botMethods.skip();
                    break;
                case '2':
                    API.sendChat('@'+data.dj.username+' No songs that are longer than 5 mins without permission.');
                    botMethods.skip();
                    break;
                case '3':
                    API.sendChat('@'+data.dj.username+' Song was not in English.');
                    botMethods.skip();
                    break;
                case '4':
                    API.sendChat('@'+data.dj.username+' No R34/clop/porn/gore. This includes links, songs, and chat.');
                    botMethods.skip();
                    break;
                case '5':
                    API.sendChat('@'+data.dj.username+' Don\'t Play songs that are in history!');
                    botMethods.skip();
                    break;
                case '6':
                    API.sendChat('@'+data.dj.username+' Playing Videos/season video/Movies, that has no effort are subject to being skipped');
                    botMethods.skip();
                    break;
                case '7':
                    API.sendChat('@'+data.dj.username+' Just no..');
                    botMethods.skip();
                    break;
                default:
                    API.sendChat('@'+data.dj.username+' '+ruleSkip[data.media.id].rule);
                    botMethods.skip();
                    break;
            }
        }
        $.getJSON('http://gdata.youtube.com/feeds/api/videos/'+data.media.cid+'?v=2&alt=jsonc&callback=?', function(json){response = json.data});
        setTimeout(function(){
            if(typeof response === 'undefined' && data.media.format != 2 && swagbot.settings.removedFilter){
                API.sendChat('/me This video may be unavailable!!');
                botMethods.skip();
            }
        }, 1500);

        cancel = false;
    }


    botMethods.loadStorage();
    console.log("Running Swagbot Script version " + swagbot.misc.version);

    setTimeout(function(){
        $.getScript('');
    }, 1000);

    setTimeout(function(){
        SC.initialize({
            client_id: '52d363bdc3b97a416d5c837f'
        });
    }, 3000);

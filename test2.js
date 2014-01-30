var swagbot = {};
swagbot.misc.ready = true;

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
                var LoveMsg = [" I love you too baby!","I love you too ;)","I love you too o.0","Sweet.. Love you to ;)"];
                API.sendChat("@" + data.from + " " + LoveMsg[Math.floor(Math.random() * LoveMsg.length)]);
                    swagbot.misc.ready = false;
                    setTimeout(function(){ swagbot.misc.ready = true; }, swagbot.settings.cooldown * 1000);
                }
        }
        if(swagbot.misc.ready || swagbot.admins.indexOf(fromID) > -1 || API.getUser(fromID).permission > 1){
            if(msg.indexOf("fuck you bot") !== -1 || msg.indexOf("I hate you bot") !== -1 || msg.indexOf("stupid bot") !== -1 || msg.indexOf("bot fuck you") !== -1 || msg.indexOf("f u bot") !== -1 || msg.indexOf("bot f u") !== -1 || msg.indexOf("fuhk yuh bot") !== -1 || msg.indexOf("bot fuhk you") !== -1){
                var FuckMsg = ["Sonny Boi watch what you are saying to me...","Did you're mom teach you to swear like that?","< Test f*** >.. Sorry 0% effs were given by me."];
                API.sendChat("@" + data.from + " " + FuckMsg[Math.floor(Math.random() * FuckMsg.length)]);
                    swagbot.misc.ready = false;
                    setTimeout(function(){ swagbot.misc.ready = true; }, swagbot.settings.cooldown * 1000);
                }
        }        
        if(swagbot.misc.ready || swagbot.admins.indexOf(fromID) > -1 || API.getUser(fromID).permission > 1){
            if(msg.indexOf("son of a bitch bot") !== -1 || msg.indexOf("bot son of a bitch") !== -1 || msg.indexOf("soab bot") !== -1 || msg.indexOf("bot soab") !== -1 || msg.indexOf("son of a biatch bot") !== -1 || msg.indexOf("bot son of a biatch") !== -1){
                var FuckMsg = ["Nah.. Actually im the son of Bender.","What you just said you no-good, rat-bastard human, die in a fire. :)","< Test f*** >.. Sorry 0% f*** were given by me.","http://stream1.gifsoup.com/webroot/animatedgifs/980837_o.gif"];
                API.sendChat("@" + data.from + " " + FuckMsg[Math.floor(Math.random() * FuckMsg.length)]);
                    swagbot.misc.ready = false;
                    setTimeout(function(){ swagbot.misc.ready = true; }, swagbot.settings.cooldown * 1000);
                }
        }
        
    });

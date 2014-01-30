// BasicCommands
// @author Guichaguri

var BC_desc = 'Basic Commands for your Bot!<br><br>';
BC_desc += '<strong>Commands</strong><br><br>';
BC_desc += '<strong>!ban [user] [time in minutes]</strong> - Ban a user (If the bot turn off or reload, all bans will be removed)<br>';
BC_desc += '<strong>!kick [user]</strong> - Kick a user<br>';
BC_desc += '<strong>!mute [user] [seconds]</strong> - Mute a user<br>';
BC_desc += '<strong>!ping</strong> - Ping the Bot<br>';
BC_desc += '<strong>!say [message]</strong> - Says a message<br>';
BC_desc += '<strong>!autowoot</strong> - Toggle AutoWoot mode<br>';
BC_desc += '<strong>!link</strong> - Link for this music<br>';
BC_desc += '<strong>!lockskip</strong> - Skip the DJ and set the DJ to the position 3 on the waitlist<br>';
BC_desc += '<strong>!lastmsg [user]</strong> - Check the time of the last message from the user<br>';
BOT.setPluginInfos('Basic Commands', BC_desc, '1.0', 'Guichaguri');
BOT.setPluginStatus('Basic Commands', false);

BOT.addCommand('ban', cmdBan, API.ROLE.MANAGER);
BOT.addCommand('kick', cmdKick, API.ROLE.BOUNCER);
BOT.addCommand('mute', cmdMute, API.ROLE.BOUNCER);
BOT.addCommand('say', cmdSay, API.ROLE.MANAGER);
BOT.addCommand('ping', cmdPing, API.ROLE.BOUNCER);
BOT.addCommand('autowoot', cmdAutoWoot, API.ROLE.MANAGER);
BOT.addCommand('link', cmdLink, API.ROLE.NONE);
BOT.addCommand('lockskip', cmdLockskip, API.ROLE.MANAGER);
BOT.addCommand('lastmsg', cmdLastMsg, API.ROLE.BOUNCER);

BOT.setPluginStatus('Basic Commands', true);

function cmdLastMsg(args, user) {
    if(args.length == 0) return false;
    var u = BOT.getUserByName(args[0]);
    var time = BOT.INTERNAL.lastMessageTime[u['id']]; var current = new Date().getTime();
    var d = (current - time) / 1000; var t = 'seconds';
    if(d > 60) {d = d / 60; t = 'minutes'; if(d > 60) {d = d / 60; t = 'hours';} }
    if(d == 1) {t = t.substring(0, -1);}
    BOT.sendMessage('Last message from '+u['username']+' was ' + d + ' ' + t + ' ago', user);
}
function cmdBan(args, user) {
    if(args.length < 2) {return false;}
    var t = parseInt(args[1]);
    if(isNaN(t)) return true;
    var u = BOT.getUserByName(args[0]);
    if(u == null) {return true;}
    BOT.ban(u, user, t);
}
function cmdLockskip(args, user) {
    API.moderateForceSkip();
    BOT.sendMessage('Skipped the DJ, but the DJ will be relisted to position 3', user);
    BOT.relistUser(user, 3);
}
function cmdPing(args, user) {
    BOT.sendMessage('PONG!', user);
}
function cmdSay(args, user) {
    if(args.length == 0) {return false;}
    var a = ''; for(var i = 0; i < args.length; i++) {a += ' ' + args[i];}
    a = a.substring(1); BOT.sendMessage(a, user);
}
function cmdKick(args, user) {
    if(args.length == 0) {return false;}
    var u = BOT.getUserByName(args[0]);
    if(u == null) {return true;}
    BOT.kick(u, user);
}
function cmdMute(args, user) {
    if(args.length == 0) {return false;}
    var u = BOT.getUserByName(args[0]); var t = 15;
    if(u == null) {return true;}
    if(args.length > 1) {t = toint(args[1]); if(t == null) t = 15;}
    BOT.mute(u, user, t);
}
window['autowoot'] = null;
function cmdAutoWoot(args, user) {
    if(window['autowoot'] == null) {
        window['autowoot'] = setInterval(function(){$('#woot').click();}, 1000 * 10);
        BOT.registerInterval(window['autowoot']);
        BOT.sendMessage('Autowoot was turned on', user);
    } else {
        clearInterval(window['autowoot']); window['autowoot'] = null;
        BOT.sendMessage('Autowoot was turned off', user);
    }
}
function cmdLink(args, user) {
    var m = API.getMedia();
    if(isUndefined(m)) return true;
    if(m['format'] == 1) {
        BOT.sendMessage('Link of this music: http://youtu.be/' + m['cid'], user);
    }
}

// ChatManager
// @author Guichaguri

var ChatManager_desc = 'With this plugin, your bot will moderate the chat!<br>';
ChatManager_desc += '<strong>Features</strong><br><br>';
ChatManager_desc += 'The bot will kick afk users<br>';
ChatManager_desc += 'The bot will remove afk user from waitlist<br>';
ChatManager_desc += 'The bot will remove spam & empty messages<br>';
ChatManager_desc += 'The bot will remove flood messages<br>';
ChatManager_desc += 'The bot will remove messages with links<br>';
BOT.setPluginInfos('ChatManager', ChatManager_desc, '1.0', 'Guichaguri');
BOT.setPluginStatus('ChatManager', false);

var waitlistAfkMinutes = 45;
var afkMinutes = 90;
var afkCountdown = 5;
var afkAnounce = {};
var lastMessages = {};
var lastMsgTime = {};
BOT.registerInterval(setInterval(function(){syncAfk();}, 1000 * 30)); // 30 seconds
API.on(API.CHAT, chatManagerListener);

BOT.setPluginStatus('ChatManager', true);

function syncAfk() {
    var users = API.getUsers();
    var now = new Date().getTime();
    var afkMS = (afkMinutes * 60) * 1000;
    var afkWLMS = (waitlistAfkMinutes * 60) * 1000;
    var cdMS = (afkCountdown * 60) * 1000;
    for(var i = 0; i < users.length; i++) {
        var u = users[i];
        var l = BOT.INTERNAL.lastMessageTime[u['id']];
        if(isUndefined(l)) {BOT.INTERNAL.lastMessageTime[u['id']] = now;l = now;}
        if((API.getWaitListPosition(u['id']) != -1) && (l + afkWLMS < now)) {
            API.moderateRemoveDJ(u['id']);
        } else if(l + (afkMS + cdMS) < now) {
            BOT.kick(u, API.getUser());
        } else if(l + afkMS < now) {
            if(afkAnounce[u['id']] == false) {
                API.sendChat('@'+u['username']+' you are afk. Chat in '+afkCountdown+' minutes or I\'ll kick you.');
                afkAnounce[u['id']] = true;
            }
        } else {
            afkAnounce[u['id']] = false;
        }
    }
}

function validURL(str) {
    return new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]" +
            "+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?").test(str);
}

function chatManagerListener(d) {
    if(API.getUser(d['fromID'])['permission'] >= API.ROLE.RESIDENTDJ) return;
    var now = new Date().getTime();
    if(isUndefined(lastMessages[d['fromID']])) lastMessages[d['fromID']] = '';
    if(isUndefined(lastMsgTime[d['fromID']])) lastMsgTime[d['fromID']] = 0;
    if((lastMessages[d['fromID']] == d['message']) || (d['message'] == '')) {
        if(lastMsgTime[d['fromID']] > (now - (1000 * 15))) {
            API.moderateDeleteChat(d['chatID']);return;}
    }
    if(lastMsgTime[d['fromID']] > (now - (1000 * 1))) {
        API.moderateDeleteChat(d['chatID']);return;}
    var words = d['message'].split(' ');
    for(var i = 0; i < words.length; i++) {if(validURL(words[i])) {
            API.moderateDeleteChat(d['chatID']);return;}}
    lastMessages[d['fromID']] = d['message'];
    lastMsgTime[d['fromID']] = now;
}

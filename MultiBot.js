String.prototype.startsWith = function(str){return this.indexOf(str) == 0;};
String.prototype.replaceAll = function(from, to) {var str = this;
    while(str.indexOf(from) != -1) str = str.replace(from, to); return str;}
function isUndefined(obj) { return obj === void 0; };

var BOT = {
    registerTimer: function(t) {
        BOT.INTERNAL.timers[BOT.INTERNAL.timers.length] = t; return t;
    },
    registerInterval: function(t) {
        BOT.INTERNAL.intervals[BOT.INTERNAL.intervals.length] = t; return t;
    },
    registerJqueryEvent: function(e) {
        BOT.INTERNAL.jqueryEvents[BOT.INTERNAL.jqueryEvents.length] = e;
    },
    setPluginInfos: function(name, text, version, author, disable) {
        var s = $('.botplugin-' + name.replaceAll(' ', '-'));
        if(s.length <= 0) {
            BOT.INTERNAL.plugins[BOT.INTERNAL.plugins.length] = name;
            $('#botpanel').append('<div name="'+name.replaceAll(' ', '-')+'" onClick="BOT.INTERNAL.openBotInfo(this);" ' +
                    'class="botplugin-'+name.replaceAll(' ', '-')+' botButton off">'+name+' <span>v'+version+' by '+author+'</span></div>');
            $('#botpanel').append('<div class="botplugintxt-'+name.replaceAll(' ', '-')+'" style="display:none;">'+text+'</div>');
            return;
        } s.html(name+' <span>v'+version+' by '+author+'</span>');
        $('.botplugintxt-'+name.replaceAll(' ', '-')).html(text);
        if(!isUndefined(disable)) { if(BOT.INTERNAL.disable.indexOf(disable) == -1)
            BOT.INTERNAL.disable[BOT.INTERNAL.disable.length] = disable;}
    },
    setPluginStatus: function(name, status) {
        var s = $('.botplugin-' + name.replaceAll(' ', '-'));
        if(s.length <= 0) {
            BOT.INTERNAL.plugins[BOT.INTERNAL.plugins.length] = name;
            var c = 'on'; if(!status) c = 'off';
            $('#botpanel').append('<div name="'+name.replaceAll(' ', '-')+'" onClick="BOT.INTERNAL.openBotInfo(this);" ' +
                    'class="botplugin-'+name.replaceAll(' ', '-')+' botButton '+c+'">'+name+'</div>');
            $('#botpanel').append('<div class="botplugintxt-'+name.replaceAll(' ', '-')+'" style="display:none;">No Description Available</div>');
            return;
        }
        if(status) {s.addClass('on').removeClass('off');} else {s.addClass('off').removeClass('on');}
    },
    addCommand: function(name, call, defaultPerm) {
        var i = this.INTERNAL.cmdsNames.indexOf(name);
        if(i == -1) i = this.INTERNAL.cmdsNames.length;
        this.INTERNAL.cmdsNames[i] = name;
        this.INTERNAL.cmdsFunctions[i] = call;
        this.INTERNAL.cmdsPerms[i] = defaultPerm;
    },
    setPermission: function(command, permission) {
        var i = this.INTERNAL.cmdsNames.indexOf(command);
        if(i == -1) {
            i = this.INTERNAL.cmdsNames.length;
            this.INTERNAL.cmdsPerms[i] = command;
            this.INTERNAL.cmdsFunctions[i] = null;
        }
        this.INTERNAL.cmdsPerms[i] = permission;
    },
    chatCommand: function(cmd) {
        $('#chat-input-field').val(cmd);
        var e = jQuery.Event("keydown"); e.which = 13;
        $("#chat-input-field").trigger(e);
    },
    sendMessage: function(msg, toUser) {
        API.sendChat('[@' + toUser['username'] + '] ' + msg);
    },
    sendAlert: function(msg) {
        this.chatCommand('/me ' + msg);
    },
    getUserByName: function(name) {
        var users = API.getUsers(); if(name.substring(0, 1) == '@') name = name.substring(1);
        for(var i = 0; i < users.length; i++) {if(users[i]['username'].toLowerCase() == name) return users[i];}
        return null;
    },
    ban: function(user, by, minutes) {
        API.moderateBanUser(user['id'], 'Banned by Staff for '+minutes+' minutes', API.BAN.HOUR);
        BOT.INTERNAL.tempBans[user['id']] = new Date().getTime() + (1000 * 60 * minutes);
        sendMessage(user['username']+' was banned for '+minutes+' minutes', by); var id = user['id'];
        BOT.registerTimer(setTimeout(function(){this.INTERNAL.syncBanMute();}, (1000 * 60 * minutes) + 500));
    },
    kick: function(user, by) {
        API.moderateBanUser(user['id'], 'Kicked by Staff', API.BAN.HOUR);
        sendMessage(user['username'] + ' was kicked', by); var id = user['id'];
        BOT.registerTimer(setTimeout(function(){API.moderateUnbanUser(id);}, 1000 * 5));
    },
    mute: function(user, by, time) {
        this.INTERNAL.mutedUsers[user['id']] = new Date().getTime() + (1000 * time);
        sendMessage(user['username'] + ' was muted for ' + time + ' seconds', by);
        BOT.registerTimer(setTimeout(function(){this.INTERNAL.syncBanMute();}, (1000 * time) + 500));
    },
    relistUser: function(user, pos) {
        if(API.getWaitListPosition(user['id']) != -1) {API.moderateMoveDJ(user['id'], pos);return;}
        API.moderateLockWaitList(true, false);
        var i = this.INTERNAL.relistPos.length;
        this.INTERNAL.relistPos[i] = pos;
        this.INTERNAL.relistUsers[i] = user['id'];
        this.INTERNAL.syncRelist();
    },
    
    /* ******************************************** INTERNAL ******************************************** */
    
    INTERNAL: {
        inicialize: function() {
            if($('body').length == 0) {BOT.registerTimer(setTimeout(function(){inicializeBot();}, 10000));return;}
            $('body').css('background-image', 'none').css('background-color', '#E6E6E6');
            $('#room').css('box-shadow', 'inset 0px 0px 10px rgba(0, 0, 0, 0.5), inset 0px 0px 150px rgba(0, 0, 0, 0.25)');
            $('#room').css('font-family', '\'Open Sans\', sans-serif');
            
            $('#room #playback').remove(); $('#room #audience').remove(); $('#room #dj-booth').remove();
            $('#room canvas').remove(); $('#room *').hide();
            $('#room').append('<div id="botstatus" class="botelement">LOADING</div><div id="botpanel" class="botelement"></div>');
            $('#botstatus').css({padding: '10px', borderRadius: '5px', textAlign: 'center', fontSize: '60px',
                color: '#ffffff', boxShadow: 'inset 0px 0px 20px rgba(0, 0, 0, 0.1)', margin: '30px'});
            $('#botpanel').css({margin: '0px 30px 0px 30px', color: '#333333'});
            BOT.INTERNAL.setMode(false, 'LOADING');
            
            var bot = API.getUser();
            if(bot['permission'] < API.ROLE.MANAGER) {
                BOT.INTERNAL.setMode(false, 'NO PERMISSION');
                $('#botpanel').append('<strong>' + bot['username'] + ' needs to be a Manager</strong><br><div style="height: 100%;"></div>');
                return;
            }
            $('#room').css('overflow', 'auto');
            $('#botpanel').append('<div style="text-align:center;">PlugDJ v'+VERSION+' - MultiBot v'+BOT.INTERNAL.VERSION+' developed by Guichaguri.<br><strong>Plugins</strong></div><br>');
            $('#room').append('<div class="multibotinfo botelement" style="margin:30px;color:#333333;"><br><br><strong>Basic MultiBot Commands</strong><br><br><strong>!reload</strong> - Reload the Bot<br><strong>!plugins</strong> - List of Plugins</div>');
            $('#chat-input').prepend('<input type="text" name="cmd" id="chatcmd" style="position:absolute;top:7px;left:10px;font-family:Roboto,sans-serif;' +
                    'font-weight:400;font-size:12px;color:#EEE;background:transparent;width:305px;border:0;outline:0;" class="botelement" placeholder="Chat as the Bot">');
            $('#chat-input-field').hide();
            BOT.registerJqueryEvent($('#chatcmd').keydown(function(e) {
                if(e.which == 13) {BOT.chatCommand($(this).val());$(this).val('');}
            }));
            var css = '.botButton{display:inline-block;font-size:150%;color:#fff;border-radius:5px;margin:5px;padding:5px 10px 5px 10px;box-shadow:inset 0px 0px 20px rgba(0, 0, 0, 0.1);}';
            css += '.botButton.on{background:#32CD32;} .botButton.off{background:#CF0000;}.botButton span{font-size: 16px;}';
            $('body').append('<style class="botelement">' + css + '</style>');
            
           var users = API.getUsers(); for(var i = 0; i < users.length; i++)
                BOT.INTERNAL.allUsers[BOT.INTERNAL.allUsers.length] = users[i]['id'];
            
            API.on(API.USER_JOIN, BOT.INTERNAL.join);
            API.on(API.CHAT, BOT.INTERNAL.chat);
            API.on(API.WAIT_LIST_UPDATE, BOT.INTERNAL.waitlist);
            BOT.registerJqueryEvent($(window).bind('beforeunload', BOT.INTERNAL.close));

            // WAIT TO ENABLE ALL PLUGINS & MODULES
            BOT.sendAlert("I'm now running!"); BOT.INTERNAL.setMode(true);
        },
        close: function(e) {
            BOT.sendAlert("Bye, Bye!");
            console.log('Removing TempBans');
            var users = BOT.INTERNAL.allUsers;
            var bans = BOT.INTERNAL.tempBans;
            for(var i = 0; i < users.length; i++) {
                var id = users[i];
                if(!(isUndefined(bans[id]))) {
                    API.moderateUnbanUser(bans[id]); bans[id] = null;
                }
            }
            console.log('Disabling Plugins');
            var disable = BOT.INTERNAL.disable;
            for(var i = 0; i < disable.length; i++) {disable[i]();}
            console.log('Removing Timers');
            var intervals = BOT.INTERNAL.intervals;
            for(var i = 0; i < intervals.length; i++) {clearInterval(intervals[i]);}
            var timers = BOT.INTERNAL.timers;
            for(var i = 0; i < timers.length; i++) {clearTimeout(timers[i]);}
            console.log('Removing Interface Elements');
            $('.botelement').remove();
            console.log('Unhooking Events');
            var e = BOT.INTERNAL.plugDJEvents;
            for(var i = 0; i < e.length; i++) {
                var ev = API._events[e[i]]; if(!isUndefined(ev)) {
                for(var ii = 0; ii < ev.length; ii++) {API.off(e[i], ev[ii]['callback']);}}
            }
            var e = BOT.INTERNAL.jqueryEvents;
            for(var i = 0; i < e.length; i++) e[1].unbind();
        },
        setMode: function(i, msg) {
            if(i) {$('#botstatus').css('background', '#32CD32').html('MULTIBOT<br><small style="display:block;font-size:16px;">WORKING</small>');} else {
                $('#botstatus').css('background', '#CF0000').html(msg.toUpperCase() + '<br><small style="display:block;font-size:16px;">MULTIBOT</small>');}
        },
        openBotInfo: function(e) {
            var el = $(e); var n = el.attr('name');
            var el2 = $('#botpanel .botplugintxt-' + n);
            if(el2.is(':visible')) {
                setTimeout(function(){$('#botpanel .botButton').each(function(){
                    if($(this).attr('name') != n) $(this).show(500);
                });}, 500); el2.hide(500);
            } else {
                $('#botpanel .botButton').each(function(){
                    if($(this).attr('name') != n) $(this).hide(500);
                }); BOT.registerTimer(setTimeout(function(){el2.show(500)}, 500));
            }
        },
        syncBanMute: function() {
            var users = BOT.INTERNAL.allUsers;
            var bans = BOT.INTERNAL.tempBans;
            var mutes = BOT.INTERNAL.mutedUsers;
            var t = new Date().getTime();
            for(var i = 0; i < users.length; i++) {
                var id = users[i];
                if((!(isUndefined(bans[id]))) && (bans[id] != null)) {
                    if(bans[id] <= t) {API.moderateUnbanUser(bans[id]); bans[id] = null;}
                }
                if((!(isUndefined(mutes[id]))) && (mutes[id] != null)) {
                    if(mutes[id] <= t) mutes[id] = null;
                }
            }
        },
        syncRelist: function() {
            if(BOT.INTERNAL.relistPos.length == 0) return;
            if(API.getWaitList().length >= 50) {API.moderateLockWaitList(true, false);return;}
            API.moderateMoveDJ(BOT.INTERNAL.relistUsers[0], BOT.INTERNAL.relistPos[0]);
            BOT.INTERNAL.relistPos.splice(0, 1); BOT.INTERNAL.relistUsers.splice(0, 1);
            if(BOT.INTERNAL.relistPos.length == 0) {API.moderateLockWaitList(false, false);
            } else {API.moderateLockWaitList(true, false);}
        },
        waitlist: function(users) {
            BOT.INTERNAL.syncRelist();
        },
        chat: function(args) {
            var msg = (args.message).toLowerCase();
            var sender = API.getUser(args.fromID);
            var mute = BOT.INTERNAL.mutedUsers[sender['id']];
            if((!(isUndefined(mute))) && (mute != null)) {
                API.moderateDeleteChat(args.chatID);BOT.INTERNAL.syncBanMute();return;}
            BOT.INTERNAL.lastMessageId[sender['id']] = args.chatID;
            BOT.INTERNAL.lastMessageTime[sender['id']] = new Date().getTime();
            if(msg.substring(0, 1) == '!') {
                var i = msg.indexOf(' '); if(i == -1) i = msg.length; var argsCmd = msg.substring(i).split(' ');
                if(argsCmd[0] == '') argsCmd.splice(0, 1);
                if(BOT.INTERNAL.command(msg.substring(1, i), argsCmd, sender))
                    {API.moderateDeleteChat(args.chatID);return;}
            }
        },
        command: function(cmd, args, user) {
            var i = BOT.INTERNAL.cmdsNames.indexOf(cmd);
            if(i == -1) return false;
            if(user['id']['permission'] < BOT.INTERNAL.cmdsPerms[i]) return false;
            if(BOT.INTERNAL.cmdsFunctions[i](args, user) === false) return false;
            return true;
        },
        join: function(user) {
            if(BOT.INTERNAL.allUsers.indexOf(user['id']) == -1)
                BOT.INTERNAL.allUsers[BOT.INTERNAL.allUsers.length] = user['id'];
        },
        cmdsNames: [], cmdsFunctions: [], cmdsPerms: [],
        allUsers: [],
        lastMessageId: {}, lastMessageTime: {}, mutedUsers: {},
        relistPos: [], relistUsers: [],
        tempBans: {},
        timers: [], intervals: [],
        plugins: [],
        disable: [],
        jqueryEvents: [],
        plugDJEvents: [API.CHAT, API.USER_SKIP, API.USER_JOIN, API.USER_LEAVE, API.USER_FAN, API.FRIEND_JOIN,
                       API.FAN_JOIN, API.VOTE_UPDATE, API.CURATE_UPDATE, API.ROOM_SCORE_UPDATE, API.DJ_ADVANCE,
                       API.DJ_UPDATE, API.WAIT_LIST_UPDATE, API.VOTE_SKIP, API.MOD_SKIP, API.CHAT_COMMAND,
                       API.HISTORY_UPDATE],
        VERSION: '1.0'
    }

};

BOT.INTERNAL.inicialize();

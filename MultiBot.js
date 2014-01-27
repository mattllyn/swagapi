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

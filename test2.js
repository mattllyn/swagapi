(function () {
    var f, voteSkipCommand, Command, RoomHelper, User, afkCheck, afksCommand, announceCurate, antispam, apiHooks, beggar, chatCommandDispatcher, chatUniversals, cmds, commandsCommand, data, dieCommand, handleNewSong, handleUserJoin, handleUserLeave, andleVote, hook, initEnvironment, initHooks, initialize, msToStr, populateUserData, pupOnline, settings, skipCommand, undoHooks, unhook, updateVotes, voteRatioCommand, _refBotTancuj, _ref, _ref1, _ref10, _ref11, _ref12, _ref13, _ref14, _ref15, _autowoot, _ref16, _ref17, _votekickCommand, _ref19, _ref2, _ref20, _ref21, _ref22, _ref23, _ref24, _ref25, _ref26, _ref27, _ref28, _ref29, _ref3, _ref30, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9, __bind = function (a, b) {
            return function () {
                return a.apply(b, arguments)
            }
        }, __indexOf = [].indexOf || function (a) {
            for (var i = 0, l = this.length; i < l; i++) {
                if (i in this && this[i] === a) return i
            }
            return -1
        }, __hasProp = {}.hasOwnProperty,
        __extends = function (a, b) {
            for (var c in b) {
                if (__hasProp.call(b, c)) a[c] = b[c]
            }

            function ctor() {
                this.constructor = a
            }
            ctor.prototype = b.prototype;
            a.prototype = new ctor();
            a.__super__ = b.prototype;
            return a
        };
    settings = (function () {
        function settings() {
            this.implode = __bind(this.implode, this);
            this.intervalMessages = __bind(this.intervalMessages, this);
            this.startAfkInterval = __bind(this.startAfkInterval, this);
            this.setInternalWaitlist = __bind(this.setInternalWaitlist, this);
            this.userJoin = __bind(this.userJoin, this);
            this.getRoomUrlPath = __bind(this.getRoomUrlPath, this);
            this.startup = __bind(this.startup, this)
        }
        settings.prototype.currentsong = {};
        settings.prototype.users = {};
        settings.prototype.djs = [];
        settings.prototype.mods = [];
        settings.prototype.host = [];
        settings.prototype.hasWarned = false;
        settings.prototype.currentwoots = 0;
        settings.prototype.currentmehs = 0;
        settings.prototype.currentcurates = 0;
        settings.prototype.roomUrlPath = null;
        settings.prototype.skipVotes = 0;
        settings.prototype.internalWaitlist = [];
        settings.prototype.userDisconnectLog = [];
        settings.prototype.voteLog = {};
        settings.prototype.seshOn = false;
        settings.prototype.forceSkip = false;
        settings.prototype.seshMembers = [];
        settings.prototype.launchTime = null;
        settings.prototype.totalVotingData = {
            woots: 0,
            mehs: 0,
            curates: 0
        };
        
        settings.prototype.songCount = 0;
        settings.prototype.startup = function () {
            this.launchTime = new Date();
            return this.roomUrlPath = this.getRoomUrlPath()
        };
        settings.prototype.getRoomUrlPath = function () {
            return window.location.pathname.replace(/\//g, '')
        };
        settings.prototype.newSong = function () {
            this.totalVotingData.woots += data.currentwoots;
            this.totalVotingData.mehs += data.currentmehs;
            this.totalVotingData.curates += data.currentcurates;
            this.setInternalWaitlist();
            this.currentsong = API.getMedia();
            if (this.currentsong !== null) {
                return this.currentsong
            } else {
                return false
            }
        };
        settings.prototype.userJoin = function (u) {
            var a, _ref;
            a = Object.keys(this.users);
            if (_ref = u.id && __indexOf.call(a, _ref) >= 0) {
                return this.users[u.id].inRoom(true)
            } else {
                this.users[u.id] = new User(u);
                return this.voteLog[u.id] = {}
            }
        };
        settings.prototype.setInternalWaitlist = function () {
            var a, fullWaitList, lineWaitList;
            a = ['' + API.getDJ() + ''];
            lineWaitList = API.getWaitList();
            fullWaitList = a.concat(lineWaitList);
            return this.internalWaitlist = fullWaitList
        };
        settings.prototype.activity = function (a) {
            if (a.type === 'message') {
                return this.users[a.fromID].updateActivity()
            }
        };
        settings.prototype.startAfkInterval = function () {
            return this.afkInterval = setInterval(afkCheck, 2000)
        };
        settings.prototype.intervalMessages = function () {
            var a, _i, _len, _ref, _results;
            this.songCount++;
            _ref = this.songIntervalMessages;
            _results = [];
            for (_i = 0; _i < _ref.length; _i++) {
                a = _ref[_i];
                if (((this.songCount + a['offset']) % a['interval']) === 0) {
                    _results.push(API.sendChat(a['msg']))
                } else {
                    _results.push(void 0)
                }
            }
            return _results
        };
        settings.prototype.implode = function () {
            var a, val;
            for (a in this) {
                val = this[a];
                if (typeof this[a] === 'object') {
                    delete this[a]
                }
            }
            return clearInterval(this.afkInterval)
        };
        settings.prototype.lockBooth = function (a) {
            if (a == null) {
                a = null
            }
            return $.ajax({
                url: "http://plug.dj/_/gateway/room.update_options",
                type: 'POST',
                data: JSON.stringify({
                    service: "room.update_options",
                    body: [this.roomUrlPath, {
                        "boothLocked": true,
                        "waitListEnabled": true,
                        "maxPlays": 1,
                        "maxDJs": 5
                    }]
                }),
                async: this.async,
                dataType: 'json',
                contentType: 'application/json'
            }).done(function () {
                if (a != null) {
                    return a()
                }
            })
        };
        settings.prototype.unlockBooth = function (a) {
            if (a == null) {
                a = null
            }
            return $.ajax({
                url: "http://plug.dj/_/gateway/room.update_options",
                type: 'POST',
                data: JSON.stringify({
                    service: "room.update_options",
                    body: [this.roomUrlPath, {
                        "boothLocked": false,
                        "waitListEnabled": true,
                        "maxPlays": 1,
                        "maxDJs": 50
                    }]
                }),
                async: this.async,
                dataType: 'json',
                contentType: 'application/json'
            }).done(function () {
                if (a != null) {
                    return a()
                }
            })
        };
        return settings
    })();
    data = new settings();
    User = (function () {
        User.prototype.afkWarningCount = 0;
        User.prototype.lastWarning = null;
        User.prototype["protected"] = false;
        User.prototype.isInRoom = true;

        function User(a) {
            this.user = a;
            this.updateVote = __bind(this.updateVote, this);
            this.inRoom = __bind(this.inRoom, this);
            this.notDj = __bind(this.notDj, this);
            this.warn = __bind(this.warn, this);
            this.getIsDj = __bind(this.getIsDj, this);
            this.getWarningCount = __bind(this.getWarningCount, this);
            this.getUser = __bind(this.getUser, this);
            this.getLastWarning = __bind(this.getLastWarning, this);
            this.getLastActivity = __bind(this.getLastActivity, this);
            this.updateActivity = __bind(this.updateActivity, this);
            this.init = __bind(this.init, this);
            this.init()
        }
        User.prototype.init = function () {
            return this.lastActivity = new Date()
        };
        User.prototype.updateActivity = function () {
            this.lastActivity = new Date();
            this.afkWarningCount = 0;
            return this.lastWarning = null
        };
        User.prototype.getLastActivity = function () {
            return this.lastActivity
        };
        User.prototype.getLastWarning = function () {
            if (this.lastWarning === null) {
                return false
            } else {
                return this.lastWarning
            }
        };
        User.prototype.getUser = function () {
            return this.user
        };
        User.prototype.getWarningCount = function () {
            return this.afkWarningCount
        };
        User.prototype.getIsDj = function () {
            var a, dj;
            a = API.getDJ();
            if (this.user.id === a.id) {
                return true
            }
            return false
        };
        User.prototype.warn = function () {
            this.afkWarningCount++;
            return this.lastWarning = new Date()
        };
        User.prototype.notDj = function () {
            this.afkWarningCount = 0;
            return this.lastWarning = null
        };
        User.prototype.inRoom = function (a) {
            return this.isInRoom = a
        };
        User.prototype.updateVote = function (v) {
            if (this.isInRoom) {
                return data.voteLog[this.user.id][data.currentsong.id] = v
            }
        };
        return User
    })();
    RoomHelper = (function () {
        function RoomHelper() {}
        RoomHelper.prototype.lookupUser = function (a) {
            var b, u, _ref;
            _ref = data.users;
            for (b in _ref) {
                u = _ref[b];
                if (u.getUser().username === a) {
                    return u.getUser()
                }
            }
            return false
        };
        RoomHelper.prototype.userVoteRatio = function (a) {
            var b, songVotes, vote, votes;
            songVotes = data.voteLog[a.id];
            votes = {
                'woot': 0,
                'meh': 0
            };
            for (b in songVotes) {
                vote = songVotes[b];
                if (vote === 1) {
                    votes['woot']++
                } else if (vote === -1) {
                    votes['meh']++
                }
            }
            votes['positiveRatio'] = (votes['woot'] / (votes['woot'] + votes['meh'])).toFixed(2);
            return votes
        };
        return RoomHelper
    })();
    pupOnline = function () {
        return API.sendChat('Bot is active :+1:')
    };
    populateUserData = function () {
        var u, users, _i, _len;
        users = API.getUsers();
        for (_i = 0; _i < users.length; _i++) {
            u = users[_i];
            data.users[u.id] = new User(u);
            data.voteLog[u.id] = {}
        }
    };
    initEnvironment = function () {};
    initialize = function () {
        pupOnline();
        populateUserData();
        initEnvironment();
        initHooks();
        data.startup();
        data.newSong();
        return data.startAfkInterval()
    };
    afkCheck = function () {
        var a, id, lastActivity, lastWarned, now, oneMinute, secsLastActive, timeSinceLastActivity, timeSinceLastWarning, twoMinutes, user, warnMsg, _ref, _results;
        _ref = data.users;
        _results = [];
        for (id in _ref) {
            user = _ref[id];
            now = new Date();
            lastActivity = user.getLastActivity();
            timeSinceLastActivity = now.getTime() - lastActivity.getTime();
            if (timeSinceLastActivity > data.afkTime) {
                if (user.getIsDj()) {
                    secsLastActive = timeSinceLastActivity / 1000;
                    if (user.getWarningCount() === 0) {
                        user.warn()
                    } else if (user.getWarningCount() === 1) {
                        lastWarned = user.getLastWarning();
                        timeSinceLastWarning = now.getTime() - lastWarned.getTime();
                        twoMinutes = 2 * 60 * 1000;
                        if (timeSinceLastWarning > twoMinutes) {
                            user.warn();
                            _results.push(API.sendChat(warnMsg))
                        } else {
                            _results.push(void 0)
                        }
                    } else if (user.getWarningCount() === 2) {
                        lastWarned = user.getLastWarning();
                        timeSinceLastWarning = now.getTime() - lastWarned.getTime();
                        oneMinute = 1 * 60 * 1000;
                        if (timeSinceLastWarning > oneMinute) {
                            a = API.getDJ();
                            if (a.id !== user.getUser().id) {
                                API.sendChat("DJ \"" + user.getUser().username + "\" is AFK!");
                                _results.push(user.warn())
                            } else {
                                _results.push(void 0)
                            }
                        } else {
                            _results.push(void 0)
                        }
                    } else {
                        _results.push(void 0)
                    }
                } else {
                    _results.push(user.notDj())
                }
            } else {
                _results.push(void 0)
            }
        }
        return _results
    };
    msToStr = function (a) {
        var b, msg, timeAway;
        msg = '';
        timeAway = {
            'days': 0,
            'hours': 0,
            'minutes': 0,
            'seconds': 0
        };
        b = {
            'day': 24 * 60 * 60 * 1000,
            'hour': 60 * 60 * 1000,
            'minute': 60 * 1000,
            'second': 1000
        };
        if (a > b['day']) {
            timeAway['days'] = Math.floor(a / b['day']);
            a = a % b['day']
        }
        if (a > b['hour']) {
            timeAway['hours'] = Math.floor(a / b['hour']);
            a = a % b['hour']
        }
        if (a > b['minute']) {
            timeAway['minutes'] = Math.floor(a / b['minute']);
            a = a % b['minute']
        }
        if (a > b['second']) {
            timeAway['seconds'] = Math.floor(a / b['second'])
        }
        if (timeAway['days'] !== 0) {
            msg += timeAway['days'].toString() + 'd'
        }
        if (timeAway['hours'] !== 0) {
            msg += timeAway['hours'].toString() + 'h'
        }
        if (timeAway['minutes'] !== 0) {
            msg += timeAway['minutes'].toString() + 'm'
        }
        if (timeAway['seconds'] !== 0) {
            msg += timeAway['seconds'].toString() + 's'
        }
        if (msg !== '') {
            return msg
        } else {
            return false
        }
    };
    Command = (function () {
        function Command(a) {
            this.msgData = a;
            this.init()
        }
        Command.prototype.init = function () {
            this.parseType = null;
            this.command = null;
            return this.rankPrivelege = null
        };
        Command.prototype.functionality = function (a) {};
        Command.prototype.hasPrivelege = function () {
            var a;
            a = data.users[this.msgData.fromID].getUser();
            switch (this.rankPrivelege) {
            case 'host':
                return a.permission === 5;
            case 'cohost':
                return a.permission >= 4;
            case 'mod':
                return a.permission >= 3;
            case 'manager':
                return a.permission >= 3;
            case 'bouncer':
                return a.permission >= 2;
            case 'featured':
                return a.permission >= 1;
            default:
                return true
            }
        };
        Command.prototype.commandMatch = function () {
            var a, msg, _i, _len, _ref;
            msg = this.msgData.message;
            if (typeof this.command === 'string') {
                if (this.parseType === 'exact') {
                    if (msg === this.command) {
                        return true
                    } else {
                        return false
                    }
                } else if (this.parseType === 'startsWith') {
                    if (msg.substr(0, this.command.length) === this.command) {
                        return true
                    } else {
                        return false
                    }
                } else if (this.parseType === 'contains') {
                    if (msg.indexOf(this.command) !== -1) {
                        return true
                    } else {
                        return false
                    }
                }
            } else if (typeof this.command === 'object') {
                _ref = this.command;
                for (_i = 0; _i < _ref.length; _i++) {
                    a = _ref[_i];
                    if (this.parseType === 'exact') {
                        if (msg === a) {
                            return true
                        }
                    } else if (this.parseType === 'startsWith') {
                        if (msg.substr(0, a.length) === a) {
                            return true
                        }
                    } else if (this.parseType === 'contains') {
                        if (msg.indexOf(a) !== -1) {
                            return true
                        }
                    }
                }
                return false
            }
        };
        Command.prototype.evalMsg = function () {
            if (this.commandMatch() && this.hasPrivelege()) {
                this.functionality();
                return true
            } else {
                return false
            }
        };
        return Command
    })();
    afksCommand = (function (b) {
        __extends(afksCommand, b);

        function afksCommand() {
            _ref10 = afksCommand.__super__.constructor.apply(this, arguments);
            return _ref10
        }
        afksCommand.prototype.init = function () {
            this.command = '!afks';
            this.parseType = 'exact';
            return this.rankPrivelege = 'user'
        };
        afksCommand.prototype.functionality = function () {
            var a, djAfk, djs, msg, now, _i, _len;
            msg = '';
            djs = API.getDJ();
            a = djs;
            now = new Date();
            djAfk = now.getTime() - data.users[a.id].getLastActivity().getTime();
            if (djAfk > (5 * 60 * 1000)) {
                if (msToStr(djAfk) !== false) {
                    msg += a.username + ' - ' + msToStr(djAfk);
                    msg += '. '
                }
            }
            if (msg === '') {
                return API.sendChat("All DJs are here!")
            } else {
                return API.sendChat('AFK DJs: ' + msg)
            }
        };
        return afksCommand
    })(Command);
    dieCommand = (function (a) {
        __extends(dieCommand, a);

        function dieCommand() {
            _ref14 = dieCommand.__super__.constructor.apply(this, arguments);
            return _ref14
        }
        dieCommand.prototype.init = function () {
            this.command = '!die';
            this.parseType = 'exact';
            return this.rankPrivelege = 'cohost'
        };
        dieCommand.prototype.functionality = function () {
            undoHooks();
            data.implode();
            return API.sendChat('Bot is now OFFLINE!')
        };
        return dieCommand
    })(Command);
    f = (function (c) {
        __extends(f, c);

        function f() {
            _votekickCommand = f.__super__.constructor.apply(this, arguments);
            return _votekickCommand
        }
        f.prototype.init = function () {
            this.command = '!ban';
            this.parseType = 'startsWith';
            return this.rankPrivelege = 'cohost'
        };
        f.prototype.functionality = function () {
            var a, r, users, votekickNastavit, votekickKoho, votekickDovod;
            a = this.msgData.message;
            votekickNastavit = a.split(' ');
            votekickKoho = votekickNastavit[1];
            votekickDovod = votekickNastavit[2];
            r = new RoomHelper();
            votekickKoho = votekickKoho.replace("@", "");
            userRemove = r.lookupUser(votekickKoho);
            if (userRemove === false) {
                API.sendChat("BAN USAGE: !ban @UserName")
            } else {
                for (_kickus = 0; _kickus < API.getUsers().length; _kickus++) {
                    if (API.getUsers()[_kickus].username === votekickKoho) {
                        var b = API.getUsers()[_kickus].id
                    }
                }
                API.sendChat("@" + votekickKoho + " good bye!");
                setTimeout(function () {
                    API.moderateBanUser(b, "lama")
                }, 1000)
            }
        };
        return f
    })(Command);
    skipCommand = (function (a) {
        __extends(skipCommand, a);

        function skipCommand() {
            _ref25 = skipCommand.__super__.constructor.apply(this, arguments);
            return _ref25
        }
        skipCommand.prototype.init = function () {
            this.command = '!skip';
            this.parseType = 'startsWith';
            return this.rankPrivelege = 'cohost'
        };
        skipCommand.prototype.functionality = function () {
            return API.moderateForceSkip()
        };
        return skipCommand
    })(Command);
    commandsCommand = (function (b) {
        __extends(commandsCommand, b);

        function commandsCommand() {
            _ref27 = commandsCommand.__super__.constructor.apply(this, arguments);
            return _ref27
        }
        commandsCommand.prototype.init = function () {
            this.command = '!help';
            this.parseType = 'exact';
            return this.rankPrivelege = 'user'
        };
        commandsCommand.prototype.functionality = function () {
            var a, c, cc, cmd, msg, user, _i, _j, _len, _len1, _ref28, _ref29;
            a = [];
            user = API.getUser(this.msgData.fromID);
            window.capturedUser = user;
            if (user.permission > 5) {
                a = ['user', 'mod', 'host', 'cohost']
            } else if (user.permission > 2) {
                a = ['user', 'mod', 'cohost']
            } else {
                a = ['user']
            }
            msg = '';
            for (_i = 0; _i < cmds.length; _i++) {
                cmd = cmds[_i];
                c = new cmd('');
                if (__indexOf.call(a, c.rankPrivelege) >= 0) {
                    if (typeof c.command === "string") {
                        msg += c.command + ', '
                    } else if (typeof c.command === "object") {
                        _ref29 = c.command;
                        for (_j = 0; _j < _ref29.length; _j++) {
                            cc = _ref29[_j];
                            msg += cc + ', '
                        }
                    }
                }
            }
            msg = msg.substring(0, msg.length - 2);
            return API.sendChat(msg)
        };
        return commandsCommand
    })(Command);
    cmds = [f, afksCommand, skipCommand, dieCommand, commandsCommand];
    chatCommandDispatcher = function (a) {
        var c, cmd, _i, _len, _results;
        chatUniversals(a);
        _results = [];
        for (_i = 0; _i < cmds.length; _i++) {
            cmd = cmds[_i];
            c = new cmd(a);
            if (c.evalMsg()) {
                break
            } else {
                _results.push(void 0)
            }
        }
        return _results
    };
    updateVotes = function (a) {
        data.currentwoots = a.positive;
        data.currentmehs = a.negative;
        data.currentcurates = a.curates
    };
    
    handleNewSong = function (b) {
        var c;
        data.intervalMessages();
        if (data.currentsong === null) {
            data.newSong()
        } else {
            data.newSong();
            var d = 0;
            var e = 0
        } if (data.forceSkip) {
            c = b.media.id;
            return setTimeout(function () {
                var a;
                a = API.getMedia();
                if (a.id === c) {
                    return API.moderateForceSkip()
                }
            }, b.media.duration * 1000)
        }
    };
    handleVote = function (a) {
        var b = b++;
        data.users[a.user.id].updateActivity();
        return data.users[a.user.id].updateVote(a.vote)
    };
    handleUserLeave = function (a) {
        var b, i, u, _i, _len, _ref31;
        b = {
            id: a.id,
            time: new Date(),
            songCount: data.songCount
        };
        i = 0;
        _ref31 = data.internalWaitlist;
        for (_i = 0; _i < _ref31.length; _i++) {
            u = _ref31[_i];
            if (u.id === a.id) {
                b['waitlistPosition'] = i - 1;
                data.setInternalWaitlist();
                break
            } else {
                i++
            }
        }
        data.userDisconnectLog.push(b);
        return data.users[a.id].inRoom(false)
    };
    antispam = function (a) {
        var b, sender;
        b = /(\bhttps?:\/\/(www.)?plug\.dj[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        plugRoomLinkPatt2 = /(\b(www.)?plug\.dj[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        if ((b.exec(a.message)) || (plugRoomLinkPatt2.exec(a.message))) {
            sender = API.getUser(a.fromID);
            if (!sender.ambassador && !sender.moderator && !sender.owner && !sender.superuser) {
                if (!data.users[a.fromID]["protected"]) {
                    API.sendChat("Spam detected!");
                    return API.moderateDeleteChat(a.chatID)
                } else {
                    return API.sendChat("huh...")
                }
            }
        }
    };
    beggar = function (a) {
        var b, r, responses;
        b = a.message.toLowerCase()
    };
    chatUniversals = function (a) {
        data.activity(a);
        antispam(a);
        return beggar(a)
    };
    hook = function (a, b) {
        return API.on(a, b)
    };
    unhook = function (a, b) {
        return API.off(a, b)
    };
    apiHooks = [{
        'event': API.ROOM_SCORE_UPDATE,
        'callback': updateVotes
    }, {
        'event': API.CURATE_UPDATE,
        'callback': announceCurate
    }, {
        'event': API.USER_JOIN,
        'callback': handleUserJoin
    }, {
        'event': API.DJ_ADVANCE,
        'callback': handleNewSong
    }, {
        'event': API.VOTE_UPDATE,
        'callback': handleVote
    }, {
        'event': API.CHAT,
        'callback': chatCommandDispatcher
    }, {
        'event': API.USER_LEAVE,
        'callback': handleUserLeave
    }];
    initHooks = function () {
        var a, _i, _len, _results;
        _results = [];
        for (_i = 0; _i < apiHooks.length; _i++) {
            a = apiHooks[_i];
            _results.push(hook(a['event'], a['callback']))
        }
        return _results
    };
    undoHooks = function () {
        var a, _i, _len, _results;
        _results = [];
        for (_i = 0; _i < apiHooks.length; _i++) {
            a = apiHooks[_i];
            _results.push(unhook(a['event'], a['callback']))
        }
        return _results
    };
    initialize()
}).call(this);

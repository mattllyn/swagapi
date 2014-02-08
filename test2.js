(function() {
	var Settings = function() {
		this.bot = API.getUser();
		this.botSrc = 'wip';
		this.room = window.location.pathname.split('/')[1];
		this.motd = ['wip'];
		this.init = function() {
			var u, user, i;
			u = API.getUsers();
			for (i = 0; i < u.length; i++) {
				user = u[i];
				this.users[user.id] = new User(user);
			}
			this.newSong();
			this.setWaitList();
			this.afkInterval = setInterval(afkCheck, 30000);
			this.opInterval = setInterval(opPrint, 7200000);
			this.motdInterval = setInterval(motdPrint, 3000000);
			this.pass = 0;
			this.added = 0;
			return API.sendChat('');
		
		};
		this.kill = function() {
			
			var target;
			for (target in this) {  
				if (typeof this[target] === 'object') {  
					delete this[target];  
					delete this[target];  
				}  
			}
			clearInterval(this.afkInterval);
			clearInterval(this.motdInterval);
			clearInterval(this.opInterval);
			return API.sendChat('');
			
		};
		this.showSongStats = false;
		this.songsPlayed = 0;
		this.woots = null;
		this.mehs = null;
		this.curates = null;
		this.newSong = function() {
			this.songsPlayed++;
			this.song = API.getMedia();
			if (!this.song) {
				return false;
			} else {
				return this.song;
			}
			
		};
		this.afkRemover = true;
		this.autoSkip = false;
		this.afkTime = 5400000;
		this.setWaitList = function() {
			var boothList, waitList, wholeWaitList;
			boothList = API.getDJ();
			waitList = API.getWaitList();
			wholeWaitList = [];
			return wholeWaitList.concat(boothList, waitList);
		};
		this.users = {};
		this.userJoin = function(u) {
			var keys, i;
			keys = Object.keys(this.users);
			for (i = 0; i < keys.length; i++) {
				if (keys[i] === u.id) {
					return this.users[u.id].room = true;
				}
			}
			return this.users[u.id] = new User(u);
			
		};
		return true;
	};
	var data = new Settings();
	var User = function(u) {
		this.user = u;
		this.room = true;
		this.dclog = [];
		this.lastActivity = new Date();
		this.afkWarnings = 0;
		return true;
	};
	var Command = function(cData) {
		this.cData = cData;
		this.checkPriv = function() {
			var userPriv;
			userPriv = API.getUser(this.cData.fromID).permission;
			if (this.priv === 'host') {
				if (userPriv >= 4) { return true; }
			} else if (this.priv === 'manager') {
				if (userPriv >= 3) { return true; }
			} else if (this.priv === 'bouncer') {
				if (userPriv >= 2) { return true; }
			} else if (this.priv === 'feat.DJ') {
				if (userPriv >= 1) { return true; }
			} else if (this.priv === 'user') {
				if (userPriv >= 0) { return true; }
			}
			
		};
		this.checkType = function() {
			var type, msg, c, i;
			type = this.type;
			msg = this.cData.message;
			if (typeof this.cmd === 'string') {
				if (type === 'exact') {
					if (this.cmd === msg) { return true; }
				} else if (type === 'starts') {
					if (msg.substr(0, this.cmd.length) === this.cmd) { return true; }
				} else if (type === 'contains') {
					if (msg.indexOf(this.cmd) !== -1) { return true; }
				}
			} else if (typeof this.cmd === 'object') {
				for (i = 0; i < this.cmd.length; i++) {
					c = this.cmd[i];
					if (type === 'exact') {
						if (c === msg) { return true; }
					} else if (type === 'starts') {
						if (msg.substr(0, c.length) === c) { return true; }
					} else if (type === 'contains') {
						if (msg.indexOf(c) !== -1) { return true; }
					}
				}
			}
		
		};
		this.checkCommand = function() {
			if (this.checkPriv() && this.checkType()) {
				return this.functionality();
			}
		};
		return true;
	};
	var dcLookUpCommand = function() {
		this.cmd = '!dclookup';
		this.priv = 'bouncer';
		this.type = 'starts';
		this.functionality = function() {
			var msg, name, id, dcId, dcLog, i, resp, recentDc, dcSongsAgo;
			msg = this.cData.message;
			name = msg.substr(11);
			for (id in data.users) {
				if (data.users[id].user.username === name) {
					dcId = id;
					dcLog = data.users[dcId].dclog;
					if (dcLog.length > 0) {
						resp = name + ' has disconnect ' + dcLog.length.toString() + ' time(s) ';
						recentDc = dcLog.pop();
						dcSongsAgo = data.songsPlayed - recentDc.songsPlayed;
						resp += 'Recent disconnect was ' + dcSongsAgo + ' song(s) ago. ';
						if (typeof recentDc.waitPosition !== 'undefined') {
							resp += 'Was ' + recentDc.waitPosition + ' song(s) away from the DJ booth.';
						} else {
							resp += 'Was not on the waitlist / booth.';
						}
						return API.sendChat(resp);
					} else {
						return API.sendChat('I haven\'t seen ' + name + ' disconnect.');
					}
				}
			}
			return API.sendChat('I can\'t see user with the name \'' + name + '\'.');
		};
		return Command.apply(this, arguments);
	};
	var lockCommand = function() {
		this.cmd = ['!lock', '!unlock'];
		this.priv = 'bouncer';
		this.type = 'exact';
		this.functionality = function() {
			var message;
			message = this.cData.message;
			if (message === '!lock') {
				return API.moderateRoomProps(true, true);
			} else if (message === '!unlock') {
				return API.moderateRoomProps(false, true);  
			}
		};
		return Command.apply(this, arguments);
	};
	var songStatsCommand = function() {
		this.cmd = '!stats';
		this.priv = 'bouncer';
		this.type = 'exact';
		this.functionality = function() {
			if (data.showSongStats) {
				API.sendChat('Song Stats disabled.');
				return data.showSongStats = false;
			} else {
				API.sendChat('Song Stats enabled.');
				return data.showSongStats = true;
			}
		};
		return Command.apply(this, arguments);
	};
	var motdCommand = function() {
		this.cmd = '!motd';
		this.priv = 'bouncer';
		this.type = 'starts';
		this.functionality = function() {
			var msg, motd;
			msg = this.cData.message;
			motd = msg.substr(6);
			if (msg.length > 6 && motd !== 'clear') {
				API.sendChat('motd added: "' + motd + '"');
				data.added = data.added + 1;
				return data.motd.unshift(motd);
			}
			if (msg.length > 6 && motd === 'clear' && data.added > 0) {
				API.sendChat('none default motd\'s cleared');
				data.added = 0;
				return data.motd.splice(0, data.added);
			}
			if (msg.length > 6 && motd === 'clear' && data.added == 0) {
				return API.sendChat('nothing to clear');
			}
			if (msg === this.cmd) {
				return false;
			}
		};
		return Command.apply(this, arguments);
	};
	var staffCommand = function() {
		this.cmd = '!staff';
		this.priv = 'user';
		this.type = 'exact';
		this.functionality = function() {
			var staff, names, i;
			staff = API.getStaff();
			names = [];
			for (i = 0; i < staff.length; i++) {
				names.push('@' + staff[i].username + ' ');
			}
			return API.sendChat(names.toString());
			
		};
		return Command.apply(this, arguments);
	};
	var afkCheckCommand = function() {
		this.cmd = '!afk';
		this.priv = 'bouncer';
		this.type = 'exact';
		this.functionality = function() {
			if (data.afkRemover) {
				API.sendChat('AFK Check disabled.');
				return data.afkRemover = false;
			} else {
				API.sendChat('AFK Check enabled.');
				return data.afkRemover = true;
			}
		};
		return Command.apply(this, arguments);
	};
	var afkCheck = function() {
		var u, id, user, now, timeSinceActivity, timeSinceWarned;
		u = data.users;
		for (id in u) {
			user = u[id];
			now = new Date();
			timeSinceActivity = now.getTime() - user.lastActivity.getTime();
			if (timeSinceActivity > data.afkTime) {
				if (API.getBoothPosition(id) !== -1 && API.getUser(id).id !== API.getUser().id && data.afkRemover === true) {
					if (user.afkWarnings === 0) {
						API.sendChat('@' + user.user.username + ', we have not seen you chat in over an hour now! Please chat soon or you will be removed from the booth! (Do not @ mention me or it will not work!)');
						user.afkWarnings++;
						user.afkLastWarned = new Date();
					} else if (user.afkWarnings === 1) {
						timeSinceWarned = now.getTime() - user.afkLastWarned.getTime();
						if (timeSinceWarned > 240000) {
							API.moderateRemoveDJ(id);
						}
					}
				} else {
					user.afkWarnings = 0;
				}
			}
		}
	};
	var motdPrint = function() {
		if (data.motd !== '') {
			API.sendChat('/me ' + data.motd[data.pass % data.motd.length]);
			return data.pass = data.pass + 1;
		}
	};
	var opPrint = function() {
		return API.sendChat('/em: wip');
	};
	var updateWaitList = function() {
		return data.setWaitList();
	};
	var onSongChange = function(s) {
		if (!data.song) {
			return false;
		} else {
			if (data.showSongStats) {
				API.sendChat('\'' + data.song.title + '\' by \'' + data.song.author + '\'. Stats: ' + data.woots + ' :thumbsup: , ' + data.mehs + ' :thumbsdown: and ' + data.curates + ' <3 .');
			}
			data.newSong();
			return true;
		}
		if (API.getTimeRemaining() <= 0 && data.autoSkip) {
			setTimeout("API.moderateForceSkip()", 1000);
		}
	};
	var onScoreUpdate = function(s) {
		if (API.getTimeElapsed() > 5) {
			data.woots = s.positive;
			data.mehs = s.negative;
			return data.curates = s.curates;
		} else {
			return false;
		}
	};
	var cmdList = [dcLookUpCommand,motdCommand,lockCommand,songStatsCommand,afkCheckCommand,staffCommand];
	var onChat = function(c) {
		var i, cmd, cm;
		if (c.type === 'message') {
			data.users[c.fromID].lastActivity = new Date();
			data.users[c.fromID].afkWarnings = 0;
		}
		for (i = 0; i < cmdList.length; i++) {
			cmd = cmdList[i];
			cm = new cmd(c);
			if (cm.checkCommand()) {
				break;
			}
		}
	};
	var onJoin = function(u) { 
		return data.userJoin(u);
	};
	var onLeave = function(u) {
		var dcStats, place, i, user;
		dcStats = {
			id: u.id,
			time: new Date(),
			songsPlayed: data.songsPlayed
		};
		place = 1;
		for (i = 0; i < data.wholeWaitList.length; i++) {
			user = data.wholeWaitList[i];
			if (user.id === u.id) {
				dcStats['waitPosition'] = place;
				data.setWaitList();
				break;
			} else {
				place++;
			}
		}
		data.users[u.id].dclog.push(dcStats);
		return data.users[u.id].room = false;
	};
	var apiEvents = [[API.WAIT_LIST_UPDATE, updateWaitList], [API.DJ_UPDATE, updateWaitList], [API.USER_JOIN, onJoin], [API.USER_LEAVE, onLeave], [API.CHAT, onChat], [API.ROOM_SCORE_UPDATE, onScoreUpdate], [API.DJ_ADVANCE, onSongChange]];
	var eventAPIs = function(m) {
		var i
		for (i = 0; i < apiEvents.length; i++) {
			if (m === 'init') {
				API.on(apiEvents[i][0], apiEvents[i][1]);
			} else if (m === 'kill') {
				API.off(apiEvents[i][0], apiEvents[i][1]);
			}
		}
		return true;
	};
	var initBot = function() {
		var afkInterval, motdInterval, opInterval;
		eventAPIs('init');
		return data.init();
	};
	var killBot = function() {
		eventAPIs('kill');
		return data.kill();
	};
	initBot();
})(this);

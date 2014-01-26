// DJBot
// @author Guichaguri

var DJBot_desc = 'With this plugin, your bot can be a DJ in your room!<br>';
DJBot_desc += '<strong>Commands</strong><br><br>';
DJBot_desc += '<strong>!dj</strong> - Toggle the DJ mode.<br>';
DJBot_desc += '<strong>!addtrack [youtube search text / video url]</strong> - Adds the first result in the Bot playlist<br>';
DJBot_desc += '<strong>!grab</strong> - Grab the current music to the Bot playlist<br>';
DJBot_desc += '<strong>!reset</strong> - Reset the Bot playlist<br>';
DJBot_desc += '<strong>!autodj [minimum]</strong> - The Bot will enable DJ mode if theres less than minimum on the waitlist. Set minimum to 0 if you want to disable this option.<br>';
BOT.setPluginInfos('DJBot', DJBot_desc, '1.0', 'Guichaguri');
BOT.setPluginStatus('DJBot', false);

BOT.addCommand('dj', cmdDJ, API.ROLE.MANAGER);
BOT.addCommand('reset', cmdReset, API.ROLE.MANAGER);
BOT.addCommand('addtrack', cmdAddTrack, API.ROLE.MANAGER);
BOT.addCommand('grab', cmdGrab, API.ROLE.MANAGER);
BOT.addCommand('autodj', cmdAutoDJ, API.ROLE.MANAGER);
var playlistName = 'DJBot';
var djBotExecuting = false;
var waitlistMinimum = 5;
DJBot_waitlist(API.getWaitList());
API.on(API.WAIT_LIST_UPDATE, DJBot_waitlist);

BOT.setPluginStatus('DJBot', true);

function DJBot_waitlist(users) {
    if(API.getWaitListPosition(API.getUser()['id']) == -1) {
        if(users.length < waitlistMinimum) {
            selectCreateList();
            API.djJoin();
        }
    } else if(users.length > waitlistMinimum) {
        API.djLeave();
    }
}

function cmdDJ(args, user) {
    var u = API.getUser();
    if(API.getWaitListPosition(u['id']) == -1) {
        selectCreateList();
        BOT.relistUser(u, 50);
    } else {
        API.djLeave();
    }
}

function cmdAutoDJ(args, user) {
    if(args.length == 0) return false;
    var i = parseInt(args[0]);
    if(isNaN(i)) return false;
    waitlistMinimum = i; DJBot_waitlist(API.getWaitList());
}

function cmdGrab(args, user) {
    if(djBotExecuting) {BOT.registerTimer(setTimeout(function(){cmdGrab(args, user);}, 1000));return true;}
    djBotExecuting = true;
    $('#curate').click();
    $('.pop-menu.curate .menu ul li').each(function() {
        if($(this).children('span').text() == playlistName) {
            $(this).mousedown();
            djBotExecuting = false; return true;
        }
    });
}

function cmdReset(args, user) {
    if(djBotExecuting) {BOT.registerTimer(setTimeout(function(){cmdReset(args, user);}, 1000));return true;}
    djBotExecuting = true;
    selectCreateList();
    $('#playlist-delete-button').click();
    setTimeout(function(){
        $('.dialog-input-background input').val($('.dialog-input-background input').attr('placeholder').replaceAll('Type ', ''));
        $('.button.submit').click(); djBotExecuting = false;
        BOT.sendMessage('The Bot playlist has been reset!', user);
    }, 100);
}

function cmdAddTrack(args, user) {
    if(djBotExecuting) {BOT.registerTimer(setTimeout(function(){cmdAddTrack(args, user);}, 1000));return true;}
    djBotExecuting = true;
    selectCreateList(); var a = '';
    $('#playlist-button').click();
    for(var i = 0; i < args.length; i++) {a += ' ' + args[i];} a = a.substring(1);
    $('#search-input-field').val(a);
    var e = jQuery.Event("keyup"); e.which = 13;
    $('#search-input-field').trigger(e);
    setTimeout(function(){
        $('.media-list .row:first').mouseover();
        $('.media-list .row:first .add .icon').mousedown();
        $('.pop-menu .menu ul li').each(function(){
            if($(this).children('span').text() == playlistName) {
                $(this).mousedown(); setTimeout(function(){$('#playlist-button').click();
                djBotExecuting = false;BOT.sendMessage('New track added!', user);}, 500);
            }
        });
    }, 1000);
}

function selectCreateList() {
    var ok = false; var i = null;
    $('#playlist-menu .menu .row').each(function() {
        if($(this).children('.name').text() == playlistName) {
            ok = true;
            i = $(this);
        }
    });
    if(ok) {
        i.mouseup();
        BOT.registerTimer(setTimeout(function(){$('#playlist-activate-button').click();}, 100));
    } else {
        $('#playlist-create').mouseup();
        BOT.registerTimer(setTimeout(function(){$('.dialog-input-background input').val(playlistName);
            BOT.registerTimer(setTimeout(function(){$('.button.submit').click();}, 100));}, 1000));
        BOT.registerTimer(setTimeout(function(){selectCreateList();}, 2000));
    }
}

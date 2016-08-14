//INCLUDE PART
//-----------
let DeployEvent = require('../../index.js');

let Event = DeployEvent.Event;
let EventDispatcher = DeployEvent.EventDispatcher;
let EventPriority = DeployEvent.EventPriority;

let NotificationEvent = require('./event/NotificationEvent.js');


//DEFINE PART
//-----------

let NotificationDispatcher = new EventDispatcher();

/**
 * @description
 * [Model#Renamer]
 * If protocol is http, change the http
 */
NotificationDispatcher.on(NotificationEvent,
    (eventInstance) => {
        if (eventInstance.isCancelled()) return;

        let url = require('url');
        let parsedLink = url.parse(eventInstance.getLink());

        if (parsedLink.protocol == 'http:') {
            parsedLink.protocol = 'https:';
            eventInstance.setLink(url.format(parsedLink));
            console.log('[Model#Renamer] http checked! now change https!');
        }
    }, EventPriority.HIGH);

/**
 * @description
 * [Model#Checker]
 * If protocol is not https event cancel
 */
NotificationDispatcher.on(NotificationEvent,
    (eventInstance) => {
        if (eventInstance.isCancelled()) return;

        let url = require('url');
        let parsedLink = url.parse(eventInstance.getLink());

        if (parsedLink.protocol != 'https:') {
            eventInstance.setCancelled();
            console.log('[Model#Checker] link protocol is not https! now event cancelled!');
        }
    }, EventPriority.LOW);

/**
 * @description
 * [View]
 * Event final process
 */
NotificationDispatcher.on(NotificationEvent,
    (eventInstance) => {
        if (!eventInstance.isCancelled()) {
            console.log(`[View] finally received link:${eventInstance.getLink()}`);
        } else {
            console.log('[View] NotificationEvent is cancelled. skip this event!');
        }
    }, EventPriority.LOWEST);


//ACTION PART
//-----------

let needGoogleConnectEvent = new NotificationEvent();
needGoogleConnectEvent.setLink('http://www.google.com');

NotificationDispatcher.call(needGoogleConnectEvent);

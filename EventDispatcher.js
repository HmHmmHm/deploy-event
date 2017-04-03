let Event = require('./Event.js');

class EventDispatcher {
    /**
     * @param {boolean} doAutomaticBreak
     */
    constructor(doAutomaticBreak) {
        if (doAutomaticBreak === undefined) doAutomaticBreak = false;
        this.doAutomaticBreak = doAutomaticBreak;

        this._eventListeners = {};
    }

    /**
     * @callback eventCallback
     * @param {Event} eventInstance
     */
    /**
     * @param {Event} event
     * @param {eventCallback} callback
     * @param {integer} priority
     */
    on(event, callback, priority) {
        let preEventInstance = new event();
        if (priority == null) priority = 0;
        if (!this._eventListeners[preEventInstance.getEventName()])
            this._eventListeners[preEventInstance.getEventName()] = {};
        if (!this._eventListeners[preEventInstance.getEventName()][String(priority)])
            this._eventListeners[preEventInstance.getEventName()][String(priority)] = [];
        this._eventListeners[preEventInstance.getEventName()][String(priority)].push(callback);
        return true;
    }

    /**
     * @param {Event} event
     */
    call(event) {
        if (!(event instanceof Event)) return false;
        if (!this._eventListeners[event.getEventName()]) return true;

        let listeners = this._eventListeners[event.getEventName()];
        for (let index = 5; index >= 0; index--) {
            if (!listeners[index])
                continue;
            for (let key in listeners[index])
                listeners[index][key](event);

            if (this.doAutomaticBreak && event.isCancelled()) break;
        }
        return true;
    }
}

module.exports = EventDispatcher;

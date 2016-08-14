let Event = require('./Event.js');

class EventDispatcher {
    constructor() {
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
        if (typeof(event.getEventFilePath) != 'function' || event.getEventFilePath() == null) return false;
        if (priority == null) priority = 0;
        if (!this._eventListeners[event.getEventFilePath()])
            this._eventListeners[event.getEventFilePath()] = {};
        if (!this._eventListeners[event.getEventFilePath()][String(priority)])
            this._eventListeners[event.getEventFilePath()][String(priority)] = [];
        this._eventListeners[event.getEventFilePath()][String(priority)].push(callback);
        return true;
    }

    /**
     * @param {Event} event
     */
    call(event) {
        if (!(event instanceof Event)) return false;
        if (!this._eventListeners[event.getEventFilePath()]) return true;

        let listeners = this._eventListeners[event.getEventFilePath()];
        for (let index = 5; index >= 0; index--) {
            if (!listeners[index])
                continue;
            for (let key in listeners[index])
                listeners[index][key](event);
            if (event.isCancelled()) break;
        }
        return true;
    }
}

module.exports = EventDispatcher;

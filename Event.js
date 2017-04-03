class Event {
    /**
     * @param {boolean} isSupportCancellable
     */
    constructor(isSupportCancellable, fileName) {
        this.__eventName = fileName;
        this._isCancelled = false;
        this._isSupportCancellable = (isSupportCancellable != null) ?
            isSupportCancellable : true;
    }

    /**
     * @return {boolean}
     */
    isCancelled() {
        if (!this._isSupportCancellable) return false;
        return this._isCancelled;
    }

    /**
     * @param {boolean} value
     */
    setCancelled(value) {
        if (!this._isSupportCancellable) return;
        if (value == null) value = true;
        this._isCancelled = value;
    }

    getEventName() {
        return this.__eventName;
    }
}

module.exports = Event;

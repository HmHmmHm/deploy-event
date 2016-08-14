class Event {
    /**
     * @param {boolean} isSupportCancellable
     */
    constructor(isSupportCancellable) {
        this.__eventName = null;
        this._isCancelled = false;
        this._isSupportCancellable = (isSupportCancellable != null) ?
            isSupportCancellable : true;
    }

    /**
     * @return {string}
     */
    getEventName() {
        return this.__eventName == null ?
            __filename
            .replace(__dirname, '')
            .replace('/', '')
            .replace('\\', '')
            .replace('.js', '') :
            this.__eventName;
    }

    /**
     * @return {string}
     */
    getEventFilePath() {
        return __filename;
    }

    /**
     * @return {string}
     */
    static getEventFilePath() {
        return __filename;
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
}

module.exports = Event;

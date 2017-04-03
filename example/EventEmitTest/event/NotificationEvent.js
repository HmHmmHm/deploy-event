let Event = require('../../../index.js').Event;

class NotificationEvent extends Event {
    constructor(link) {
        super(true, __filename); //necessary *important*

        this._link = '';
        this.setLink(link);
    }

    getLink() {
        return this._link;
    }

    setLink(link) {
        this._link = link;
    }
}

module.exports = NotificationEvent;

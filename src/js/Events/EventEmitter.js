import Events from "./EventEnum"

export default class EventEmitter {
    /* Add all possible events from Enum to instance */
    constructor() {
        this.events = {}
        Object.keys(Events).forEach(key => {
            this.events[Events[key]] = []
        })
    }

    /* Add a callback to an event */
    on(eventName, callback) {
        if (this.events[eventName]) {
            this.events[eventName].push(callback)
        }
        else {
            throw new Error("No such event: " + eventName)
        }
    }

    /* Trigger an Event */
    trigger(eventName, ...args) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(callback => {
                callback.apply(null, args)
            })
        }
    }
}
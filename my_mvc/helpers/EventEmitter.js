class EventEmitter {
    constructor() {
        this.events = {}
    }
    on(eventType, callback) {
        // if(this.events[eventType]) {
        //     this.events[eventType] = this.events[eventType]
        // } else {
        //     this.events[eventType] = [];
        // }

        // this.events[eventType].push(callback);
        this.events[eventType] = this.events[eventType] || [];
    this.events[eventType].push(callback);

    }

    emit(eventType, arg) {
        if(this.events[eventType]) {
            this.events[eventType].forEach(callback => {
                callback(arg);
            });
        }
    }

}
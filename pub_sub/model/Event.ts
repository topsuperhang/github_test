type eventType = {
    token: string,
    fn: Function
}

type eventListType = {
    [propName: string]: Array<eventType>;
}

type subOptionType = {
    token: string
}

class PubSub {
    eventList: eventListType;

    constructor() {
        this.eventList = {};
    }

    $on(eventName: string, fn: Function, options?: subOptionType): string {
        const eventList = this.eventList;
        if (!eventList[eventName]) {
            eventList[eventName] = [];
        }

        const token = options?.token || new Date().getTime() + '';
        eventList[eventName].push({
            token,
            fn
        })

        return token;
    }

    $off(token: string, eventName?: string) {
        if (eventName) {
            const events = this.eventList[eventName];
            for (const [key, value] of Object.entries(events)) {
                if (value.token === token) {
                    events.splice(+key, 1);
                }
            }
        } else {
            for (const events of Object.values(this.eventList)) {
                for (const [key, value] of Object.entries(events)) {
                    if (value.token === token) {
                        events.splice(+key, 1);
                    }
                }
            }
        }
    }

    $once(eventName: string, fn: Function): string {
        const token = new Date().getTime() + '';
        const fnWrapper = (args: unknown) => {
            fn(args);
            this.$off(token);
        }
        this.$on(eventName, fnWrapper, {token});

        return token;
    }

    $emit(eventName: string, args: unknown) {
        const events = this.eventList[eventName];
        if (!(events instanceof Array)) return;

        for (const event of events) {
            event.fn(args);
        }
    }
}

export default PubSub;
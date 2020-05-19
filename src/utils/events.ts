const EventEmitter = {
  events: {},
  dispatch(event: string, data: any) {
    if (!this.events[event]) return; this.events[event].forEach((callback: Function) => callback(data));
  },
  subscribe(event:string, callback:Function) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
  },
};

export { EventEmitter };

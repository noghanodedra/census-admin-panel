const EventEmitter = {
  events: {},
  dispatch(event: string, data: any) {
    if (!this.events[event]) return;
    this.events[event].forEach((callback: Function) => callback(data));
  },
  subscribe(event: string, callback: Function) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
  },
  unubscribe(event: string, callback: Function) {
    if (!this.events[event]) return;
    const index = this.events[event].indexOf(callback);
    this.events[event].remove(index);
  },
};

export { EventEmitter };

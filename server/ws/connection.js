class Connection {
  constructor(app) {
    this.app = app;
    this.socketServerConnect();
  }

  socketServerConnect() {
    const app = this.app;
    app.wss.on('connection', ws => {
      console.log('client connected.');
    });
  }
}

module.exports =  Connection;
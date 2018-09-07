const { OrderedMap } = require('immutable');
const { ObjectID } = require('mongodb');

class Connection {
  constructor(app) {
    this.app = app;
    this.clients = new OrderedMap();

    this.getClient = this.getClient.bind(this);
    this.addClient = this.addClient.bind(this);
    this.removeClient = this.removeClient.bind(this);

    this.socketServerConnect();
  }

  addClient(id, client) {
    this.clients = this.clients.set(id, client);
  }

  removeClient(id) {
    this.clients = this.clients.remove(id);
  }

  getClient() {
    return this.clients;
  }

  socketServerConnect() {
    const app = this.app;
    app.wss.on('connection', ws => {

      console.log('A client connected.');

      // 添加新client到connection中
      const clientId = new ObjectID().toString();
      const newClient = {
        _id: clientId,
        created: new Date(),
        ws: ws,
      };

      this.addClient(clientId, newClient);

      // 接收client的msg
      ws.on('message', msg => {
        console.log("Received message from client: ", msg);
      });

      // client断开, 从connections中删除这个client
      ws.on('close', () => {
        console.log(`The client (id: ${clientId}) disconnected.`);
        this.removeClient(clientId);
      });

    });
  }
}

module.exports =  Connection;
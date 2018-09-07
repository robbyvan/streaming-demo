from twisted.internet.protocol import ReconnectingClientFactory
from autobahn.twisted.websocket import WebSocketClientProtocol, WebSocketClientFactory
import json
import subprocess

streaming_process = None

class App:
    def __init__(self):
        print("App is initiated")

    # 开启一个process使用ffmpeg发布rtmp流
    def start_publishing_stream(self):
        global streaming_process

        if streaming_process is None:
            print("Gonna start publishing RTMP")
            ffmepegCommand = 'ffmpeg -re -i /Users/robby/Documents/repos/streaming-demo/storage/friends_S01_E01.mkv -c:v libx264 -preset veryfast -maxrate 3000k -bufsize 6000k -pix_fmt yuv420p -g 50 -c:a aac -b:a 160k -ac 2 -ar 44100 -f flv rtmp://localhost/live/robbyvan'
            start_streaming = subprocess.Popen(ffmepegCommand, shell=True, stdin=subprocess.PIPE)
        # else:
            # print("Already started.")

    # 取消发布rtmp流
    def stop_publishing_stream(self):
        global streaming_process

        if streaming_process is not None:
            # print("Gonna stop publishing RTMP")
            streaming_process.kill()
            streaming_process = None
        # else:
            # print("Already stopped.")

    # 根据decode后命令开始/停止streaming
    def switchCamera(self, should_stream):
        global streaming_process

        if should_stream:
            self.start_publishing_stream()
        else:
            self.stop_publishing_stream()

    # decode node server发来的json, 控制是否streaming
    def decode_message(self, payload):
        print("Get encoded message from server {0}".format(payload))
        json_message = json.loads(payload)
        action = json_message.get('action')
        payload_value = json_message.get('payload')

        if action == 'stream':
            self.switchCamera(payload_value)


class AppProtocol(WebSocketClientProtocol):

    def onConnect(self, response):
        print("Connected to the server")
        self.factory.resetDelay()

    def onOpen(self):
        print("Connection is open.")

        # when connection is open we send a test message the the server.

        def hello_server():
            message = {"action": "pi_online", "payload": {"id": "robbyvan", "secret": "key"}}
            payload = json.dumps(message, ensure_ascii= False).encode('utf8')
            self.sendMessage(payload)
            # self.sendMessage(u"Hello server I 'm Raspberry Pi!".encode('utf8'))

        hello_server()

    def onMessage(self, payload, isBinary):
        if (isBinary):
            print("Got Binary message {0} bytes".format(len(payload)))
        else:
            # here we decode the message from server and know the command to operate camera.
            # in fact, the payload here is in json format(from node server)
            print("Got Text message from the server {0}".format(payload.decode('utf8')))
            app = App()
            app.decode_message(payload)

    def onClose(self, wasClean, code, reason):
        print("Connect closed {0}".format(reason))


class AppFactory(WebSocketClientFactory, ReconnectingClientFactory):
    protocol = AppProtocol

    def clientConnectionFailed(self, connector, reason):
        print("Unable connect to the server {0}".format(reason))
        self.retry(connector)

    def clientConnectionLost(self, connector, reason):
        print("Lost connection and retrying... {0}".format(reason))
        self.retry(connector)


if __name__ == '__main__':
    import sys
    from twisted.python import log
    from twisted.internet import reactor

    server = "127.0.0.1"
    port = 3002

    log.startLogging(sys.stdout)
    factory = AppFactory(u"ws://127.0.0.1:3002")
    reactor.connectTCP(server, port, factory)
    reactor.run()
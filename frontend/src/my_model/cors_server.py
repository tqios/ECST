import http.server
import socketserver

PORT = 8081

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

handler = MyHTTPRequestHandler

with socketserver.TCPServer(("", PORT), handler) as httpd:
    print("Server running at port", PORT)
    httpd.serve_forever()

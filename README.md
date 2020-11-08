## Protocol Test Server 
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1280px-Node.js_logo.svg.png"
     alt="Markdown Node icon"
     height="50px"
/>&nbsp;&nbsp;&nbsp;
<img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
     alt="Markdown Node icon"
     height="50px"
/>

### Introduction

A simple server to test UDP, TCP and HTTP protocols. 
HTTP protocol has only options to test GET and POST requests.
Added UI for easy preview of communication between UDP, TCP and HTTP client/server.

UI on start opens three sockets by default for each protocol.

UDP socket opens on **4001**.
TCP socket opens on **4000**.
HTTP socket opens on **5000**.

Real time communication is enabled using socket.io library.

### Usage

For default setup, just run inside root folder: 
```
npm start
```

All hosts are set to **localhost**.

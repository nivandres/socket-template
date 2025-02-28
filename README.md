# Distributed Socket.IO Server Template

This repository provides a template for setting up a Socket.IO server with adapter options for distributed deployment. It is designed to help you quickly deploy a scalable real-time communication system.

## Features

- **Scalability**: Easily scale your Socket.IO server across multiple nodes.
- **Maintainability**: Ensure high code quality and consistency.
- **Security**: Implement robust authentication and enforce data validation and type safety.
- **Redis Adapter**: Use Redis for pub/sub messaging between nodes.
- **Docker Support**: Containerize your application for consistent environments.

## Getting Started

### Installation

1. Clone the repository:

```sh
git clone https://github.com/nivandres/socket-template.git
cd socket-template
```

2. Install dependencies:

```sh
bun install
```

3. Start the server:

```sh
bun run dev
```

### Configuration

The server can be configured using environment variables. Here's an example configuration:

```sh
PORT=3000
CORS_ORIGIN=*
AUTH_SECRET=
INSTRUMENT_USERNAME=
INSTRUMENT_PASSWORD=
ADAPTER=redis
ADAPTER_URL=redis://localhost:6379
```

- `PORT`: The port number to listen on.
- `CORS_ORIGIN`: The origins to allow for cross-origin requests. Use a comma-separated list for multiple origins.
- `AUTH_SECRET`: The secret key for authentication (jsonwebtoken).
- `INSTRUMENT_USERNAME`: The username for the SocketIO and Redis instrumentation.
- `INSTRUMENT_PASSWORD`: The password for the SocketIO and Redis instrumentation.
- `ADAPTER`: The adapter to use for distributed pub/sub messaging.
- `ADAPTER_URL`: The URL for accessing the adapter.

### Local

To deploy the server locally, you can use Docker Compose:

```sh
PORT=3000 docker-compose up -d
```

This will start the server and Redis containers, and expose the server on port 3000.

You can access the server at `http://localhost:3000`.

Test the server [here](https://nivandres.github.io/socket-template/public) introducing your localhost url.

### Production Deployment

You can deploy the server to production using services such as Fly.io to scale easily.

1. Fly launch your app:

```sh
fly launch
```

2. Configure the app:

```sh
fly secrets set AUTH_SECRET=your_secret_key
fly secrets set INSTRUMENT_USERNAME=your_instrument_username
fly secrets set INSTRUMENT_PASSWORD=your_instrument_password
fly secrets set ADAPTER_URL=redis://redis:6379
```

3. Deploy the app:

```sh
fly deploy
```

## Example Usage

### Socket.IO Server (Server using this template)

Here's an example of how to use the server:

```js
// Path: /src/socket.ts
export function handleSocket(socket: Socket) {
  socket.on("message", message => {
    socket.broadcast.emit("message", message);
  });
}
```

### Socket.IO Client

Here's an example of how to connect to the server using Socket.IO:

```js
const socket = io("http://localhost:3000");

socket.on("message", message => {
  addMessage(message);
});
```

### External Node.js process (Serverless Function)

Here's an example of how to connect to the server using an external Node.js process:

```js
import { Emitter } from "@socket.io/redis-emitter";
import { createClient } from "redis";

const client = createClient();
const io = new Emitter(client);

io.emit("message", "Hello, world!");
```

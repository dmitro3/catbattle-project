# Cat Battle Blockchain

`cat-battle-blockchain` handle payment processor on BSC and notification for other payment status. `cat-battle-blockchain` stack consists of:

- `postgres`: PostgreSQL server to store indexed data and perform queries.
- `ethers-websocket`: ResilientWebsocket build on top of ethers `WebSocketProvider` to listen payment events on BSC
- `quicknode`: Websocket node infrastructure provider
- `socket.io`: Provide websocket server for internal service listeners.

# Feature

- Handle payment for Cat Battle Game on BSC
- Send proceed BSC payment transaction events via websocket
- Contract functionality management: Withdraw/Upgradable/Ownable/Pausable
- Manage shop item on contract item, price

# Technique

- Nestjs: Index work and parse BSC payment transaction and express api server
- Postgres: PostgreSQL server to store transaction data and perform queries.
- Socket.io: Push payment transaction to game server
- websocket: Listen blockchain events

# How to run

## Running locally

- Prerequisite: `Docker` and `Docker Compose`. Install via [download link](https://docs.docker.com/compose/install/).

```shell
docker compose up -d --build

```

# Project Structure

```
cat-battle-website/
├── src/
│   ├── migrations/
│   ├── modules/
│   │   ├── contract-subscriber/
│   │   ├── account-transaction/
│   │   ├── notification/
│   │   └── resilient-websocket-provider/
│   ├── utils/
│   ├── app.controller.ts
│   ├── app.module.ts
│   └── main.ts
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── package.json
└── README.md
```

- `src/`:` Contains the source code, including components and styles.
- `migrations/`: Contains database TypeORM migrations scripts
- `modules/contract-subscriber`: BSC payment processor
- `modules/account-transaction`: parse, aggregate BSC transaction and store on off-chain database
- `modules/notification`: Send `ws` or `webhook` for service listeners
- `modules/resilient-websocket-provider`: ResilientWebsocket build on top of ethers `WebSocketProvider` to listen payment events on BSC
- `utils/`: Contains utility functions, classes, and other helper modules that are used throughout the project
- `main.ts`: Entry point for the React application.

# Authors and acknowledgment

Cat Battle Team

# License

This project is licensed under the MIT License. See the LICENSE file for details.

# Project status

We are still developing this project following the roadmap in here: https://catb.io/

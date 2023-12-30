## Install all dependencies

This will install all the dependencies in the root, client, and server directory!

```bash
npm run install-all
# or
npm run i-all
```

## Run both frontend and backend (Using Concurrently)

Open a terminal on root directory and run:

```bash
npm run dev
```

This should run the dev script on both frontend and backend simultaneously. If you prefer running both frontend and backend separately, see alternatives below.

## Run the frontend

Open a new terminal and run:

```bash
cd client
```

Then run:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Run the backend

Open a new terminal and run:

```bash
cd server
```

Then run:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

You can now fetch data from [http://localhost:8080](http://localhost:8080)

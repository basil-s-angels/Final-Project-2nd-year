## Install all dependencies

This will install all the dependencies in the root, client, and server directory!

```bash
npm run install-all
# or
npm run i-all
```

## Create .env files

Create a .env.local file inside the client folder. The folder structure should look like client/.env.local and paste this inside it:

```bash
NEXT_PUBLIC_SERVER_URL=http://localhost:8080

NEXT_PUBLIC_CLIENT_URL=http://localhost:3000
```

Create a .env file inside the server folder. The folder structure should look like server/.env and paste this inside it:

```bash
DATABASE_URL="protocol://username:password@host:port/database_name?options"

ACCESS_TOKEN_SECRET="ao0EZciNMEUjCmRjGA7HT3Fv8V1cidsKz7AVi6LFjTU="

CLIENT_URL="http://localhost:3000"
```

## Database Migration

Open a new terminal and run:

```bash
cd server
```

Then run:

```bash
dbmate up
```

This will load the migrations according to the DATABASE_URL from server/.env file. The URL is structured as follows:

```bash
DATABASE_URL="protocol://username:password@host:port/database_name?options"
```

If the database is on your local machine, you can include sslmode=disable in the options.

Refer to the [official dbmate documentation](https://github.com/amacneil/dbmate#usage) for more info.

## Run both frontend and backend (Using Concurrently)

Open a terminal on root directory and run:

```bash
npm run dev
```

This should run the dev script on both frontend and backend simultaneously. If you prefer running both frontend and backend separately, [see links below](#run-the-frontend).

After accessing localhost:3000, you will be greeted by the name of the group members. To get started on the customer side, go to [localhost:3000/insert-table-number-here/menu-page](localhost:3000/1/menu-page). For the admin side, go to [localhost:3000/admin](localhost:3000/admin), go check credentials section to log in.

## Credentials

Use this to login with admin credentials.

```bash
email: johndoe@gmail.com
password: admin-1234
```

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

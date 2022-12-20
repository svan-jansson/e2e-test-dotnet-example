# Example of E2E Testing with Cypress, .NET and Docker Compose

This project contains a simple app with a frontend and a backend. The backend is dependent on a remote weather API and a MongoDB database. The frontend depends on the backend.

## Run the app

Open a terminal window...

```bash
docker-compose up
dotnet run --project ./Example.Backend/
```

Open a second terminal window...

```bash
cd ./Example.Frontend
npm start
```

The app is now running!

## Run E2E tests locally

This will open Cypress against your locally running frontend.

```bash
cd ./e2e-tests
npm run e2e
```

## Run E2E tests in docker-compose

This script starts the Cypress test service inside the docker compose environment using `docker-compose exec`. Using headless mode.

```bash
sh ./ci-run.sh
```

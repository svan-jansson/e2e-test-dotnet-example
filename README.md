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

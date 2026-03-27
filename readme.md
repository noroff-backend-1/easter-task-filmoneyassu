# Easter Task API
This is an optional task to keep you busy throughout the Easter break if you so wish to continue practising API skills ⚔️

## The objective
I want to keep this challenge super simple, so that you can have a chance to practice using all of the necessary skills from this module, without spending too much time on each section.
- Create a back end server app with **Express**.
- Use **Sequelize** to connect to a **MySql** database.
- Create a **single model** to perform CRUD operations on the database.
- Create a **single service** class to encapsulate all of the available functionality of a associated entity.
- Create a **single route** that holds endpoints for a single entity.
- Wire up this single route to the server app.
- Write some unit tests with **Jest** and **Supertest**.

## The single entity
We'll keep in on theme; I want to you to store data for Easter Eggs! Only a single table in the Database. No associations. No foreign keys. No ERDs. For a single Easter Egg record, store:
- id (PK): `Number (auto-increment)`
- color: `String(30)`
- weight: `Float`

## Requirements
Create a REST API with the following endpoints:

### Auth:
- `POST` `/login`: Should return a response to the client that includes a JWT with the payload:
```json
{
    "status": "LOGGED_IN"
}
```
> **Note:** There is no need to use any `username` & `password` logic, or interact with the DB.

### Eggs:
- `GET` `/eggs`: Fetch all egg records from the DB. *No JWT required*
- `GET` `/eggs/:id`: Fetch an egg record from the DB by ID. *No JWT required*
- `POST` `/eggs`: Add a new egg record to the DB. *Valid JWT required, else error 401*
- `PUT` `/eggs`: Update an egg record in the DB. *Valid JWT required, else error 401*
- `DELETE` `/eggs`: Delete an egg record from the DB. *Valid JWT required, else error 401*

## Services
Use an `EggService` class that depends on models to interact with the database. The `EggService` class should have the following async functions:
- getAllEggs()
- getEggById(id)
- createEgg(newEgg)
- updateEgg(id, updatedEgg)
- deleteEgg(id)

## Swagger docs
Use `swagger-autogen` and `swagger-ui-express` to generate a `/doc` endpoint that renders a Swagger page for the API.

## Unit tests
Use `jest` and `supertest` to write the following tests:
1. Send a `GET` request to the `/eggs` endpoint. Receive a list of eggs, and status code 200.
2. Send a `POST` request to the `/login` endpoint to get a JWT.
3. Send a `POST` request to the `/eggs` endpoint. Receive a code 201. Save the id of the newly created egg for the next test.
4. Send a `PUT` request to the `/eggs/:id` with the id from test 3. Receive a code 204.
5. Send a `DELETE` request to the `/eggs/:id` with the id from test 3. Receive a code 204.
6. Repeat test 5. Receive a code 404. The egg with the id does not exist because it was just deleted.

## Good luck 🏆
Feel free to add bonus content to this project if you feel necessary, for example, adding an endpoint `/eggs/count` to count the number of eggs in the database.
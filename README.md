# Restaurant Order

Restaurant Order project using MERN development stack

<!-- **[Live Demo](https://restaurant-ord.herokuapp.com/)** -->

<a href="https://restaurant-ord.herokuapp.com/" target="_blank"> <img src="./docs/screenshots/demo.png" width="50" height="50"/> </a>

## Usage

There are two kinds of users -Admin and Customer.

Logging in as a Customer Grants access to the home page where you can order food

Logging in as an Admin grants access to the home page & control panel.
An admin button will appear in the top toolbar and will allow access to the control panel.
The control panel contains these management options: Home, Actions, Orders, Order history

### Home Page -

Customer-can order food and is able to enter this page alone.

Admin- can have access to the control panel via the admin button.

![Home Page](./docs/screenshots/resturate_2.png)
![alt text](resturate_2.png?raw=true "Optional Title")


### Actions -

The action page allows an admin to view existing meals, update data, delete meals from the menu, and add new meals.

![Action](./docs/screenshots/resturate_3.png)

Click the "Add new meal" button to open a form and insert the meal to the DB.

![Action-Add meal](./docs/screenshots/resturate_4.png)

### Orders -

Here an Admin can see and manage orders, click on a specific order from the list which will open the Order Details table, below, the Admin can confirm the order once done, or cancel the order.

Confirming the order will save the order in the Order history.

![Orders](./docs/screenshots/resturate_5.png)

### Orders History -

Here an Admin can see all done Orders and follow up, and if not required, can completely delete the order from the database.

![Orders History](./docs/screenshots/resturate_6.png)

## Server API Endpoints

user - {\_id, email, password, isAdmin,tokens}

meals - {\_id, mealId, image,name, description,price}

orders - {\_id, orderedItems, address, user,dateAdded}

<!-- admin - {} -->

**Users ↓**

| Request                |           |                              | Response                |               |
| ---------------------- | --------- | ---------------------------- | ----------------------- | ------------- |
| Route                  | Method    | Body                         | Success                 | Errors        |
| --------------------   | --------- | ---------------------------- | ----------------------- | ------------- |
| `/api/users`           | `POST`    | {name,email,password}        | { user, token } -201    | 400           |
| `/api/users/login`     | `POST`    | {email,password}             | { user, token } -200    | 400           |
| `/api/users/logout`    | `POST`    | {token}                      | 200                     | 400           |
| `/api/users/logoutAll` | `POST`    | {tokens}                     | 200                     | 400, 401      |
| `/api/users/me`        | `GET`     | {}                           | user -200               | 400, 401, 500 |
| `/api/users/me`        | `PATCH`   | {[name, email, password]}    | user -200               | 400, 401, 500 |
| `/api/users/me`        | `DELETE`  | {}                           | user -200               | 500           |
| `/api/users/:token`    | `GET`     | {}                           | user -200               | 500           |

**Meals ↓**

| Request           |          |                                                       | Response     |             |
| ----------------- | -------- | ----------------------------------------------------- | ------------ | ----------- |
| Route             | Method   | Body                                                  | Success      | Errors      |
| ----------------- | -------  | ----------------------------------------------------- | ------------ | ----------- |
| `/api/meals`      | `GET`    | {}                                                    | meals -200   | 500         |
| `/api/meals/:id/` | `GET`    | {}                                                    | meal -200    | 404, 500    |
| `/api/meals`      | `POST`   | {}                                                    | meal -201    | 400         |
| `/api/meals/:id/` | `PUT`    | {[mealId, category, image, name, description, price]} | meal -200    | 400         |
| `/api/meals/:id/` | `DELETE` | {}                                                    | meal -200    | 400, 404    |

**Orders ↓**

| Request                |           |                                 | Response                |               |
| ---------------------- | --------- | ------------------------------- | ----------------------- | ------------- |
| Route                  | Method    | Body                            | Success                 | Errors        |
| --------------------   | --------- | ----------------------------    | ----------------------- | ------------- |
| `/api//orders`         | `GET`     | {}                              | orders -200             | 500           |
| `/api/orders/new`      | `GET`     | {}                              | orders -200             | 500           |
| `/api/orders/done`     | `GET`     | {}                              | orders -200             | 500           |
| `/api/orders/:id/`     | `GET`     | {}                              | order -200              | 404, 500      |
| `/api/orders`          | `POST`    | {}                              | order -201              | 400           |
| `/api/orders/done/:id` | `PUT`     | {}                              | order -200              | 400, 404      |
| `/api/orders/:id/`     | `PUT`     | {[orderedItems, address, user]} | order -200              | 400, 404      |
| `/api/orders/:id/`     | `DELETE`  | {}                              | meal -200               | 400, 404      |

## Configuration process

In order to run this repo locally, add a dev.js file to ./config With the following variables: `CONNECT_PASS,JWT_SECRET`

```javascript
module.exports = {
  CONNECT_PASS: "<your mongoDB password>",
  JWT_SECRET: "<Password of your choice>",
};
```

In order to run this repo on a server you must add the variables `CONNECT_PASS,JWT_SECRET` to Config Vars

## Build process

Run the full-build npm script, then the server script

`npm run full-build`

`npm run server`

This will start the server on port 9000 on your local machine

<!-- In order to run this repo on port 3000, add a .env file with `PORT=3000` -->

## Other Deployment Options

`npm run dev` - Run server and client separately in dev configuration

`npm run server` - Run only the server, will serve on / the last build client

## Technologies

`Back End`

- NodeJS
- Express
- MongoDB (Mongoose)

`Front End`

- ReactJS
- React Router
- Axios - API
- Browser localStorage - User authentication

`Services`

- Authentication-using packages: bcryptjs ,jsonwebtoken
<!-- - Firebase - Google authentication
- Google Extensions - Site extension
- Chrome Alarm API - Extension notifications -->

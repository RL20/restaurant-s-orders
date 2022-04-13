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

| Request              |           |                                                        | Response                |               |
| -------------------- | --------- | ------------------------------------------------------ | ----------------------- | ------------- |
| Route                | Method    | Body                                                   | Success                 | Errors        |
| -------------------- | --------- | ------------------------------------------------------ | ----------------------- | ------------- |
| `/api/meals`         | `GET`     | {}                                                     | meals -200              | 500           |
| `/api/meals/:id/`    | `GET`     | {}                                                     | meal -200               | 404, 500      |
| `/api/meals`         | `POST`    | {}                                                     | meal -201               | 400           |
| `/api/meals/:id/`    | `PUT`     | {[mealId, category, image, name, description, price]}  | meal -200               | 400           |
| `/api/meals/:id/`    | `DELETE`  | {}                                                     | meal -200               | 400, 404      |

|

<!-- router.get("/meals", getMeals); -->
<!-- router.get("/meals/:id/", getMeal); -->
<!-- router.post("/meals", addMeal); -->
<!-- router.put("/meals/:id/", updateMeal); -->
<!-- router.delete("/meals/:id/", removeMeal); -->

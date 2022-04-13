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

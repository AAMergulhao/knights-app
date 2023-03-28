
## Backend

The backend API is fully documented using swagger, the documentation is displayed in the address **/api/docs**

![Swagger Screenshot](./docs/img//swagger.png)

The documentation can also be displayed pasting the content of the file **/backend/swagger.json** in the [Swagger Editor](https://editor.swagger.io/) website.


### Running the backend app

First you need to create a file named **.env.development**, to run it locally you can use the following example

```
PORT=8500

ME_CONFIG_BASICAUTH_USERNAME=user
ME_CONFIG_BASICAUTH_PASSWORD=user
ME_CONFIG_MONGODB_PORT=27017
ME_CONFIG_MONGODB_ADMINUSERNAME=admin
ME_CONFIG_MONGODB_ADMINPASSWORD=admin

MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=root

MONGO_URI='mongodb://root:example@mongo:27017/'
```
This command will install the app dependencies
```
  npm i
  ```


This command is going to start the **MongoDB** and **App** containers, once the command is done the server is going to be listening on port **8500**
```
  docker-compose up -d
  ```

## Frontend

The frontend was develop using **Vue 3** and **Vuetify**.

This command will install the app dependencies
```
  npm i
  ```

Execute the following command to start the frontend app
```
  npm run dev
  ```

### Screens 


![Home page](./docs/img/home.png)
![Details page](./docs/img/details.png)
![Create page](./docs/img/create.png)
![Edit page](./docs/img/edit.png)
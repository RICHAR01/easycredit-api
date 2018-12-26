# Easycredit-api

API made with koa2 (web services) and mongodb (storage).

## Installation

```bash
git clone https://gitlab.com/this-repository.git
npm install
```

## Features
* [koa2](https://github.com/koajs/koa/tree/v2.x)
* [koa-router](https://github.com/alexmingoia/koa-router)
* [koa-bodyparser](https://github.com/koajs/bodyparser)
* [Babel](https://github.com/babel/babel)
* [ESLint](http://eslint.org/)
* [mongoose](https://mongoosejs.com/docs/)


## Structure
```
├── bin
│   └── server.js             # Init server
├── boot                      # Init boot
│   └── data.js
│   └── index.js
├── config                    # Server configuration settings
│   ├── common                # Environment config
│   │   ├── common.js
│   │   ├── development.js
│   │   ├── production.js
│   │   └── test.js
│   ├── datasources           # Environment config datasource
│   │   ├── development.js
│   │   ├── production.js
│   │   └── test.js
│   │   index.js              
│   └── datasources.js        
├── src                       
│   ├── middleware            # Middlewares
│   ├── models                # Models structure
│   ├── modules
│   │   ├── module
│   │   │   ├── controller.js # Controller for every module
│   │   │   └── router.js     # Routes for every module
│   │   └── index.js          
└── └── utils                 
```

## Usage

* `node index.js` Start server on default environment
Visit `http://localhost:4000/`
* `npm run lint` Lint src code

## Endpoints

|Method                |Url                          |Params                         |Description                         
|----------------|-------------------------------|-----------------------------|-----------------------------|
|POST|`/api/users/login`            |body: { username: String }            | Login user
|GET          |`/api/me/dashboard`            |headers: { Authorization: String }            | Get user dashboard
|POST          |`/api/me/loans`|headers: { Authorization: String }, body: { amount : Number, paymentsQuantity: Number, age: Number, hasCreditCard: Boolean } | Create user loan
|GET          |`/api/admin/loans/pending`            |NA            | Get pending loans
|POST          |`/api/admin/loans/:loanId/approve`            |NA            | Approve loan
|POST          |`/api/admin/loans/:loanId/reject`            |body: { rejectReason : String }            | Reject loan

## Based on

* [koa2-api-boilerplate](https://github.com/adrianObel/koa2-api-boilerplate)

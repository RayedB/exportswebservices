# API endpoints

## REST
### Register company
```
POST localhost:4000/api/register/company
```
Params:
- name (String, required)
- user (String, email format, required)
- telephone (optional)

### Register user
```
POST localhost:4000/api/register/user
```
Params:
- email (String, required)
- password (String, required)

### Login
```
POST localhost:4000/api/login
```
Params:
- email (String, required)
- password (String, required)

Returns JWT

## GraphQL (protected)
 These endpoints must be called with an authorization header containing the token.

- Get company:
```
GET localhost:4000/api/graphql?query={company(name:"Google"){name,users}}
```

- Get all companies:
```
GET localhost:4000/api/graphql?query={companies{name,users}}
```

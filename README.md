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

### login

## GraphQL

- Get company:
```
GET localhost:4000/api/graphql?query={company(name:"Google"){name,users}}
```

- Get all companies:
```
GET localhost:4000/api/graphql?query={companies{name,users}}
```
## Users

- Register:
```
POST localhost:4000/api/graphql?query=mutation{addUser(email:"toto@gmail.com", password:"toto"){email}}
```
- login:
```
POST localhost:4000/api/graphql?query=mutation{logUser(email:"toto@gmail.com", password:"toto")}
```

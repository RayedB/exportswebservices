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

### Reset password
```
POST localhost:4000/api/forgot/send
```
Params:
- email (String, required)

Sends an email with the reset token needed to update the password

```
POST localhost:4000/api/forgot/update
```
Params:
- email (String, required)
- token (String, required)
- password (String, new password, required)

Checks token and update password

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

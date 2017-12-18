## API endpoints

# Companies

- Add company:
```
POST localhost:4000/api/graphql?query=mutation{addCompany(name:"Google", users:["toto@google.com"]){name}}
```
- Get company:
```
GET localhost:4000/api/graphql?query={company(name:"Google"){name,users}}
```

- Get all companies:
```
GET localhost:4000/api/graphql?query={companies{name,users}}
```
# Users

- Register:
```
POST localhost:4000/api/graphql?query=mutation{addUser(email:"toto@gmail.com", password:"toto"){email}}
```
- login:
```
POST localhost:4000/api/graphql?query=mutation{logUser(email:"toto@gmail.com", password:"toto")}
```

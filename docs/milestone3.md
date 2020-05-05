# MyPet

## Work Breakdown

- Yi Sha: Making all website about the users and pets, including login/logout, signup, profile, and pet list. Also making an website for clients to contact other users called Users List. Implementating all back-end code and front-end for these websites. Writing milestone3.md file.
- Peilin Guo:Making Petservice Back-end  Code and Front-end Implementation. Making  and implementating database skeleton code for petservice part. implementing the Frount-end and test  service part. Writing markdown file.
- Ziwei Hu: Petservice page front-end implementation, database back-end implementation, writing milestone3.md file.

## Part 1: Database implementation

### User document

- We use TypeScript Built-in data type "any" for our variables. If variable is declared with any data-type then any type of value can be assigned to that variable. 

```json
{
    _id: ObjectID
    username: any, // name of the user
    password: any, // password of user
    firstname: any, // user's first name
    lastname: any, // user's lastname
    birthdate: any, // user's birthdate
    email: any, // user's email
    memo: any, // user's memo to show other users
}
```
  
### Pet document

```json
{
    _id: ObjectID
    name: any, // dog's name
    gender: any, // dog's gender
    age: any, // dog's age
    species: any, // dog's species
}
```

### Post document

```json
{
    _id: ObjectID
    firstname: any, // user's first name for this pet service
    lastname: any, // user's last name for this pet service
    city: any, // user's city for this pet service
    content: any, //  content for this pet service
    userId: ObjectId, // this is same user id in ObjectID
}
```

## Part 2: Deployment

### Heroku

- http://mypet-final-web.herokuapp.com (only click this url, this is the app of front-end)
- http://mypet-final-server.herokuapp.com (the app for back-end, because we use two ports for the whole app)
- In order to build two apps on heroku, we made two new repositories on GitHub. (https://github.com/Candyexplode/final-server.git & https://github.com/Candyexplode/final-web.git) We moved our code from the old repository to these two new repositories.

Ps: we use http instead of https.
# Title: Vav

## Subtitle: MyPet

## Semester: Spring 2020

## Overview

The main idea of our website is to help people who love pets take care of their pets. For example, many times pet owners cannot travel or have insufficient time to take care of their pets. Our user could use pet service to solve this problem. Pet service means a user can provide pet service to other users.  

## Team Members

Team member names with their GitHub usernames.

- Peilin Guo: perryguo98

- Ziwei Hu: ZiweiHu1015

- Yi Sha: Candyexplode

## Important

- http://mypet-final-web.herokuapp.com (only click this url, this is the app of front-end)
- http://mypet-final-server.herokuapp.com (the app for back-end, because we use two ports for the whole app)
- In order to build two apps on heroku, we made two new repositories on GitHub. (https://github.com/Candyexplode/final-server.git & https://github.com/Candyexplode/final-web.git) We moved our code from the old repository to these two new repositories.

## User Interface

### User's Profile

![](imgMilestone1/final-profile.png)

On this webpage, users can view their personal information and manage their pets' information. Although their pets' information can not see by other users, the future, we (our website) can collect and analyze these data to help improve our website's service.

### List of Users

![](imgMilestone1/final-userlist.png)

On this webpage, users can edit their personal information and view other users' information. Users can also use the information from this webpage to find and contact other users.

### Posts

![](imgMilestone1/final-posts1.png)

![](imgMilestone1/final-posts2.png)

On this webpage, users can post their pet services and view all posts. Also, users can search other's services by specific city names to find nearby services. Users can only delete their own posts.

## APIs

A final up-to-date list/table describing your application’s API

### /sign-in

| Method | Describe |
| :----- | :-------:|
| POST | Submit username and password to the server, then API calls data from database to match |

### /sign-up

| Method | Describe |
| :----- | :-------:|
| POST | Create the data of user's information and then submit to the server, API stores it to the database |

### /users

| Method | Describe |
| :----- | :-------:|
| GET | Get all users' data |
| POST | Update users' data |
| PATCH | Partial update users' data (edit function) |
| DELETE | Delete specific user's data (/users/:id) |
| GET | Get specific user's data (/users/:id) |

### /posts

| Method | Describe |
| :----- | :-------:|
| GET | Get all posts' data |
| GET | Get specific post's data (/posts/:id) |
| GET | Get specific post's data by keywords (search function) (/posts/filter/:filter) |
| POST | Update posts' data |
| PATCH | Partial update post's data (edit function) |
| DELETE | Delete specific post's data (/posts/:id) |

### /pets

| Method | Describe |
| :----- | :-------:|
| GET | Get all pets' data |
| GET | Get specific pet's data (/pets/:id) |
| POST | Update pets' data |
| PATCH | Partial update pet' data (edit function) |
| DELETE | Delete specific pet's data (/pets/:id) |

## Database

- We use TypeScript Built-in data type "any" for our variables. If variable is declared with any data-type then any type of value can be assigned to that variable. 

### User document

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

## URL Routes/Mappings

If people want to use our website and they are the first time to enter our website, it will automatically jump to the log-in page and ask users to log in. After logging in, users could access every webpage.

A final up-to-date table of all the URL routes that your application supports and a short description of what those routes are used for. You should also indicate any authentication and permissions on those routes.

## Authentication/Authorization

### Authentication

We use JWT for user authentication.

A JWT is a mechanism to verify the owner of some JSON data. It's an encoded string, which is URL safe, that can contain an unlimited amount of data, and it's cryptographically signed. When a server receives a JWT, it can guarantee the data it contains can be trusted because it's signed by the source. No middleman can modify a JWT once it's sent.

Once the user is logged in, each subsequent request will include the JWT, allowing the user to access routes, services, and resources that are permitted with that token. Single Sign-On is a feature that widely uses JWT nowadays, because of its small overhead and its ability to be easily used across different domains.

![](imgMilestone1/authen.png)

### Authorization

The users who have logged in can edit their information at the Users List website, create their pets' information, and add/delete their posts at the Post website. Although users can see others' information and posts, they can not successfully change other users' information and delete other users' posts. Others' data will not change, although users click the Edit or Delete button. For debugging, we also add messages to show on the console if a user tries to change or delete other's information or post.

## Division of Labor

### Yi Sha

Making all website about the users and pets, including login/logout, signup, profile, and pet list. Also making an website for clients to contact other users called Users List. Implementating all back-end code and front-end for these websites. Writing markdown file.

### Peilin Guo

Making Petservice Back-end  Code and Front-end Implementation. Making  and implementating database skeleton code for petservice part. implementing the Frount-end and test  service part. Writing markdown file.

### Ziwei Hu

Petservice page front-end implementation, database back-end implementation, writing markdown file.

## Conclusion

A conclusion describing your team’s experience in working on this project. This should include what you learned * through the design and implementation process, the difficulties you encountered, what your team would have liked to know * * * before starting the project that would have helped you later, and any other technical hurdles that your team encountered.

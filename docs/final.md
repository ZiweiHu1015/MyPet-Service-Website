* Title: Vav
* Subtitle: MyPet.
* Semester: Spring 2020
* Overview: The main idea of our website is to help people who love pets take care of their pets. For example,Many times pet owners cannot travel or have insufficient time to take care of their pets.  Our user could use pet service to solve this problem. Pet service means a user can provide pet service to other users.  

* Team Members: 
Team member names with their GitHub usernames.

Peilin Guo: perryguo98

Ziwei Hu: ZiweiHu1015

Yi Sha: Candyexplode

## User Interface: 
## APIs: A final up-to-date list/table describing your application’s API
## Database: 
## User document

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
    memo: any, // user's memo to show other users. 
}
```
  
## Pet document

```json
{
    _id: ObjectID
    name: any, // dog's name 
    gender: any, // dog's gender
    age: any, // dog's age 
    species: any, // dog's species
}
```

## Post document

```json
{
    _id: ObjectID
    firstname: any, // user's first name for this pet service   
    lastname: any, // user's last name for this pet service 
    city: any, // user's city for this pet service 
    content: any, //  content for this pet service
    userId: ObjectId, // this is same user id in ObjectID.
}
```

* URL Routes/Mappings: A final up-to-date table of all the URL routes that your application supports and a short description of what those routes are used for. You should also indicate any authentication and permissions on those routes.
* Authentication/Authorization: A final up-to-date description of how users are authenticated and any permissions for specific * users (if any) that you used in your application. You should mention how they relate to which UI views are accessible.
# Division of Labor:
* Yi Sha: Making all website about the users and pets, including login/logout, signup, profile, and pet list. Also making an website for clients to contact other users called Users List. Implementating all back-end code and front-end for these websites.writing milestone3.me file.
* Peilin Guo:Making Petservice Back-end  Code and Front-end Implementation. Making  and implementating database skeleton code for petservice part. implementing the Frount-end and test  service part. Writing markdown file.
* Ziwei Hu: Petservice page front-end implementation, database back-end implementation, writing milestone3.me file.
## Conclusion:
A conclusion describing your team’s experience in working on this project. This should include what you learned * through the design and implementation process, the difficulties you encountered, what your team would have liked to know * * * before starting the project that would have helped you later, and any other technical hurdles that your team encountered.

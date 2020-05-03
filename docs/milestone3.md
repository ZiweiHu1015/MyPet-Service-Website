# MyPet
# Work Breakdown:

* Yi Sha: Making all website about the users and pets, including login/logout, signup, profile, and pet list. Also making an website for clients to contact other users called Users List. Implementating all back-end code and front-end for these websites.
* Peilin Guo:Peilin Guo: Making Back-end Skeleton Code and Front-end Implementation. Writing milestone2.md file. Making implement database skeleton code.implementing the Frount-end implementation for service part.
* Ziwei Hu: Making databse implementation. Helping writing milestone 2 and implement back end skeleton.Making a pet service page.




## Part 1: Database implementation

* User document
* {
* _id: ObjectID
* username: String, // name of the user 
* password: any, // password of user
* firstname:String, // user's first name
* lastname: String, // user's lastname
* birthdate: any, // user's birthdate 
* email:String, // user's email 
* memo: String, // user's memo to show other users. 
}
  
* Pet document
* {
* _id: ObjectID
* name: String, // dog's name 
* gender: String, // dog's gender
* age:int, // dog's age 
* species: String, // dog's species
}
  

* PetService document
* {
* _id: ObjectID
* title: String, // title for user's service  
* integral: int, // ???
* content, // content for this pet service
* lastestAt: data, // ?? pet service data
* userId: ObjectId, // this is same user id in ObjectID.
}

* Post document
* {
* _id: ObjectID
* firstname: String, // user's first name for this pet service   
* lastname: String, // user's last name for this pet service 
* city: String, // user's city for this pet service 
* content: String, //  content for this pet service
* userId: ObjectId, // this is same user id in ObjectID.
}




## Part 2: Front-end Implementation


## Part 2: Deployment

### Heroku:

- http://mypet-final-web.herokuapp.com (only click this url, this is the app of front-end)
- http://mypet-final-server.herokuapp.com (the app for back-end, because we use two ports for the whole app)
- In order to build two apps on heroku, we made two new repositories on GitHub. (https://github.com/Candyexplode/final-server.git & https://github.com/Candyexplode/final-web.git) We moved our code from the old repository to these two new repositories.

Ps:we use http instead of https. 



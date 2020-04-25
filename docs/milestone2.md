# MyPet
# Work Breakdown:
* Peilin Guo:Peilin Guo: Making Back-end Skeleton Code and Front-end Implementation. Writing milestone2.md file. Helping implement database code.
* Ziwei Hu: Making Navigation bar, background picture, and text, posting area, and posting form. Making a pet service page.
* Yi Sha: Making all website about the users and pets, including login/logout, signup, profile, and pet list. Also making an website for clients to contact other users called Users List. Implementating all back-end code and front-end for these websites.



## Part 0: Project API Planning

API flowcharts:
![](imgMilestone1/flowcharts.jpg)


## Part 2: Front-end Implementation

* Create 
Parameter
Description

Fname
(Required) The first name for the newly created user counter

Lname
Required) The last name for the newly created user


City
(Required) The city name for the newly created counter city name


example:
![](imgMilestone1/create.png)
Responses
The create API returns all response data as a JSON object. 
The interface will create a post for user to our database. 


* Update:
The update provides a way for the clients to update their previous posts. They can update the first name, last name, city and value.

There are three requirement parameters and zero optional parameters for this endpoint. 

Parameter
Description
Example
FName
(Required) The first name for the newly created server content
LName 
(Required) The last name for the newly created server content
City
(Required) The city name of the service server content
content 
(Required) The service post message by the user to replace the default or previous post


Example
![](imgMilestone1/update.png)
Responses:
If users do not have server content before, update will help them to add their server content 
If users have server coentent before,update will help them to change their server content




* read
The read  provides a way for the clients to get post information by providing first name, last name and city name.


There are three required parameters and zero optional parameters for this endpoint.

Parameter
Description
Fname
(Required) The first name for the newly created user counter

Lname
(Required) The last name for the newly created user

City
(Required) The city name for the newly created counter city name


Example
![](imgMilestone1/read.png)
Responses:
The read endpoint outputs “You already have a post with message: + value.” if there is a post that exists. The endpoint outputs “You haven't posted any services yet, please create a new one.” if there is no post existing.

### User Login

Before clients go to the Home page (index.html), they will need to log in. In this example, we use an account which is already signed up before (test1).

#### Example
![](imgMilestone1/loginex.png)

### User Signup

If clients do not have an account, they can click "sign up". Then it will jump to sign up page (signup.html).

#### Example
![](imgMilestone1/signupex.png)

### User profile

When users log in, they can move to "User" and click "My Profile" to see user information.

#### Example
![](imgMilestone1/profileex.png)

### Pet List

On the right hand side, users can see/add/edit/delete their pets.

#### Example
![](imgMilestone1/petex.png)

### Users List

If users find useful posts and want to contact to the users whom post these posts, users can find these users' information on Users List page.

#### Example
![](imgMilestone1/userslistex.png)

### Log Out

When users click "log out", they will return to the Home page (index.html).

### Set Up for Users Part

I use "yarn" to change ts code to js. To run these codes, first you need to "npm i -g yarn" and run "yarn". Then run "yarn start" at "server" folder.
![](imgMilestone1/setup1.png)
And for html part, you need to run "serve" at "html" folder.
![](imgMilestone1/setup2.png)

Heroku link: https://immense-escarpment-89905.herokuapp.com

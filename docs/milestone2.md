# MyPet
# Wrok Breakdown:
* Peilin Guo:Peilin Guo: Making Back-end Skeleton Code and Front-end Implementation. Writing md file. Helping implement database code.
* Ziwei Hu: Making Navigation bar, background picture, and text, posting area, and posting form. Making a pet service page.
* 


* Part 0: Project API Planning

API flowcharts:
![](imgMilestone1/flowcharts.jpg)

* Part 2: Front-end Implementation

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





Application Structure

1. User Profile Information. 
  After a new user create an account, there should be a profile locate in the datebase which includes four fields: Name, userID ,password, credits and list of services.

2. User-Database interaction
  Service is a relationship between a user and another user. Each searvice has the following fields: ServiceID, userID(provider), ServiceInfo.
  User should be able to find what services they posted and what services they have received. 
  User should be able to see how they received or used their credits. 
  
 Part0: Project API Planning
 All Endpoints
 
Create API:
The create endpoint provides a way for the clients to create a new user with four fields: first name, last name, city and value. 

Endpoint URI and Parameters: localhost:localhost:8080/pet/create?<Parameter>=<Value
 
Parameter: first name, last name , city, value
 
 Responses:
 Key: firstname, lastname, city, value
 Value Type: String
 Description: Basic profile of a user
 
 

 
 Part 1: Back-end Skeleton Code
 
  

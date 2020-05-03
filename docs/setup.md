# MyPet
# setup:
Our project must use this url: http://mypet-final-web.herokuapp.com (http instead of https)

If you want to run our project locally, then

- For the back-end part, we write following code in package.json file.
  ```json
    "scripts": {
    "start": "tsc && node ."
    }
  ```  
- Then, run this code "npm install -g yarn" in your terminal.
- Under the final-server folder, run "yarn" to compile the code.
- Last, for the back-end part, run "yarn start" for running the back-end part code.

- For the front-end part, we write following code in package.json file.
  ```json
    "scripts": {
    "start": "npm install -g serve && serve"
    }
  ```
- Then, under the final-web folder, run "serve" to get a port for the website (usually the port is 5000)
- Now, the website is ready to be used. (make sure that both back-end and front-end code are running)

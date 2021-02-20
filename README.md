# FetchExercise


# How To Run

To run this program, you will need the addition of a third-party program called PostMan

Postman is used so we can test the API endpoints of our server and make sure the return and Requests are correct.
You will sign up for a Postman account and then navigate to workspaces.

The endpoint urls that you will be testing are 

http://localhost:3000/users?points=X

http://localhost:3000/addTransaction?name=NAME&points=NUM

http://localhost:3000/getLedger


First clone the github repo into a directory of your choosing then
cd into the project and run the program with the command **npm start**

If you run into any errors it might be that you are missing the express package in node_modules
in this case you can install with **npm i express** and then run the command above again.

## Add person to ledger
 http://localhost:3000/addTransaction?name=NAME&points=NUM
 
 This is the link you will be entering in postman and then add query parameters 'name' and 'points' replace the values NAME and NUM 
 to whatever value you choose. IMPORTANT: This is a POST request thus you must change the HTTP request in postman to POST.
 
 ## Spend points
 http://localhost:3000/users?points=X
 This is the endpoint that you will enter in postman to spend X number of points among people in the ledger, it will return an array
 of transactions that took place to pay the X number of points. Be sure to add the query parameter 'points' and replace X with any NUM of your choosing
 IMPORTANT: This is a GET request thus you must change the HTTP request in postman to GET.
 
 ## get Ledger
 http://localhost:3000/getLedger
 This is the endpoint that returns the ledger, for this example we were suppose to return the ledger after 'Spend points' happens, 
 I mimicked what happens in Spend points in this method for you already so you just call getLedger.
 IMPORTANT: This is a GET request thus you must change the HTTP request in postman to GET.
 

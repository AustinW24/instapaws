# Flask React Project


## Instapaw

Instapaw is a fullstack PERN app that lets the user create, view, and share content dedicated to their beloved pets.
***

## Brief look at Instapaw

Users are able to upload images with a made caption, and set it in the feed/home page of their account for other users
to view and comment on.
***
![image](https://user-images.githubusercontent.com/67086515/131862103-152784b7-f653-4913-b4f6-71ceb0ec3d90.png)
***
![image](https://user-images.githubusercontent.com/67086515/131862475-e7b807cc-ae79-4e4c-9838-83b03d888b66.png)


### Application Architecture

As mentioned, Instapaw is a fullstack React / Flask application. Most of the logic occurs within the react-redux store and it's 
interactions with your UI as a function of your state, and updates this and the database in response to actions.

The backend serves the frontend, responds to frontend requests, acts as an intermediary to serve the apps data to the frontend, 
and fetches it from the Postgresql database.

![image](https://user-images.githubusercontent.com/67086515/133691300-52404b95-ff56-4ece-a5a5-7878db20d875.png)


### Frontend Overview

Instapaw's frontend logic is made to be as dynamic as possible to create a great user experience.  Below are the frontend 
technologies that make this application what it is.
   ```
## Frontend Technologies Used:

# React

At the base of it's functionality, Instapaw relys on the React framework. It uses very little of the core React library besides passing a few props, without this, creating Instapaw would make for a more extensive challenge.

# Redux

Redux and the react-redux library worked cohesive to manage application state and make fetch requests to the server for data. All of the user's
UI actions are stored as a state, aswell as initial information being fetched on a page load and kept in the Redux store.  By managing this state
using Redux, it gives the user easy access to whatever information that belongs to that component.  This comes in handy when you can thread
data and share between components so you dont have to keep track of multiple states at once.

### Backend Overview

Instapaw uses a Flask server with Postgresql as the database. Much like the frontend, the backend of Instapaw is fairly simple, with the server sending
data to the front end for the client, receiving requests, and sending it back to the frontend. Below are the backend technologies used wiwith an overview
of how they all are utilized.

## Backend Technologies Used:

# Flask

Flask is a lightweight web application framework designed to get results fast and leave room to make the app more detailed in the future.  Flask is
great for providing the bare minimum so you dont have extensive code that you won't be working with any of your features. Building up Instapaw's 
backend is a most known task if you prefer python.

# Postgresql

PostgreSQL backend is a collection of processes that relies on the user When a they initiate a connection to the PostgreSQL database, the client process will send an authentication message to the backend on how to handle that request.  Instapaw uses this to share relations between users, comments, and 
the posts'/content they create.

###Future plans for Instapaw

Instapaw was a fun application to build to really drive home the fundamentals of serving a full-stack application.  As an animal lover who see's
regularly people enamoured with creating instagram pages for their dogs, this seemed like something I can work at and enjoy the process.  This was
my first React-Flask app and great learning experience.

While building Instapaw, I wanted to make it as close to Instagram as possible, first the Users, Second the posts, and third the comments.  As time
goes by, I would like to be able to add a follow feature so users can keep track of posts/users they are interested in.  Adding to that, I would like
to be able to share a liking system, and lastly, a search bar to be able to find specific users.

Thank you for your time!

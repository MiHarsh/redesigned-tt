  
# Redesigned-tt
A platform to help schedule Quizes/ Tests, and extra classes and reduce clashes

## Table of Contents 📕

- [Tools And Technologies](#tools-and-technology)
- [Contributing Guidelines](#contributing-guidelines)
- [Installation or Dev Setup](#setting-up-the-repository-locally)



## Tools and Technology

The front end is created in **React.js** and **Material UI**. For creating backend, we used **Nodejs**. For the database, we used Google Firebase. We created a very flexible and versatile foundation for our codebase, so that in future its functionality could be easily extended and new agents could be easily added into it.


## Contributing Guidelines

1. This repository consists of 2 directory `frontend`,`backend`.
2. The `frontend` directory the frontent code written in React.
3. The `backend` contains webpages backend `nodejs` .
4. So, commit code to the corresponding services.

### Setting up the repository locally

1. Fork the repo to your account.

2. Clone your forked repo to your local machine:
```
git clone https://github.com/MiHarsh/redesigned-tt.git (https)
```
or
```
git clone git@github.com:MiHarsh/redesigned-tt.git (ssh)
```
This will make a copy of the code to your local machine.

3. Change directory to `redesigned-tt`.
```
cd redesigned-tt
```

4. Check the remote of your local repo by:
```
git remote -v
```
It should output the following:
```
origin	https://github.com/<username>/redesigned-tt.git (fetch)
origin	https://github.com/<username>/redesigned-tt.git (push)
```
or
```
origin	git@github.com:<username>/redesigned-tt.git (fetch)
origin	git@github.com:<username>/redesigned-tt.git (push)
```
Add upstream to remote:
```
git remote add upstream https://github.com/MiHarsh/redesigned-tt.git (https)
```
or
```
git remote add upstream git@github.com:MiHarsh/redesigned-tt.git (ssh)
```
Running `git remote -v` should then print the following:
```
origin	https://github.com/<username>/redesigned-tt.git (fetch)
origin	https://github.com/<username>/redesigned-tt.git (push)
upstream	https://github.com/MiHarsh/redesigned-tt.git (fetch)
upstream	https://github.com/MiHarsh/redesigned-tt.git (push)
```
or
```
origin	git@github.com:<username>/redesigned-tt.git (fetch)
origin	git@github.com:<username>/redesigned-tt.git (push)
upstream	git@github.com:MiHarsh/redesigned-tt.git (fetch)
upstream	git@github.com:MiHarsh/redesigned-tt.git (push)
```
## 


### Method 1

#### Pre-requisites

1. Install `concurrently` by running `npm run pre-install` on terminal.

#### Steps

1. Make sure you are inside the root of the project (i.e., `./redesigned-tt/` folder).
2. Setup environment variables in `.env` files of all folders according to `.env.sample` files.
3. Run `npm run start-with-install` to install all the dependencies and run frontend and backend concurrently.
4. The website would then be available locally at `http://localhost:3000/`.
5. If you have already installed the dependencies, you can also run `npm run start` to run the frontend and backend concurrently.

### Method 2 : Setup services independently

#### Pre-requisites
1. Download and Install [Nodejs](https://nodejs.org/en/download)

#### Setup Node Backend

1. Run `cd .\backend` to go inside the Node.js server folder for Windows or
Run `cd backend` to go inside the Node.js server folder for Linux.
3. Run `npm install` to install all the dependencies.
4. Create a new file named `.env` and add the environment variables according to `.env.sample` file.
5. Run `npm start` to start the node backend server.

#### Setup Frontend

1. Run `cd frontend` to go inside the frontend folder.
2. Run `npm install` to install all the dependencies.
3. Create a new file named `.env` and add the environment variables according to `.env.sample` file.
4. Run `npm start` to start the frontend backend server.



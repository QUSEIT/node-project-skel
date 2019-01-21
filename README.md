## develop with docker

### 0 setup required variable
`cp docker/development/.env.docker .env`

### 1 build docker container
`npm run build:docker` 

### 2 restart if codes changed
`npm run start:docker`

### 3 stop all docker container
`npm run stop:docker`

## develop without docker

### 0 setup required variable
`cp .env.default .env`

### 1 start reference services

#### start with docker 
`npm run start:refs`

#### start services manually 
1. installl mongodb and start it

### 3 start api service
`npm start`
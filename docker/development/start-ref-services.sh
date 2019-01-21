#! /bin/bash

# start the reference services

echo "--------->install reference service..."
# mongo

if docker image ls | grep -i mongo; then
  if docker ps -a | grep -i mongo-node; then
    echo "--------->restart mongodb"
    docker restart mongo-node
  else
    echo "--------->start mongodb"
    docker run -d --name mongo-node -v ~/mongo:/root -p 27017:27017 mongo
  fi
else
  echo "--------->install mongodb"
  docker pull mongo
  echo "--------->start mongodb"
  docker run -d --name mongo-node -v ~/mongo:/root -p 27017:27017 mongo
fi
echo "mongo is running"
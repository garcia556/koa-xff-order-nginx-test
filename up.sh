#!/bin/bash

source .env

# install node modules
docker run						\
	--volume $(pwd)/app:/app	\
	--workdir /app				\
	node:${VER_NODE}-alpine		\
	npm install

docker-compose up -d


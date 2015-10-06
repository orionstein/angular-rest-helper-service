LIB_NAME := angular-api-helper
BUILD_DIR := dist

all: 

build:
	sudo docker build -t $(LIB_NAME) --rm=true .
	sudo docker run -it -d --name $(LIB_NAME)-run $(LIB_NAME) gulp
	sudo rm -rf ./$(BUILD_DIR)
	sudo docker cp $(LIB_NAME)-run:/usr/src/app/$(BUILD_DIR) .
	sudo docker stop $(LIB_NAME)-run
	sudo docker rm $(LIB_NAME)-run

init:
	sudo docker build -t $(LIB_NAME) --rm=true .
	sudo docker run -it --name $(LIB_NAME)-run $(LIB_NAME) /bin/sh
	sudo docker cp $(LIB_NAME)-run:/usr/src/app/karma-conf.js .
	sudo docker stop $(LIB_NAME)-run
	sudo docker rm $(LIB_NAME)-run

test:
	sudo docker build -t $(LIB_NAME) --rm=true .
	sudo docker run -it --rm --name $(LIB_NAME)-run $(LIB_NAME) gulp test

cli:
	sudo docker build -t $(LIB_NAME) --rm=true .
	sudo docker run -it --rm --name $(LIB_NAME)-run $(LIB_NAME) /bin/bash

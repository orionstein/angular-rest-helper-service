LIB_NAME := angular-api-helper
BUILD_DIR := dist

all: build

build:
	sudo docker build -t $(LIB_NAME) --rm=true .
	sudo docker run -it -d --name $(LIB_NAME)-run $(LIB_NAME)
	sudo rm -rf ./$(BUILD_DIR)
	sudo docker cp $(LIB_NAME)-run:/usr/src/app/$(BUILD_DIR) .
	sudo docker stop $(LIB_NAME)-run
	sudo docker rm $(LIB_NAME)-run

NODE = node
NPM = npm
SERVER_FILE = server.js

.DEFAULT_GOAL := help

.PHONY: help install start dev clean test

help:
	@echo "Available commands:"
	@echo "make install - Install dependencies"
	@echo "make start  - Start the server"
	@echo "make clean  - Remove node_modules and package-lock.json"

install:
	$(NPM) install

start:
	$(NODE) websocket-server.js &
	$(NODE) $(SERVER_FILE)


clean:
	rm -rf node_modules
	rm -f package-lock.json

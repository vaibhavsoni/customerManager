NODE_ENV ?= development
REACT_PORT ?= 3000

# Phony targets
.PHONY: all install clean start build help


# Install dependencies
install:
	@echo "Installing dependencies..."
	npm install

# Clean installation
clean:
	@echo "Cleaning up..."
	rm -rf node_modules
	rm -rf build
	rm -f package-lock.json

# Start development server
start:
	@echo "Starting..."
	npm start

# Build for production
build:
	@echo "Building..."
	npm run build


# Help target
help:
	@echo "Available commands:"
	@echo "  make install    - Install project dependencies"
	@echo "  make clean     - Remove node_modules, build directory, and package-lock.json"
	@echo "  make start     - Start the development server"
	@echo "  make build     - Create production build"
	@echo "  make help      - Show this help message"
# Use official Node.js image
FROM node:20

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source code
COPY . .

# Build TypeScript code
RUN npm run build

# Expose port (match your app's port)
EXPOSE 3000

# Start the application
CMD ["node", "dist/server.js"]
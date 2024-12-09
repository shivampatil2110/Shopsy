# Use Node.js base image for building
FROM node:18 as builder

# Set working directory
WORKDIR /app

# Copy frontend files
COPY package*.json ./
RUN npm install
COPY . .

# Build the React app with the environment variable
ARG REACT_APP_SERVER_ADDRESS
ENV REACT_APP_SERVER_ADDRESS=${REACT_APP_SERVER_ADDRESS}
RUN npm run build

# Use Nginx for serving static files
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html

# Expose the Nginx port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

FROM node:latest

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

# RUN npm install
# If you are building your code for production
RUN npm ci --only=production

COPY . .
ENV PORT=8080
ENV NODE_MAILER_PASSWORD=NODE_MAILER_PASSWORD
ENV MY_USERNAME=DB_USER_NAME
ENV PASSWORD=DB_PASSWORD
EXPOSE 8080
CMD ["node", "dist/server.js"]
#lightweight computer running Node.js
FROM node:20-alpine

#folder inside the container named /app
WORKDIR /app

#copy the library lists first
COPY package.json package-lock.json ./

#install all the JavaScript libraries
RUN npm install

#copy all the UI code into the container
COPY . .

# Vite uses port 5173
EXPOSE 5173

#start the Vite server (--host flag makes it visible outside the container)
CMD ["npm", "run", "dev", "--", "--host"]
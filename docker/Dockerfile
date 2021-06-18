# pull official base image
FROM node:16.3-alpine as build

# set working directory
WORKDIR /app
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package*.json ./
RUN npm install --silent
# add app
COPY src .
# build app
RUN npm run build

# # start app
# CMD ["npm", "run", "start"]

# production env
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY index.html .
COPY nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
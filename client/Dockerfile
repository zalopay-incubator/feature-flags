FROM mhart/alpine-node:12

ENV PORT 3000

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
COPY package.json yarn.lock /usr/src/app/
RUN yarn

# Copying source files
COPY . /usr/src/app

# Running the app
CMD "yarn" "start"
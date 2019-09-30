FROM node:dubnium-stretch
WORKDIR /test
COPY ./ /test
EXPOSE 8000
CMD npx babel-node /test/src/bin/www.js

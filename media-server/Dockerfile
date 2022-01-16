FROM node:12
WORKDIR /home/ubuntu/media-handling/media-server
ADD . .
RUN ["npm", "install"]
EXPOSE 7500
CMD ["node", "ServerMain.js"]
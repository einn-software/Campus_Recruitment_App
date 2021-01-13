FROM node

WORKDIR /var/www/html/CRS/Campus_Recruitment_App/backend

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 80

CMD [ "npm" , "start" ]

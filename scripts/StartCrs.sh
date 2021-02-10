#!/bin/bash
cd ../backend/ 
npm stop  #Stopping the service
echo "PM2 service has been stopped" > /var/log/crsStartLog.txt
npm start #Starting the service
if [ $? -eq 0 ]; then
 echo "Server is up and running" > /var/log/crsStartLog.txt
else
 echo "Unable to start PM2 service" > /var/log/crsStartLog.txt
fi
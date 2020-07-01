#!/bin/bash

NAME="crs.js" #File Name
RUN=`pgrep -f $NAME` #Finding the Process id of running program

if [ "$RUN" == "" ]; then
 sh ./StartCRS.sh  #If process is not running run the start script 
else
 echo "Server is running" >> /var/log/crsMonitorLog.txt
fi      
#!/bin/bash

mongo --quiet <<EOF
show dbs;

use auth;
db.dropDatabase();

EOF
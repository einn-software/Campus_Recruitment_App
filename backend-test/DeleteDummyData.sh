#!/bin/bash

mongo --quiet <<EOF
show dbs;

use TestData;
db.dropDatabase();

EOF
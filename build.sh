#!/bin/bash -e

CURRENT=`pwd`

# build backend
cd backend && npm install && npm run build

cd $CURRENT

# build frontend
cd frontend && npm install && npm run build

cd $CURRENT

# copy frontend dist to backend
mkdir -p backend/dist
mv frontend/dist backend/dist/frontend

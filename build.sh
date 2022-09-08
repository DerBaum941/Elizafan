#!/bin/bash

#Prompt token to store
echo "Please provide the Discord Bot Token"
read -p 'Token: ' discord_token

#Ensure repos are current and git is installed
apt-get update
apt-get upgrade -y
apt-get install -y git

#Move Folder
mkdir -p /opt/node/elizafan/
cp -R ./* /opt/node/elizafan/
cd /opt/node/elizafan/

#Just incase
mkdir /opt/node/elizafan/conf
mkdir /opt/node/elizafan/logs
mkdir /opt/node/elizafan/.sqlite
mkdir /opt/node/elizafan/.sqlite/backups

#Save token to file
touch /opt/node/elizafan/.env
echo "DISCORD_TOKEN=$discord_token" > .env

#Install Node
curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
apt-get install -y nodejs
npm install -g npm@latest
apt install build-essential
npm install

#add service user
useradd elizafan
groupadd node
chown -R elizafan:node /opt/node/elizafan/
#make executable
chmod +x /opt/node/elizafan/index.js
touch /etc/systemd/system/elizafan.service
#install service
cp ./elizafan.service /etc/systemd/system/elizafan.service
#start service
systemctl daemon-reload
systemctl enable elizafan
systemctl start elizafan
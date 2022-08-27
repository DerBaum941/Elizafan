#!/bin/bash

#Prompt token to store
echo "Please provide the Discord Bot Token"
read -sp 'Token: ' discord_token

apt-get update
apt-get upgrade -y
#Move Folder
mkdir /opt/node/dadbot
cp -R ./* /opt/node/dadbot/
cd /opt/node/dadbot/
#Just incase
mkdir /opt/node/dadbot/conf
mkdir /opt/node/dadbot/logs
mkdir /opt/node/dadbot/.sqlite
mkdir /opt/node/dadbot/.sqlite/backups

#Save token to file
touch /opt/node/dadbot/.env
echo "DISCORD_TOKEN=$discord_token" > .env

#Install Node
curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
apt-get install -y nodejs
npm install -g npm@latest
apt install build-essential
npm install

#add service user
useradd dadbot
groupadd node
chown -R dadbot:node /opt/node/dadbot/
#make executable
chmod +x /opt/node/dadbot/index.js
touch /etc/systemd/system/dadbot.service
#install service
cp ./dadbot.service /etc/systemd/system/dadbot.service
#start service
systemctl daemon-reload
systemctl enable dairs
systemctl start dairs
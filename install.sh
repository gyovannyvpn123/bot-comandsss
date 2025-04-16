#!/bin/bash
pkg update -y
pkg upgrade -y
pkg install nodejs -y
pkg install git -y
pkg install jq -y
npm install -g npm
npm install @whiskeysockets/baileys
npm install
clear
npm start 

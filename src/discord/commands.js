import Discord from 'discord.js';
import c from '../logman.cjs';
import { bot } from './index.js';

//Hug, Pat, Cuddle, Kiss, Boop
//https://some-random-api.ml/
const COMMANDS = [
{
    name: "hug",
    description: "hug someone",
    type: "CHAT_INPUT",
    options: [{
        name: "User",
        description: "Who you wanna hug",
        type: "USER",
        required: true
    }]
},
{
    name: "pat",
    description: "pat someone",
    type: "CHAT_INPUT",
    options: [{
        name: "User",
        description: "Who you wanna pat",
        type: "USER",
        required: true
    }]
},
{
    name: "cuddle",
    description: "cuddle someone",
    type: "CHAT_INPUT",
    options: [{
        name: "User",
        description: "Who you wanna cuddle",
        type: "USER",
        required: true
    }]
},
{
    name: "kiss",
    description: "kiss someone",
    type: "CHAT_INPUT",
    options: [{
        name: "User",
        description: "Who you wanna kiss",
        type: "USER",
        required: true
    }]
},
{
    name: "boop",
    description: "boop someone",
    type: "CHAT_INPUT",
    options: [{
        name: "User",
        description: "Who you wanna boop",
        type: "USER",
        required: true
    }]
}
];


export function setup() {
    //Clear existing commands
    bot.application.commands.set(COMMANDS);

    c.inf("Successfully registed all commands!");
}
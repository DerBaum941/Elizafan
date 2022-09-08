import Discord from 'discord.js';
import c from '../logman.cjs';
import { bot } from './index.js';
import axios from 'axios';

//Hug, Pat, Cuddle, Kiss, Boop
//https://some-random-api.ml/
var COMMANDS = [
{
    name: "hug",
    description: "hug someone",
    type: 1,
    options: [{
        name: "user",
        description: "Who you wanna hug",
        type: 6, //User
        required: true
    }]
},
{
    name: "pat",
    description: "pat someone",
    type: 1,
    options: [{
        name: "user",
        description: "Who you wanna pat",
        type: 6, //User
        required: true
    }]
}
];

const Picked_Endpoints = [
    "blush",
    "confused",
    "cry",
    "cuddle",
    "evillaugh",
    "facepalm",
    "handhold",
    "hug",
    "kiss",
    "lick",
    "love",
    "mad",
    "nervous",
    "no",
    "nom",
    "pat",
    "peek",
    "poke",
    "pout",
    "shrug",
    "sigh",
    "sweat",
    "yes"
].slice(0,24);


export async function setup() {

    //Setup gifs command
    const result = await axios.get('https://api.otakugifs.xyz/gif/allreactions');
    if (result.status==200) {

        var choices = [];
        result.data.reactions.forEach(react => {
            if (Picked_Endpoints.includes(react)) {
                choices.push({name: react, value: react});
            }
        });

        const gifs = {
            name: "gifs",
            description: "reactions gifs",
            type: 1,
            options:[
                {
                    name: "user",
                    description: "Who you wanna react to",
                    type: 6, //User
                    required: true
                },
                {
                    name: "gif",
                    description: "Choose what kind of gif to use",
                    type: 3, //String
                    choices: choices,
                    required: true
                }
            ]
        };

        COMMANDS.push(gifs);
    } else {
        c.inf("Couldn't access Endpoint otakugifs, skipping.");
    }
    
    //Override existing commands
    bot.application.commands.set(COMMANDS);

    c.inf("Successfully registed all commands!");
}
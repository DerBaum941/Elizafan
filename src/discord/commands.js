import Discord from 'discord.js';
import c from '../logman.cjs';
import { bot } from './index.js';
import axios from 'axios';

//Hug, Pat, Cuddle, Kiss, Boop
//https://some-random-api.ml/
const COMMANDS = [
{
    name: "hug",
    description: "hug someone",
    type: "CHAT_INPUT",
    options: [{
        name: "user",
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
        name: "user",
        description: "Who you wanna pat",
        type: "USER",
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
    //Override existing commands
    bot.application.commands.set(COMMANDS);

    //Setup gifs command
    const result = await axios.get('https://api.otakugifs.xyz/gif/allreactions');
    if (result.status==200) {
        const { reactions } = result;

        var choices = [];
        reactions.forEach(react => {
            if (Picked_Endpoints.includes(react)) {
                choices.push({name: react, value: react});
            }
        });

        const gifs = {
            name: "gifs",
            description: "reactions gifs",
            type: "CHAT_INPUT",
            options:[
                {
                    name: "user",
                    description: "Who you wanna react to",
                    type: "USER",
                    required: true
                },
                {
                    name: "gif",
                    description: "Choose what kind of gif to use",
                    type: "STRING",
                    choices: choices,
                    required: true
                }
            ]
        };

        bot.application.commands.create(gifs);
    } else {
        c.inf("Couldn't access Endpoint otakugifs, skipping.");
    }

    c.inf("Successfully registed all commands!");
}
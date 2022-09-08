import Discord from 'discord.js';
import c from '../logman.cjs';
import { bot } from './index.js';

/*
 *  This section contains individual functions to respond to each command
 */

async function hug(interaction) {
    
}

async function pat(interaction) {

}

async function cuddle(interaction) {

}

async function kiss(interaction) {

}

async function boop(interaction) {

}


//Dictionary of pointers to the commands
const CommandFunctions = [
    "hug" = hug,
    "pat" = pat,
    "cuddle" = cuddle,
    "kiss" = kiss,
    "boop" = boop
];

//Generic response function
export async function interact(interaction) {
    if (!interaction.isChatInputCommand()) return;

    //Call the appropriate function from the array
    CommandFunctions[interaction.commandName](interaction);
}
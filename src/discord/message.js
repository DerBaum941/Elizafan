import Discord, { messageLink } from 'discord.js';
import c from '../logman.cjs';
import { bot } from './index.js';

bot.on("messageCreate", message);
bot.on("messageCreate", mentioned);

async function message(msg) {
    //Don't reply to anything the Bot sends, just in case
    if (msg.author == bot.user) return;

    //Do stuff here

};

async function mentioned(msg) {
    //Don't reply to anything the Bot sends, just in case
    if (msg.author == bot.user) return;

    //Bot is mentioned in Ping or Reply
    //This can always be read (Even without the intent)
    if (msg.mentions.has(bot.user)) {

        //Do stuff here
        

    }
}

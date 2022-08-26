import Discord from 'discord.js';
import c from '../logman.js';

const intents = [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.GuildMessageReactions,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.DirectMessages
]

const bot = new Discord.Client({intents});



function init() {
    bot.login(process.env.DISCORD_TOKEN);
}
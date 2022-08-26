import Discord from 'discord.js';
import c from '../logman.cjs';

const intents = [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.GuildMessageReactions,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.DirectMessages
]
const presence = {
    status: 'dnd',
    activities: [{
        name: 'your mom.',
        type: Discord.ActivityType.Watching
    }]
}

export const bot = new Discord.Client({intents,presence});

export function init() {
    bot.login(process.env.DISCORD_TOKEN);
    import("./interact.js");
    import("./message.js");
}

bot.once("ready", ()=>{
    c.inf(`Logged into Discord API as ${bot.user.tag}`);
})
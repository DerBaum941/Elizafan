import Discord from 'discord.js';
import c from '../logman.cjs';

const intents = [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages
]
const presence = {
    status: 'online',
    activities: [{
        name: 'with kitties!!',
        type: Discord.ActivityType.Playing
    }]
}

export const bot = new Discord.Client({intents,presence});

export async function init() {
    bot.once("ready", ()=>{
        c.inf(`Logged into Discord API as ${bot.user.tag}`);
    })
    
    const cmds = await import("./commands.js");
    bot.once("ready",cmds.setup);

    const inter = await import("./interact.js");
    //Set our response function to the event emitter
    bot.on("interactionCreate",inter.interact);

    const msg = await import("./message.js");
    //Set message response to events
    bot.on("messageCreate", msg.message);
    bot.on("messageCreate", msg.mentioned);

    //Finally, Log in for real
    bot.login(process.env.DISCORD_TOKEN);
}
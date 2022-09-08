import Discord from 'discord.js';
import c from '../logman.cjs';
import { bot } from './index.js';
import axios from 'axios';

const { EmbedBuilder } = Discord;

async function fetch_random_api(endpoint) {
    const url = `https://some-random-api.ml/animu/${endpoint}`;
    const res = await axios.get(url);
    if (res.status != 200) return null;
    return res.data.link;
}
async function fetch_otakugifs_api(endpoint) {
    const url = `https://api.otakugifs.xyz/gif?reaction=${endpoint}`;
    const res = await axios.get(url);
    if (res.status != 200) return null;
    return res.data.url;
}

/*
 *  This section contains individual functions to respond to each command
 */

async function hug(interaction) {
    const url = await fetch_random_api("hug");
    var desc = `${interaction.__caster.name} hugs ${interaction.__target.name} (づ｡◕‿‿◕｡)づ`;
    if (interaction.__caster.id == interaction.__target.id) {
        desc = `${interaction.__caster.name} really needs a hug right now!\nGo on and help them to it <3 <3`;
    }
    const embed = new EmbedBuilder()
        .setColor(0xf218ca)
        .setTitle("Some hugs for you! <3")
        .setDescription(desc)
        .setFooter({text: "<3 <3 <3"})
        .setImage(url);

    interaction.reply({embeds: [embed]});
}

async function pat(interaction) {
    const url = await fetch_random_api("pat");
    var desc = `${interaction.__caster.name} pats ${interaction.__target.name} <3\nYou're amazing ${interaction.__target.name}!`;
    if (interaction.__caster.id == interaction.__target.id) {
        desc = `We know you are great ${interaction.__caster.name}\nHave some free pats <3 <3`;
    }
    const embed = new EmbedBuilder()
        .setColor(0xf218ca)
        .setTitle("Some pats for you! <3")
        .setDescription(desc)
        .setFooter({text: "<3 <3 <3"})
        .setImage(url);

    interaction.reply({embeds: [embed]});
}

//Use new endpoint
async function gifs(interaction) {
    const gif = interaction.options.getString("gif");
    const url = await fetch_otakugifs_api(gif);
    var desc = `${interaction.__caster.name} used ${gif} on ${interaction.__target.name}\nIt's super effective!`;
    if (interaction.__caster.id == interaction.__target.id) {
        desc = `${interaction.__caster.name} hurt themselves in their confusion!\nWill someone help them to a ${gif}? :3`;
    }

    const embed = new EmbedBuilder()
        .setColor(0xf218ca)
        .setTitle(`A ${gif} for you! <3`)
        .setDescription(desc)
        .setFooter({text: "<3 <3 <3"})
        .setImage(url);
        interaction.reply({embeds: [embed]});
}


//Dictionary of pointers to the commands
const CommandFunctions = {
    "hug": hug,
    "pat": pat,
    "gifs": gifs
};

//Generic response function
export async function interact(interaction) {
    if (!interaction.isChatInputCommand()) return;

    //Do some handy prep work
    const inGuild = interaction.inGuild();

    if (inGuild) {
        interaction.__caster = interaction.member;
        interaction.__caster.name = interaction.__caster.displayName;
        interaction.__target = interaction.options.getMember("user");
        interaction.__target.name = interaction.__target.displayName;
    } else {
        interaction.__caster = interaction.user;
        interaction.__caster.name = interaction.__caster.username;
        interaction.__target = interaction.options.getUser("user");
        interaction.__target.name = interaction.__target.username;
    }

    //Call the appropriate function from the array
    CommandFunctions[interaction.commandName](interaction);
}
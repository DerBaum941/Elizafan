import { MessageEmbed } from 'discord.js';
import c from '../logman.cjs';
import { bot } from './index.js';
import axios from 'axios';

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
    const embed = new MessageEmbed()
        .setColor(0xf218ca)
        .setTitle("Some hugs for you! <3")
        .setDescription(`${interaction.__caster.name} hugs ${interaction.__caster.name}`)
        .setFooter({text: "<3 <3 <3"})
        .setImage(url);

    interaction.reply({embeds: [embed]});
}

async function pat(interaction) {
    const url = await fetch_random_api("hug");
    const embed = new MessageEmbed()
        .setColor(0xf218ca)
        .setTitle("Some hugs for you! <3")
        .setDescription(`${interaction.__caster.name} hugs ${interaction.__caster.name}`)
        .setFooter({text: "<3 <3 <3"})
        .setImage(url);

    interaction.reply({embeds: [embed]});
}

//Use new endpoint
async function gifs(interaction) {
    const gif = interaction.options.getString("gif");
    const url = await fetch_otakugifs_api(gif);

    const embed = new MessageEmbed()
        .setColor(0xf218ca)
        .setTitle(`Some ${gif}ies for you! <3`)
        .setDescription(`${interaction.__caster.name} used ${gif} on ${interaction.__caster.name}\nIt's super effective!`)
        .setFooter({text: "<3 <3 <3"})
        .setImage(url);
        interaction.reply({embeds: [embed]});
}


//Dictionary of pointers to the commands
const CommandFunctions = [
    "hug" = hug,
    "pat" = pat,
    "gifs" = gifs
];

//Generic response function
export async function interact(interaction) {
    if (!interaction.isChatInputCommand()) return;

    //Do some handy prep work
    const inGuild = interaction.inGuild();

    if (inGuild) {
        interaction.__caster = interaction.member;
        interaction.__caster.name = interaction.__caster.displayName;
        interaction.__caster = interaction.options.getMember("user");
        interaction.__caster.name = interaction.__caster.displayName;
    } else {
        interaction.__caster = interaction.user;
        interaction.__caster.name = interaction.__caster.username;
        interaction.__caster = interaction.options.getUser("user");
        interaction.__caster.name = interaction.__caster.username;
    }

    //Call the appropriate function from the array
    CommandFunctions[interaction.commandName](interaction);
}
const Discord = require("discord.js");
const { Client, Intents, GatewayIntentBits, PermissionFlagsBits } = require('discord.js');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ActionRow } = require("discord.js")
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
//const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const config = require("./config.json");
const fs = require("fs")
client.login(config.token);
module.exports = client;
client.commands = new Discord.Collection();
client.slashCommands = new Discord.Collection();
client.config = require("./config.json");
require("./handler")(client);
const { glob } = require("glob");
const { promisify } = require("util");

const globPromise = promisify(glob);

fs.readdir('./events/', (err, file) => {
  file.forEach(event => {
    require(`./events/${event}`)
  })
}) 
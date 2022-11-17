const Discord = require("discord.js");
const { Client, Intents, GatewayIntentBits, PermissionFlagsBits } = require('discord.js');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js")
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const config = require("./config.json");

client.login(config.token);



module.exports = client;
client.commands = new Discord.Collection();
client.slashCommands = new Discord.Collection();
client.config = require("./config.json");
require("./handler")(client);
const { glob } = require("glob");
const { promisify } = require("util");

const globPromise = promisify(glob);

client.once('ready', async () => {
    console.log("✅ - Logado em " + client.user.username + " com sucesso!")
    let idoi = 'online' //idle, dnd, online, invisible
    let atividade = `PLAYING` //WATCHING, LISTENING, PLAYING, STREAMING
    let tempo = 5000 // tempo de troca em milisegundos
    let activities = [`Ubanana`];

    i = 0;
    setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`, { type: atividade }), tempo);
    client.user.setStatus(`${idoi[Math.floor(Math.random() * idoi.length)]}`)
})


client.on("interactionCreate", async (interaction) => {
    if (!interaction.guild) return;

    if (interaction.isCommand()) {

        const cmd = client.slashCommands.get(interaction.commandName);

        if (!cmd)
            return;

        const args = [];

        for (let option of interaction.options.data) {

            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }

        cmd.run(client, interaction, args);
    }

    if (interaction.isContextMenuCommand()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);

    }
});

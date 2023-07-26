const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");
const globPromise = promisify(glob);
const fs = require("fs")
/**
 * @param {Client} client
 */
module.exports = async (client) => {
    const slashCommands = await globPromise(
        `${process.cwd()}/SlashCommands/*/*.js`
    );
    console.log('Comandos carregados com sucesso.');
const arrayOfSlashCommands = [];
slashCommands.map((value) => {
    const file = require(value);
    if (!file?.name) return;
    client.slashCommands.set(file.name, file);
    
    if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
    arrayOfSlashCommands.push(file);
    });
    client.on("ready", async () => {
        await client.application.commands.set(arrayOfSlashCommands);
        
    });

};

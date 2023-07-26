const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "ping",
    description: "Veja meu ping.",
    type: 1,

    run: async (client, interaction, args) => {
        let embed = new EmbedBuilder()
            .setDescription(`**\\📡 Meu ping está em** \`${client.ws.ping}ms\`**.**`);
        interaction.reply({ embeds: [embed], ephemeral: true })

    }
}




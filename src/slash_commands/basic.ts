import {Client} from 'discord.js';

export async function client_commands(client: Client) {
    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isCommand()) {
            return;
        }
        if (interaction.commandName == 'ping') {
            await interaction.reply('pong');
        }
    })
}
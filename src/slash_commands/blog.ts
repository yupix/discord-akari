import {Client} from 'discord.js';
import {prisma} from "../db";

export async function blog_commands(client: Client) {
    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isCommand()) {
            return;
        }
        if (interaction.commandName == 'blog') {
            if (interaction.options.getSubcommand() == 'register') {
                const user = await prisma.blogUser.findUnique({where: {userId: interaction.user.id}})
                if (!user) {
                    await prisma.blogUser.create({data: {userId: interaction.user.id}})
                }

                const blog = await prisma.blog.findUnique({where: {channelId: interaction.channelId}})
                if (!blog) {
                    await prisma.blog.create({data: {ownerId: interaction.user.id, channelId: interaction.channelId}})
                    await interaction.reply('You have successfully registered your blog.');
                } else {
                    await interaction.reply('You have already registered blog.');
                }
            }
        }
    })
}

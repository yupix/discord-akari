import {Client, Intents, Message} from 'discord.js';
import dotenv from 'dotenv';
import {client_commands} from "./slash_commands/basic";
import {blog_commands} from "./slash_commands/blog";
import {commands} from "./slash_commands/schema";
import {Routes} from "discord-api-types/v9";

const {REST} = require('@discordjs/rest');

dotenv.config();
const MyIntents = new Intents();
MyIntents.add(
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING,
)
const client = new Client({
    intents: MyIntents,
    partials: ["CHANNEL"]
})

client.once('ready', async () => {
    console.log('Ready!')
    if (client.user) {
        console.log(client.user.tag)
    }
    for (const command of slash_commands) {
        console.log(command)
        await command(client)
    }
})

client.on('messageCreate', async (message: Message) => {
    if (message.author.bot) return
    console.log(message.author.username, message.content)
})

const slash_commands = [client_commands, blog_commands]
const rest = new REST({version: '9'}).setToken(process.env.TOKEN);
if (!process.env.CLIENT_ID) process.exit(1)
if (!process.env.GUILD_ID) process.exit(1)
rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), {'body': commands})

client.login(process.env.TOKEN)

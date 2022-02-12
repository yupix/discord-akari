import {SlashCommandBuilder, SlashCommandSubcommandBuilder} from "@discordjs/builders";

export const commands = [
    new SlashCommandBuilder()
        .setName('blog')
        .setDescription('ブログに関するコマンド')
        .addSubcommand((subcommand: SlashCommandSubcommandBuilder) =>
            subcommand.setName('register')
                .setDescription('ブログを登録します')
        ),
    new SlashCommandBuilder()
        .setName('ping')
        .setDescription('ping pong')
].map(command => command.toJSON());
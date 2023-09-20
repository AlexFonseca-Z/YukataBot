require('dotenv').config();

const {Client, GatewayIntentBits, EmbedBuilder, SlashCommandBuilder, PermissionsBitField, Permissions} = require('discord.js');
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});

client.on("ready", (x) => {
    console.log(`${x.user.tag} is ready!`);
    client.user.setActivity(`I'm in danger`);

    const ping = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('This is a ping command!');

    client.application.commands.create(ping);
})

client.login(process.env.TOKEN);
require('dotenv').config();

const {Client, GatewayIntentBits, EmbedBuilder, SlashCommandBuilder, PermissionsBitField, Permissions} = require('discord.js');
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});

client.on("ready", (x) => {
    console.log(`${x.user.tag} is ready!`);
    client.user.setActivity(`I'm in danger`);

    const ping = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('This is a ping command!');

    const hello = new SlashCommandBuilder()
    .setName('hello')
    .setDescription('This is a hello command!');

    const bye = new SlashCommandBuilder()
    .setName('bye')
    .setDescription('This is a bye command!');

    client.application.commands.create(ping);
    client.application.commands.create(hello);
    client.application.commands.create(bye, 1104250328255307776);
})

client.on('interactionCreate',  (interaction) => {
    if(!interaction.isChatInputCommand()) return;
    if(interaction.commandName==='ping') {
        interaction.reply('Pong!');
    }
    if(interaction.commandName==='hello') {
        interaction.reply('Hai!');
    }
    if(interaction.commandName==='bye') {
        interaction.reply('Bai!');
    }
})

client.login(process.env.TOKEN);
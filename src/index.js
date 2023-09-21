require('dotenv').config();

const {Client, Events, GatewayIntentBits, EmbedBuilder, SlashCommandBuilder, PermissionsBitField, Permissions} = require('discord.js');
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});

client.on(Events.ClientReady, (x) => {
    console.log(`${x.user.tag} is ready!`);
    client.user.setActivity(`I'm in danger`);

    //PING COMMAND
    const ping = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('This is a ping command!');

    //HELLO COMMAND
    const hello = new SlashCommandBuilder()
    .setName('hello')
    .setDescription('This is a hello command!')
    .addUserOption(option =>
        option
        .setName('user')
        .setDescription('The user to be greeted')
        .setRequired(false)
        )
        
    //BYE COMMAND
    const bye = new SlashCommandBuilder()
    .setName('bye')
    .setDescription('This is a bye command!')
    .addUserOption(option =>
        option
        .setName('user')
        .setDescription('The user to be greeted')
        .setRequired(false)
        )

    const add = new SlashCommandBuilder()
    .setName('add')
    .setDescription('This command will allow you to add two numbers')
    .addNumberOption(option =>
        option
        .setName('first_number')
        .setDescription('This is the first number')
        .setRequired(true)
        )
    .addNumberOption(option =>
        option
        .setName('second_number')
        .setDescription('This is the second number')
        .setRequired(true)
        )

    client.application.commands.create(ping);
    client.application.commands.create(hello, '1104250328255307776');
    client.application.commands.create(bye, '1104250328255307776');
    client.application.commands.create(add);

})

client.on('interactionCreate',  (interaction) => {
    if(!interaction.isChatInputCommand()) return;
    if(interaction.commandName==='ping') {
        interaction.reply('Pong!');
    }
    if(interaction.commandName==='hello') {
        const userOption = interaction.options.getUser('user');
        if(userOption){
            interaction.reply(`Hello, ${userOption.toString()}!`)
        }
        else{
            interaction.reply('Hai!');
        }
    }
    if(interaction.commandName==='bye') {
        const userOption = interaction.options.getUser('user');
        if(userOption){
            interaction.reply(`Bai, ${userOption.toString()}!`)
        }
        else{
            interaction.reply('Bai!');
        }
    }

    if(interaction.commandName==='add'){
        const firstNumber = interaction.options.getNumber('first_number');
        const secondNumber = interaction.options.getNumber('second_number');

        if(isNaN(firstNumber) || isNaN(secondNumber)){
            interaction.replied('Please enter a valid number')
        }else{
            const result = firstNumber + secondNumber;
            interaction.reply(`The sum of ${firstNumber} and ${secondNumber} is ${result}`);
        }
    }
})

client.login(process.env.TOKEN);
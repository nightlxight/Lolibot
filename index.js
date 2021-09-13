var fs = require('fs');
const { token } = require('./data/app/token.json');
const { client_id } = require('./data//app/client_id.json');
const { guild_id } = require('./data/app/guild_id.json');
const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

client.once('ready', () => {
    let { onReadyWhenSuccessful } = require('./config/onReady/successful.json');
    console.log(onReadyWhenSuccessful);
    console.log(`Logged in as ${client.user.tag}`);
});


client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if(!command) return;
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error('There was an error!');
        console.error(error);
        return interaction.reply({ content: 'There was an error!', ephemeral: true });
    }
});

client.login(token);
var fs = require('fs');
const { token } = require('./data/app/token.json');
const { client_id } = require('./data//app/client_id.json');
const { guild_id } = require('./data/app/guild_id.json');
const { Client, Collection, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
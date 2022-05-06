import { Client, Intents } from 'discord.js';
import {config} from 'dotenv';
import commandCreate from './src/events/command-create';
import menuSelecCreate from './src/events/menu-select-create';
import messageCreate from './src/events/message-create'
import ready from './src/events/ready';

config();

//Initialize DB
require('./src/utilities/database')();

const token = process.env.DISCORD_TOKEN;

export const client: Client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });

client.on('interactionCreate', (args) => commandCreate(args));
client.on('interactionCreate', (args) => menuSelecCreate(args));
client.on('messageCreate', (args) => messageCreate(args));
client.once('ready', (args) => ready(args));

client.login(token);
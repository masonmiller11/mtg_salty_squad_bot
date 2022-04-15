import { Client, Intents, Collection } from 'discord.js';
import 'dotenv/config';
import fs from 'node:fs';
import ping from './commands/ping.js';

const commands = new Collection();
commands.set(ping.data.name, ping);

export default commands;
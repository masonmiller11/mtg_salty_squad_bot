
# MTG Salty Bot!
Hey! Welcome! Enjoy your stay. Any feedback is always appreciated! 

## Project Description
I enjoy the popular trading card game Magic The Gathering, and I love playing paper magic with friends. Recently we started playing Magic
over the internet with [spelltable](https://spelltable.wizards.com/). This is a simple discord bot to keep track of wins, losses, and other stats for the group.

![Discord Demo](https://media.giphy.com/media/crjjQkPrq77Aux5THe/giphy.gif)

### Setup
 
Setting up the bot is pretty simple! Just compile and use ```node index.js`` in the root directory. If you want to skip compiling,
you can use ```ts-node index.ts```, which is helpful for development.

Aside from that, all you need to do is create a new .env file and replace the values included in the .env.example file.

### Commands & Use

Here's a quick rundown of the commands and how to use the bot:

- Start a game with the /play edh command. The command has 2-5 inputs to add users as players. Then the bot will listen
for a message containing the players' commanders delineated by a pipe("|") and register them to the players.

- End a game with /end game. The bot will ask you who won the game in a dropdown menu. Don't forget to select the winner!

- There are two /stats subcommands. /stats player and /stats commander.

- If you forget to add a commander in response to the /play command, then you can set Commanders using /set commander. In order to use /set commander, you'll first need to enter the commander into the bot's database (if it isn't already there) using /add commander. You can also use /set commander to change a player's commander. Keep in mind that you can't change a player's commander once the game has ended!
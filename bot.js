/* Required */
fs = require('fs')
kick = require("./commands/kick.js")

/* Bot init */
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const token = fs.readFileSync('./token', 'utf8')

/* On startup */
client.once('ready', () => {
   console.log('Félicitations, votre bot Discord a été correctement initialisé !');
});

client.login(token);

// On message
client.on("message", message => {
    if (message.content === "!ping") {
      message.channel.send("Pong.");
    }
});



/* Commands */
// Kick

module.exports = (client, message) => {
  if (message.content.startsWith("!kick")) {
    return kick(message);
  }
}
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

/* Commands */
// Kick

module.exports = (client, message) => {
    if (message.content.startsWith("!kick")) {
      console.log('kick ' + message)
      return kick(message);
    }
  }


// On message
client.on("message", message => {
    console.log(`${message}, ${message.author}, ${message.channel.name}, ${message.createdAt}, ${message.deletable}`)
    if (message.content === "!ping") {
      message.channel.send("Pong.");
    }
    module.exports
});





// On new member
client.on("guildMemberAdd", async member => {
    const channel = member.guild.channels.cache.find(
      ch => ch.name === "welcome"
    )
    if (!channel) return
  
    const canvas = Canvas.createCanvas(700, 250)
    const ctx = canvas.getContext("2d")
  
    const background = await Canvas.loadImage("./wallpaper.jpg")
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
  
    ctx.strokeStyle = "#74037b"
    ctx.strokeRect(0, 0, canvas.width, canvas.height)
  
    // Texte générique d'introduction avant le nom d'utilisateur
    ctx.font = "28px sans-serif"
    ctx.fillStyle = "#ffffff"
    ctx.fillText(
      "Bienvenue sur le serveur,",
      canvas.width / 2.5,
      canvas.height / 3.5
    )
  
    // Ajouter le nom d'utilisateur
    ctx.font = applyText(canvas, `${member.displayName}`)
    ctx.fillStyle = "#ffffff"
    ctx.fillText(
      `${member.displayName}!`,
      canvas.width / 2.5,
      canvas.height / 1.8
    )
  
    ctx.beginPath()
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.clip()
  
    const avatar = await Canvas.loadImage(
      member.user.displayAvatarURL({ format: "jpg" })
    )
    ctx.drawImage(avatar, 25, 25, 200, 200)
  
    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      "bienvenue-image.jpg"
    )
  
    channel.send(`Bienvenue sur le serveur, ${member}!`, attachment)
  })
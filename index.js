const express = require("express");
const app = express();
const Discord = require("discord.js");
const client = new Discord.Client();

app.get("/", (req, res, next) => {
  let message = "DND!!! Working at Thermal Discord Server.";
  console.log(message);
  res.send(message);
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("guildMemberAdd", member => {
  let isBot = member.user.bot;
  if (!isBot) {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.find(ch => ch.name === "general");
    // Do nothing if the channel wasn't found on this server
    if (!channel) console.log(`Unble to find "general" channel.`);
    // Send the message, mentioning the member
    let welcomeMessage = `Welcome to Thermal Discord Server, ${member}`;
    channel.send(welcomeMessage).then(console.log(`Send message: ${welcomeMessage}`));
  }
});

client.on("message", message => {
  // Valid command
  let isBot = message.author.bot;
  if (!isBot && message.content.charAt(0) === "!") {
    
    // Custom referral url for analytics
    let referralUrl = "?utm_source=discord&utm_medium=thermalbot"

    switch (message.content.slice(1, message.content.length)) {
      case "about":
        message.channel.send(`Thermal is a free, open-source and cross-platform desktop application allows you to manage your Git repositories at one place by providing a simple to use graphic interface with built-in features like commits, history, repository settings and more.\n\nhttps://thermal.codecarrot.net/${referralUrl}`)
        break;
      case "contribute":
        message.channel.send(`Glad! You are interested in contributing to Thermal project, to know about contribution guidelines, please read our docs https://thermal.codecarrot.net/docs/how-to-contribute/${referralUrl}`)
        break;
      default:
        message.channel.send(`Here's the list of the following commands you can use in Thermal Discord Server https://github.com/gitthermal/discord-bot/blob/master/README.md/${referralUrl}`)
        break;
    }
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);

app.listen(8000, () => {
  console.log(process.env.PORT)
})
require('dotenv').config();

const { Client } = require('discord.js');
const client = new Client();
const PREFIX = "$";

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in`);
});

client.on('message', (message) => {
    if(message.author.bot) return;
    if(message.content.startsWith(PREFIX)){
        const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);
        if(CMD_NAME === 'kick'){
            if(message.member.hasPermission("KICK_MEMBERS"))
                return message.reply("You do not have permissions to use that command");
            if (args.length === 0 ) return message.reply ("Please provide an ID");
            const member = message.guild.members.cache.get(args[0])
            if(member){
                member
                    .kick()
                    .then((member) => message.channel.send(`${member} was kicked`))
                    .catch((err) => message.channel.send("You do not have permissions to kick this user."))
            } else{
                message.channel.send("Member was not found");
            }
        }
        else if(CMD_NAME === 'ban'){
            message.channel.send("banned the user")
        }
    }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);

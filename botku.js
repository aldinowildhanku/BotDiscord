const Discord = require("discord.js");

const { measureMemory } = require("vm");
const Client = new Discord.Client();
const ytdl = require('ytdl-core')
const {prefix,token} = require("./config.json"); 
const { error } = require("console");
var queue = new Map()

// const prefix = "!!";
var prefix2 = "!!";//prefix say
var prefix1 = "/";//prefix ping
Client.login("Token");
//cek console
Client.on('ready',()=>{
    console.log("Bot Dinotrostore is online");
    Client.user.setActivity('DINOTROSTORE', {type: 'STREAMING', url:'https://www.twitch.tv/dinoku12' });
})



//say commandsdas
Client.on('message', message =>{
    const user = message.author.username
    
    if(message.content.startsWith(`${prefix2}say`)){
        
        var text = message.content.split(' ').slice(1).join(' ');
        if(!text) return message.reply('Spicify')
         message.delete();
         var embed = new Discord.MessageEmbed()
                .setAuthor(`Notification From ${user}`, message.author.displayAvatarURL({format: "gif",format : "png", dynamic : "true"}))
                .setColor(0x00FFB8)
                .setDescription(text)
               // .setThumbnail('https://static.republika.co.id/uploads/images/detailnews/dompet-digital-dana-_200127133243-559.jpg')
                .setTimestamp()
                .setFooter('©Aldino#1304 • Version 2.0')
                message.channel.send(embed)
        
    }
})
//command ping
Client.on('message',message =>{
    if(message.author.bot)return

    const argss = message.content.slice(prefix1.length).trim().split(/ +/g)
    const cmd = argss.shift().toLowerCase()

    if (cmd === "ping"){
        const user = message.author.username
        
        const pingembed = new Discord.MessageEmbed()
        .setDescription(`Ping From ${user} ` + Math.round(Client.ws.ping)+ ' ms')
        .setColor("RANDOM")
        .setThumbnail(message.author.displayAvatarURL({format: "gif",format : "png", dynamic : "true"}))
        message.channel.send(pingembed)
        
    }

//command avatar

    if(message.author.Client) return

    if(message.content.startsWith(`${prefix1}avatar`)){
        const member = message.mentions.users.first() || message.author
        const avatar = new Discord.MessageEmbed()
        
        .setTitle(`${member.tag}' Avatar`)
        .setColor("RANDOM")
        .setImage(member.displayAvatarURL({format: "gif",format : "png",dynamic : "true",size: 1024}))
        message.channel.send(avatar)
    }
})


//command logs

Client.on("messageUpdate", async(oldMessage,newMessage)=>{

    if(oldMessage.content === newMessage.content){
        return
    }

    let logEmbed = new Discord.MessageEmbed()
    .setAuthor(oldMessage.author.tag , oldMessage.author.displayAvatarURL({format: "gif",format : "png", dynamic : "true"}))
    .setThumbnail(oldMessage.author.displayAvatarURL({format: "gif",format : "png", dynamic : "true"}))
    .setColor(0x00FFB8)
    .setDescription(`Pesan Baru Saja Diubah Di Channel  ${ newMessage.channel.name}`)
    .addField("Sebelum", oldMessage.content, true)
    .addField("Sesudah",newMessage.content, true)
    .setTimestamp()
    .setFooter('©Aldino#1304 • Version 2.0')

    let loggingChannel = newMessage.guild.channels.cache.get("ID Channel Log")
    if(!loggingChannel) return

    loggingChannel.send(logEmbed)
})

//command Instagram

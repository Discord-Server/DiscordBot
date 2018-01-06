const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    let embed = new Discord.RichEmbed()
        .setAuthor("User Info;")
        .addField("Username", message.author.username )
        .addField("Descriminator",`#${message.author.discriminator}` )
        .addField("ID", message.author.id )
        .addField("Date created", message.author.createdAt );

    message.channel.send({embed: embed});
}

module.exports.help ={
    name: "userinfo"
}


module.exports.run = async (bot, message, args) => {
     //!unmute @user , !unmute userid

        //check if the commander has the correct premissions to execute this command, if not return
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("you don't have the manage messages premission");
        //if (message.channel.permissionsFor(message.member).hasPermission("MANAGE_MESSAGES"))

        //get the user to unmute, if there is none return
        let tounmute = message.guild.member(message.mentions.users.first()) || message.guild.member(args[0]);
        if (!tounmute) return message.channel.sendMessage ("You didn't @mention a user!");

        //check the the user isnt unmuting themselves
        if(tounmute.id === message.author.id) return message.channel.sendMessage("you cannot unmute yourself")

        //check if the mutee has a higher role in the hierarchy,if yes ruturn
        if (tounmute.highestRole.position >=message.member.highestRole.position) return message.channel.sendMessage("you connot unmute a user who has a equal or higher role than yourself")

        let role = message.guild.roles.find(r => r.name === "Muted")//check to see if the role already exists
  
        if (!role || !tounmute.roles.has(role.id)) return message.channel.sendMessage("this user isn't muted")

        await tounmute.removeRole(role);
        message.channel.sendMessage(`${tounmute} has been unmuted`)

        return; 
}

module.exports.help ={
    name: "unmute"
}
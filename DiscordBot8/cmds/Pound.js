//const pound = botsettings.poundchannelname
const pound = "The-Pound"

module.exports.run = async (bot, message, args) => {
        //!pound @user , !pound userid

        //check if the commander has the correct premissions to execute this command, if not return
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("you don't have the manage messages premission");
        //if (message.channel.permissionsFor(message.member).hasPermission("MANAGE_MESSAGES"))

        //get the user to pound, if there is none return
        let topound = message.guild.member(message.mentions.users.first()) || message.guild.member(args[0]);
        if (!topound) return message.channel.sendMessage ("You didn't @mention a user!");

        //check the the user isnt pounding themselves
        if(topound.id === message.author.id) return message.channel.sendMessage("why would you want to send yourself to the pound?")

        //check if the poundee has a higher role in the hierarchy,if yes ruturn
        if (topound.highestRole.position >=message.member.highestRole.position) return message.channel.sendMessage("you connot pound a user who has a equal or higher role than yourself")

        let role = message.guild.roles.find(r => r.name === "Pounded")//check to see if the Pounded role already exists
        if(!role) {
            try {
                role = await message.guild.createRole({         //create the Pounded role
                       name: "Pounded",
                       color: "#d3660e",
                       hoist: true,
                       Permissions: []
               });
   
                message.guild.channels.forEach(async (channel, id) =>{   //assign channel spesific premissions to the Pounded role
                   await channel.overwritePermissions(role, {
                       SEND_MESSAGES: false,
                       ADD_REACTIONS:false,
                       SEND_TTS_MESSAGES:false,
                       ATTACH_FILES: false
                   });
                
               });
   
           } catch(e){
               console.log(e.stack)
           }       
        }

        if(topound.roles.has(role.id)) return message.channel.sendMessage("this user is already in the pound")

        await topound.addRole(role);
        message.channel.sendMessage(`${topound} has been sent to the pound`)

        return; 
    }    


module.exports.help ={
    name: "pound"
}
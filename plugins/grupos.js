let { MessageType } = require('@adiwajshing/baileys')
let fs = require('fs')
let handler  = async (m, { conn, usedPrefix: _p }) => {
  
let info = `
*👑Hola👑, unete a los grupos oficiales para pasar un rato agradable usando el Bot o platicando con la familia de ™𝓝𝓮𝓚𝓸𝓼𝓶𝓲𝓬 - 𝓑𝓞𝓣*

*➤ Grupos oficiales del Bot:*
*1.-* *Soporte Técnico:* 
https://chat.whatsapp.com/FJAu5KYaawU5ty9apbdFmy

*2.-* *Familia Otaku:* 
https://chat.whatsapp.com/FrFyDLRxR4TJcDvttI19JY

*3.-* *Bot's Oficiales:* 
https://chat.whatsapp.com/FXSClrsE1dr5jUqAustVX9

*4.-* *TEAM BLACK-EAGLE:*
https://chat.whatsapp.com/LINRVAQIhZdEAlShmLmhK5

*5.-* https://chat.whatsapp.com/Grupo-No-Creado
`.trim() 

conn.sendMessage(m.chat, info, MessageType.text, { quoted: { key: { remoteJid: 'status@broadcast', participant: '0@s.whatsapp.net', fromMe: false }, message: { "imageMessage": { "mimetype": "image/jpeg", "caption": '🔥 NEKOSMIC - BOT 🔥', "jpegThumbnail": fs.readFileSync(`./menu.jpg`)}}}})}

handler.command = /^(grupos|gruposofc|gruposofc)$/i
module.exports = handler

let { MessageType } = require('@adiwajshing/baileys')
let fs = require('fs')
let handler  = async (m, { conn, usedPrefix: _p }) => {
  
let info = `
─━─━─━∞◆∞━─━─━─┓
༆⋆⃟⋆⃟:🍥:LATĀM:🍥:eᬽ⃤
┗─━─━─━∞◆∞━─━─━─┛

━━━┃┫╋┃┫『∞』┣┃╋┣┃━━━

╔═══◄••¿𝖰𝗎𝖾 𝗈𝖿𝗋𝖾𝖼𝖾𝗆𝗈𝗌?••►════╗
╠『✨』₊·-͟͟͞⟡➤Staff activo y servicial✩﻿
╠『🤗』₊·-͟͟͞⟡➤Usuarios sociales y amigables✩﻿
╠『😁』₊·-͟͟͞⟡➤Mucho NSFW✩﻿
╠『🎨』₊·-͟͟͞⟡➤Servidor ordenado y configurado✩﻿
╠『🌠』₊·-͟͟͞⟡➤Roles y variedad de colores✩﻿
╠『🎶』₊·-͟͟͞⟡➤Canales de charla✩﻿
╠『🎁』₊·-͟͟͞⟡➤Alianzas con otros servidores✩﻿
╠『😎』₊·-͟͟͞⟡➤Canales de shitpost, videos, memes y más✩﻿
╠『👾』₊·-͟͟͞⟡➤Canales de entretenimiento✩﻿
╠『🤩』₊·-͟͟͞⟡➤Únete para conocer mas acerca del servidor✩﻿
╚═══◄••𝖤𝗌𝗉𝖾𝗋𝗈 𝗍𝖾 𝗀𝗎𝗌𝗍𝖾••►═════╝ 

✺  *         ⊹. 　   ·  ✦˚  · .　　  ·*   　.
· 　 . * *   　. NIGHT CITY * ˚  　　 · . ·
✦ ˚  　· 　 .· 　　   ✵  ✫•.   ✶✺  *         ⊹
 
 ꧁ENTRA Y DISFRUTA DEL SERVER꧂

❖Server: https://discord.gg/HQAkfXpd
*_「  *_「  N̶̛͋̄̊̓̇͐̂͠e̷̖̩̾̆̾̓̾̓̂K̴̙̭̪̅͑̿̚ó̷̙͔͒̉̆̈́͝͝s̴̼͎̝̺͔͈̈̄̾m̸̢͕̒̒̃́͘͝͠į̷͚̮̩̂̍͆͜c̵͙̼̈̾̍͛̉̈́̚ - B̵̠̤̘̜̈́͝O̷̍͂͒̏̒͋̈́̐̅Ṫ̵̹̓̌̀̕͝͝͝  」*`.trim()
conn.sendMessage(m.chat, info, MessageType.text, { quoted: { key: { remoteJid: 'status@broadcast', participant: '0@s.whatsapp.net', fromMe: false }, message: { "imageMessage": { "mimetype": "image/jpeg", "caption": '🔥 NEKOSMIC - BOT 🔥', "jpegThumbnail": fs.readFileSync(`./menu.jpg`)}}}})}

handler.command = /^(discord|Discord|discord server)$/i
module.exports = handler

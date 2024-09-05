import fetch from 'node-fetch';
let handler = async (m, { conn, usedPrefix: _p }) => {
  try {
    let pp = await conn.profilePictureUrl(m.sender, 'image')

    const anu = {
      "key": {
        "fromMe": false,
        "participant": "0@s.whatsapp.net",
        "remoteJid": "0@s.whatsapp.net"
      },
      "message": {
        "groupInviteMessage": {
          "groupJid": "120363322018839752@g.us",
          "inviteCode": "mememteeeekkeke",
          "groupName": "P",
          "caption": "Hello, I'm Hatsune Miku",
          "jpegThumbnail": await (await fetch(pp)).buffer()
        }
      }
    }
    
    conn.sendMessage(m.chat, { text: 'Hola soy Hatsune Miku, ¿Cómo puedo ayudarte?' }, { quoted: anu })
  } catch (error) {
    conn.sendMessage(m.chat, 'Hola soy Hatsune Miku, ¿Cómo puedo ayudarte?', 'conversation', { quoted: m })
  }
}

handler.customPrefix = /^(Ai)$/i
handler.command = new RegExp
export default handler

const uploadImage = require('../lib/uploadImage') 
const { sticker } = require('../lib/sticker')
const { MessageType } = require('@adiwajshing/baileys')

let handler = async (m, { conn, text }) => {
 try {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw '*Responda a una foto*'
  if (!/image\/(jpe?g|png)/.test(mime)) throw `Tamaño/peso no soportado`
  let img = await q.download()
  let url = await uploadImage(img)
  let wanted = global.API('dzx', '/api/canvas/trash', { url }) //`https://api.dhamzxploit.my.id/api/canvas/trash?url=${url}`
  let stiker = await sticker(null, wanted, 'trash', '™𝓝𝓮𝓚𝓸𝓼𝓶𝓲𝓬 - 𝓑𝓞𝓣')
  conn.sendMessage(m.chat, stiker, MessageType.sticker, {
    quoted: m
  })
 } catch (e) {
   m.reply('Conversion Failed')
  }
}
handler.help = ['trash']
handler.tags = ['General']
handler.command = /^trash$/i

module.exports = handler

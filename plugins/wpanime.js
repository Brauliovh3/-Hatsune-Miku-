const { MessageType } = require('@adiwajshing/baileys')
const fetch = require('node-fetch')

let handler = async (m, { conn }) => {
    try {
        let res = await fetch(global.API('xteam', '/randomimage/wpmobile', {}, 'APIKEY'))
        let img = await res.buffer()
        conn.sendMessage(m.chat, img, MessageType.image, {
            quoted: m, caption: '*✨𝓝𝓮𝓚𝓸𝓼𝓶𝓲𝓬 - 𝓑𝓞𝓣✨*'
        })
    } catch (e) {
        console.log(e)
        throw '_*El propietario no ha pagado la factura de esta función.*_'
    }
}
handler.help = ['wallpaperanime']
handler.tags = ['internet']
handler.command = /^(wallpaper|wp)anime$/i
handler.limit = false
module.register = false
module.group = true

module.exports = handler

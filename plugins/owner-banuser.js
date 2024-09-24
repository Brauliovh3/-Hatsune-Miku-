//import db from '../lib/database.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
   let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
    else who = m.chat
    let user = global.db.data.users[who]
    if (!who) return m.reply(`💙 Etiqueta a un usuario.`)
    let users = global.db.data.users
    users[who].banned = true
    conn.reply(m.chat, `💙 @${who.split`@`[0]} ha sido baneado con exito, ya no podrá volver a usar mis comandos.`, m, { mentions: [who] })
}
handler.help = ['banuser *@user*']
handler.tags = ['owner']
handler.command = /^banuser$/i
handler.rowner = true

export default handler

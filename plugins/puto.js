let handler = async (m, { conn, command, text }) => {
if (!text) throw `*Ingrese el @ o el nombre de la persona que desee calcular su porcentaje de ${command.replace('how', '')}*`
conn.reply(m.chat, `
_*${text}* *es* *${Math.floor(Math.random() * 2000)}%* *${command.replace('how', '').toUpperCase()}.* *Eeeeesssss putooo!! 😂*_
`.trim(), m, m.mentionedJid ? {
contextInfo: {
mentionedJid: m.mentionedJid }} : {})}
handler.command = /^(puto)/i
handler.fail = null
module.exports = handler

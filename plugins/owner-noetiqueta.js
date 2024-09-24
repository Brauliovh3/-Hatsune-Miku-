let handler = async (m, { conn, usedPrefix, isOwner }) => {
await m.react('😦')
await conn.reply(m.chat, `Hola @${m.sender.split`@`[0]} si necesitas la ayuda de mi creador porfavor escribele al privado\n*- Solo asuntos importantes -*`, estilo, { mentions: [m.sender] })
let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;(ㅎㅊDEPOOLㅊㅎ)⁩;;\nFN:(ㅎㅊDEPOOLㅊㅎ)⁩\nORG:(ㅎㅊDEPOOLㅊㅎ)\nTITLE:\nitem1.TEL;waid=51988514570:51988514570\nitem1.X-ABLabel:(ㅎㅊDEPOOLㅊㅎ)\nX-WA-BIZ-DESCRIPTION:\nX-WA-BIZ-NAME:(ㅎㅊDEPOOLㅊㅎ)\nEND:VCARD`
await conn.sendMessage(m.chat, { contacts: { displayName: '(ㅎㅊDEPOOLㅊㅎ)⁩', contacts: [{ vcard }] }}, {quoted: m})
}
handler.customPrefix = /^(@51988514570|@51988514570|@51988514570|@51988514570)$/i
handler.command = new RegExp
export default handler

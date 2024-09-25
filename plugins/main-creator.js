let handler = async (m, { conn, usedPrefix, isOwner }) => {
let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;(ㅎㅊDEPOOLㅊㅎ);;\nFN:(ㅎㅊDEPOOLㅊㅎ)⁩\nORG:(ㅎㅊDEPOOLㅊㅎ)⁩\nTITLE:\nitem1.TEL;waid=51988514570:51988514570\nitem1.X-ABLabel:(ㅎㅊDEPOOLㅊㅎ)⁩\nX-WA-BIZ-DESCRIPTION:\nX-WA-BIZ-NAME:(ㅎㅊDEPOOLㅊㅎ)\nEND:VCARD`
await conn.sendMessage(m.chat, { contacts: { displayName: '(ㅎㅊDEPOOLㅊㅎ)⁩', contacts: [{ vcard }] }}, {quoted: m})
let vcard2 = `BEGIN:VCARD\nVERSION:3.0\nN:;(ㅎㅊDEPOOLㅊㅎ);;\nFN:(ㅎㅊDEPOOLㅊㅎ)⁩\nORG:(ㅎㅊDEPOOLㅊㅎ)⁩\nTITLE:\nitem1.TEL;waid=51988514570:51988514570\nitem1.X-ABLabel:(ㅎㅊDEPOOLㅊㅎ)⁩\nX-WA-BIZ-DESCRIPTION:\nX-WA-BIZ-NAME:(ㅎㅊDEPOOLㅊㅎ)\nEND:VCARD`
await conn.sendMessage(m.chat, { contacts: { displayName: '(ㅎㅊDEPOOLㅊㅎ)⁩', contacts: [{ vcard }] }}, {quoted: m})
let vcard3 = `BEGIN:VCARD\nVERSION:3.0\nN:;𝐇𝐎𝐒𝐓 𝐒𝐏𝐄𝐂𝐓𝐑𝐔𝐌 𝐎𝐅𝐂;;\nFN:𝐇𝐎𝐒𝐓 𝐒𝐏𝐄𝐂𝐓𝐑𝐔𝐌 𝐎𝐅𝐂\nORG:𝐇𝐎𝐒𝐓 𝐒𝐏𝐄𝐂𝐓𝐑𝐔𝐌 𝐎𝐅𝐂\nTITLE:\nitem1.TEL;waid=524274130309:524274130309\nitem1.X-ABLabel:𝐇𝐎𝐒𝐓 𝐒𝐏𝐄𝐂𝐓𝐑𝐔𝐌 𝐎𝐅𝐂\nX-WA-BIZ-DESCRIPTION:\nX-WA-BIZ-NAME:𝐇𝐎𝐒𝐓 𝐒𝐏𝐄𝐂𝐓𝐑𝐔𝐌 𝐎𝐅𝐂\nEND:VCARD`
await conn.sendMessage(m.chat, { contacts: { displayName: '𝐇𝐎𝐒𝐓 𝐒𝐏𝐄𝐂𝐓𝐑𝐔𝐌 𝐎𝐅𝐂⁩', contacts: [{ vcard }] }}, {quoted: m})
}
handler.help = ['owner']
handler.tags = ['main']
handler.command = ['owner', 'creator', 'creador', 'dueño'] 

export default handler

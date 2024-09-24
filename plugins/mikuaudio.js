let handler = async (m, { conn }) => {
let vn = './media/miku.mp3'
conn.sendFile(m.chat, vn, 'Banate.mp3', null, m, true, {
type: 'audioMessage',
ptt: true
})
}
handler.customPrefix = /miku|miku/
handler.command = new RegExp
module.exports = handler

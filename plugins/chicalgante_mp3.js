let util = require('util')
let path = require('path')

let handler = async (m, { conn }) => {
let vn = './media/chica lgante.mp3'
conn.sendFile(m.chat, vn, 'chica lgante.mp3', null, m, true, {
type: 'audioMessage', 
ptt: true
})
}
handler.customPrefix = /chica lgante|Chica lgante|Chicalgante|chicalgante|chical gante|Chical gante/
handler.command = new RegExp
module.exports = handler

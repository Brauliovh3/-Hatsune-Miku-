let util = require('util')
let path = require('path')

let handler = async (m, { conn }) => {
let vn = './media/pato.mp3'
conn.sendFile(m.chat, vn, 'pato.mp3', null, m, true, {
type: 'audioMessage', 
ptt: true
})
}
handler.customPrefix = /un Pato| un pato|un pato que va caminando alegremente|Un pato|Un Pato/
handler.command = new RegExp
module.exports = handler
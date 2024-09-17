let util = require('util')
let path = require('path')

let handler = async (m, { conn }) => {
let vn = './media/bot.mp3'
conn.sendFile(m.chat, vn, 'bot.mp3', null, m, true, {
type: 'audioMessage', // paksa tanpa convert di ffmpeg
ptt: true // true diatas ga work, sebab dipaksa tanpa convert ;v
})
}
handler.customPrefix = /NeKosmic - bot|NeKosmic - Bot|N-K|NK|NeKosmic Bot|NeKosmic - bot|NeKo bot|neko bot|nekosmicbot|Neko Bot|Hola Bot|hola bot|Hola bot|hola bot|NekosmicBot|nekosmicbot/
handler.command = new RegExp
module.exports = handler

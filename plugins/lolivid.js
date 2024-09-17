let fetch = require('node-fetch')
async function getRandom(url) {
return Math.floor(Math.random() * url)}
let handler  = async (m, { conn, usedPrefix, command }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let mentionedJid = [who]
conn.sendButtonVid(m.chat, `https://recoders-area.caliph.repl.co/api/lolivid`, "*Loli 😎*", '™𝓝𝓮𝓚𝓸𝓼𝓶𝓲𝓬 - 𝓑𝓞𝓣', '😵‍💫 SIGUIENTE 😵‍💫', `${usedPrefix + command}`, m, false, { contextInfo: { mentionedJid }})}
handler.command = /^(lolivid|lolivideo)$/i
module.exports = handler

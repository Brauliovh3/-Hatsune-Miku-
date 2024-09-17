const axios = require('axios')
let handler = async(m, { conn, usedPrefix, command }) => {
let res = await axios("https://meme-api.herokuapp.com/gimme/penis")
let json = res.data
let NeKosmicBot = json.url
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let mentionedJid = [who]
conn.sendButtonImg(m.chat, NeKosmicBot, "*Pene 🍆*", '™𝓝𝓮𝓚𝓸𝓼𝓶𝓲𝓬 - 𝓑𝓞𝓣', '🥵 SIGUIENTE 🥵', `${usedPrefix + command}`, m, false, { contextInfo: { mentionedJid }})}
handler.command = /^(pene)$/i
handler.admin = true
module.exports = handler

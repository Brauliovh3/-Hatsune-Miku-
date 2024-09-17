//Codigo by ShadowBotV3
let fetch = require('node-fetch')
let handler = async (m, { conn, usedPrefix }) => {
let who = m.sender
let pp = await(await fetch('https://i.imgur.com/oHrJTtq.jpg')).buffer()
let kai = await(await fetch('https://i.imgur.com/oHrJTtq.jpg')).buffer()
let text = `*https://github.com/BrunoSobrino/ShadowBotV3*`.trim()
conn.reply(m.chat, text, m, { thumbnail: kai, contextInfo: {
mentionedJid: [who],
externalAdReply: {
title: '𝚁𝙴𝙿𝙾𝚂𝙸𝚃𝙾𝚁𝙸𝙾 𝙳𝙴𝙻 𝙱𝙾𝚃',
body: '🤖 N̶̛͋̄̊̓̇͐̂͠e̷̖̩̾̆̾̓̾̓̂K̴̙̭̪̅͑̿̚ó̷̙͔͒̉̆̈́͝͝s̴̼͎̝̺͔͈̈̄̾m̸̢͕̒̒̃́͘͝͠į̷͚̮̩̂̍͆͜c̵͙̼̈̾̍͛̉̈́̚ - B̵̠̤̘̜̈́͝O̷̍͂͒̏̒͋̈́̐̅Ṫ̵̹̓̌̀̕͝͝͝ 🤖',
thumbnail: pp
}}})}
handler.command = /^sc|script|repositorio|repobot|scbot$/i
module.exports = handler

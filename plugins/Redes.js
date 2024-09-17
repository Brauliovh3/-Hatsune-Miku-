let PhoneNumber = require('awesome-phonenumber')
let levelling = require('../lib/levelling')

let handler = async (m, { conn, usedPrefix }) => {

  let pp = './menu.jpg'
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  try {
//    pp = await conn.getProfilePicture(who)
  } catch (e) {

  } finally {
    let about = (await conn.getStatus(who).catch(console.error) || {}).status || ''
    let { name, limit, exp, banned, lastclaim, registered, regTime, age, level } = global.DATABASE.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let username = conn.getName(who)
    let str = `
┏━━━━━━━━━━━━━┓
┃ *👑𝐑𝐞𝐝𝐞𝐬👑*
┃≡≡≡≡≡≡≡≡≡≡≡≡≡≡
┣ ඬ⃟♠️ _𝐘𝐨𝐮𝐓𝐮𝐛𝐞: https://n9.cl/76dmk
┣ ඬ⃟♠️ _𝐓𝐢𝐤𝐓𝐨𝐤: https://n9.cl/70adg
┣ ඬ⃟♠️ _𝐈𝐧𝐬𝐭𝐚𝐠𝐫𝐚𝐦: https://n9.cl/lvl5b
┣ ඬ⃟♠️ _𝐆𝐫𝐮𝐩𝐨 𝐝𝐞 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤: https://n9.cl/deke8
┣ ඬ⃟♠️ _𝐏𝐚𝐲𝐏𝐚𝐥: https://www.paypal.me/NeKosmicOFC
┗━━━━━━━━━━━━━┛
ꨄ︎𝐏𝐚𝐫𝐚 𝐟𝐮𝐭𝐮𝐫𝐚𝐬 𝐚𝐜𝐭𝐮𝐚𝐥𝐢𝐳𝐚𝐜𝐢𝐨𝐧𝐞𝐬 𝐝𝐞𝐥 𝐁𝐨𝐭ꨄ︎
❦︎𝐧𝐨𝐬 𝐯𝐞𝐧𝐝𝐫𝐢𝐚 𝐛𝐢𝐞𝐧 𝐮𝐧 𝐩𝐨𝐜𝐨 𝐝𝐞 𝐚𝐩𝐨𝐲𝐨❦︎

*👑N̶̛͋̄̊̓̇͐̂͠e̷̖̩̾̆̾̓̾̓̂K̴̙̭̪̅͑̿̚ó̷̙͔͒̉̆̈́͝͝s̴̼͎̝̺͔͈̈̄̾m̸̢͕̒̒̃́͘͝͠į̷͚̮̩̂̍͆͜c̵͙̼̈̾̍͛̉̈́̚ - B̵̠̤̘̜̈́͝O̷̍͂͒̏̒͋̈́̐̅Ṫ̵̹̓̌̀̕͝͝͝👑*`.trim()
    let mentionedJid = [who]
    conn.sendFile(m.chat, pp, 'lp.jpg', str, m, false, { contextInfo: { mentionedJid }})
  }
}
handler.help = ['Redes']
handler.tags = ['General']
handler.command = /^(redes|Redes|redes sociales|Redes sociales)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

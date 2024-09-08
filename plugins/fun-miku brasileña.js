let handler = async (m, { conn, usedPrefix, command}) => {
    let pp = './storage/audio/miku brasileña.mp3'
    let who
    if (m.isGroup) who = m.mentionedJid[0]
    else who = m.chat
    if (!who) return conn.reply(m.chat, '💙 Menciona al usuario con *@user*', m, rcanal)
    let name2 = conn.getName(who)
    let name = conn.getName(m.sender)
    
    await conn.sendMessage(m.chat, { Audio: { url: [pp].getRandom() }, audioPlayback: true, caption: `*${name}*` + 'Himitsu da yo' + ` *${name2}*` + ' 💦💦 *:・ﾟ✧' }, { quoted: m })
    }
    handler.help = ['miku brasileña *<@user>*']
    handler.tags = ['fun']
    handler.command = ['miku', 'brasileña']
    export default handler
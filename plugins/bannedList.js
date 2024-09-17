let handler = async (m, { conn, usedPrefix }) => {
    let chats = Object.entries(global.DATABASE.data.chats).filter(chat => chat[1].isBanned)
    let users = Object.entries(global.DATABASE.data.users).filter(user => user[1].Banneduser)
    
    m.reply(`
┌ *Lista de chats baneados*
│ Total : ${chats.length} Chat${chats ? '\n' + chats.map(([jid], i) => `
│ ${i + 1}. ${conn.getName(jid) == undefined ? 'Unknown' : conn.getName(jid)}
│ ${jid}
`.trim()).join('\n') : ''}
└────

┌ *Lista de usuarios baneados*
│ Total : ${users.length} User${users ? '\n' + users.map(([jid], i) => `
│ ${i + 1}. ${conn.getName(jid) == undefined ? 'Unknown' : conn.getName(jid)}
│ ${jid}
`.trim()).join('\n') : ''}
└────
`.trim())
}
handler.help = ['bannedlist']
handler.tags = ['info']
handler.command = /^listban(ned)?|ban(ned)?list|daftarban(ned)?$/i
handler.rowner = true
module.exports = handler

import Starlights from '@StarlightsTeam/Scraper'

let handler = async (m, { conn, args, command, usedPrefix }) => {
if (!global.db.data.chats[m.chat].nsfw) return conn.reply(m.chat, `🚩 El grupo no admite contenido *Nsfw.*\n\n> Para activarlo un *Administrador* debe usar el comando */nsfw on*`, m, rcanal)
if (!args[0]) return conn.reply(m.chat, `🚩 Ingresa el enlace del vídeo de Xvideos*`, m, rcanal)

let user = global.db.data.users[m.sender]
await m.react('🕓')
try {
let { title, dl_url } = await Starlights.xvideosdl(args[0])
await conn.sendFile(m.chat, dl_url, title + '.mp4', `*» Título* : ${title}`, m, false, { asDocument: user.useDocument })
await m.react('✅')
} catch {
await m.react('✖️')
}}
handler.help = ['xvideosdl *<url>*']
handler.tags = ['downloader', 'nsfw']
handler.command = ['xvideosdl']
//handler.limit = 200
handler.register = true 
handler.group = true 
export default handler
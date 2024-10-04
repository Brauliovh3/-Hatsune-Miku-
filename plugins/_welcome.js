import {WAMessageStubType} from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, {conn, participants, groupMetadata}) {
  if (!m.messageStubType || !m.isGroup) return !0;
  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://tinyurl.com/2cd94clt')
  let img = await (await fetch(`${pp}`)).buffer()
  let chat = global.db.data.chats[m.chat]

  if (chat.bienvenida && m.messageStubType == 27) {
    let bienvenida = `▛01 *${botname}* ▟\n▍ ▛ Bienvenido ▟ \n▙01 「 @${m.messageStubParameters[0].split`@`[0]} ▟ \n   ▍01  Bienvenido a\n   █01  ${groupMetadata.subject}\n   ▙▰▰▰▰▰▰▰▰▰▰▰01`
    
await conn.sendAi(m.chat, botname, textbot, bienvenida, img, img, canal, estilo)
  }
  
  if (chat.bienvenida && m.messageStubType == 28) {
    let bye = `▛01 *${botname}* ▟\n▍ ▛ ADIOS 👋 ▟ \n▙01 ▛ @${m.messageStubParameters[0].split`@`[0]} ▟ \n   ▍01  Se fue\n   ▍01 Jamás te quisimos aquí\n   ▙▰▰▰▰▰▰▰▰▰▰01`
await conn.sendAi(m.chat, botname, textbot, bye, img, img, canal, estilo)
  }
  
  if (chat.bienvenida && m.messageStubType == 32) {
    let kick = `▛01 *${botname}* ▟\n▍ ▛ ADIOS 👋 ▟\n▙01 ▛ @${m.messageStubParameters[0].split`@`[0]} ▟ \n   ▍01  Se fue\n   ▍01 Jamás te quisimos aquí\n   ▙▰▰▰▰▰▰▰▰▰01`
await conn.sendAi(m.chat, botname, textbot, kick, img, img, canal, estilo)
}}

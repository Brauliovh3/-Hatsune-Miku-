import {WAMessageStubType} from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, {conn, participants, groupMetadata}) {
  if (!m.messageStubType || !m.isGroup) return !0;
  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://tinyurl.com/2cd94clt')
  let img = await (await fetch(`${pp}`)).buffer()
  let chat = global.db.data.chats[m.chat]

  if (chat.bienvenida && m.messageStubType == 27) {
    let bienvenida = `┌─💙 *${botname}* \n│「 Como ta muchacho 」\n└┬💙 「 @${m.messageStubParameters[0].split`@`[0]} 」\n   │🌱  Bienvenido al grupo:\n   │🌱  ${groupMetadata.subject}\n   └───────────────┈ ⳹`
    
await conn.sendAi(m.chat, botname, textbot, bienvenida, img, img, canal, estilo)
  }
  
  if (chat.bienvenida && m.messageStubType == 28) {
    let bye = `┌─💙 *${botname}* \n│「 ADIOS 🏳️‍🌈 」\n└┬💙 「 @${m.messageStubParameters[0].split`@`[0]} 」\n   │🏳️‍🌈 fuera Kbro🏳️‍🌈\n   │🏳️‍🌈 Y no vuelvas por aqui\n   └───────────────┈ ⳹`
await conn.sendAi(m.chat, botname, textbot, bye, img, img, canal, estilo)
  }
  
  if (chat.bienvenida && m.messageStubType == 32) {
    let kick = `┌─💙 *${botname}* \n│「 ADIOS 🏳️‍🌈 」\n└┬💙 「 @${m.messageStubParameters[0].split`@`[0]} 」\n   │🏳️‍🌈 La princesa se fue🏳️‍🌈\n   │🏳️‍🌈 Jamás te quisimos aquí\n   └───────────────┈ ⳹`
await conn.sendAi(m.chat, botname, textbot, kick, img, img, canal, estilo)
}}

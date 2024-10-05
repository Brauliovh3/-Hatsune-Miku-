import fs from 'fs'

let handler = async (m, { conn }) => {
   let dd = ["1", "2", "3", "4", "5", "6"]
   let ra = dd[Math.floor(Math.random() * dd.length)]
   let dado = fs.readFileSync(`./storage/sticker/dado${ra}.webp`)
   await m.reply(dado)
}

handler.help = ['dado']
handler.tags = ['fun']
handler.command = ['dado']

export default handler

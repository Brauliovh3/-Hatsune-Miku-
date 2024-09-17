let handler = async (m, { conn, text }) => {

let [nomor, pesan, jumlah] = text.split('|')
if (!nomor) throw '*[ ⚠️ ] Por favor ingrese el numero que dese enviar el spam de mensaje #spamwa numero|texto|cantidad*'
if (!pesan) throw '*[ ⚠️ ] Por favor ingrese el mensaje a enviar #spamwa numero|texto|cantidad*'
if (jumlah && isNaN(jumlah)) throw '*[❗] La cantidad debe ser un número!*'

  let fixedNumber = nomor.replace(/[-+<>@]/g, '').replace(/ +/g, '').replace(/^[0]/g, '62') + '@s.whatsapp.net'
  let fixedJumlah = jumlah ? jumlah * 1 : 10
  if (fixedJumlah > 50) throw '*[ ⚠ ] Demasiados mensajes!! ingrese una cantidad por debajo de 50 mensajes*️'
  await m.reply(`*[❗] Spam de mensajes al número ${nomor} realizado con exito*\n*Cantidad enviada: ${fixedJumlah} veces!*`)
  for (let i = fixedJumlah; i > 1; i--) {
  if (i !== 0) conn.reply(fixedNumber, pesan.trim(), m)
  }
}
handler.help = ['spamwa <number>|<mesage>|<no of messages>']
handler.tags = ['premium']
handler.command = /^spam(wa)?$/i

handler.group = false
handler.premium = false
handler.private = false
handler.admin = true
module.exports = handler

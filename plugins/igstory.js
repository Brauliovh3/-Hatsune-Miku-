let handler = async (m, { usedPrefix, command, conn, args }) => {
if (!args[0]) throw `*Formato correcto de uso: ${usedPrefix + command} [username]*\n*Ejemplo: ${usedPrefix + command} luisitocomunica*`
let res = await igstory(args[0])
if (!res.length) throw '*[ ⚠️ ] Error, por favor vuelva a intentarlo..*\n*1.- Compruebe que el nombre de usuario este escrito correctamente*\n\n*[❗] Posibles errores por la cual no recibe nada:*\n*1.- Las historias esten en modo pivado o solo mejores amigos*\n*2.- El usuaio no tiene ninguna historia*\n*3.- No se encontro el usuario*'
for (let { url, type } of res)
conn.sendFile(m.chat, url, 'ig' + (type == 'video' ? '.mp4' : '.jpg'), `
@${args[0]}
`.trim(), m)}
handler.command = /^(igs(tory)?)$/i
module.exports = handler
const axios = require('axios')
const cheerio = require('cheerio')
const fetch = require('node-fetch')
async function igstory(username) {
username = username.replace(/https:\/\/instagram.com\//g, '')
let { data } = await axios.get(`https://www.instadownloader.org/data.php?username=${username}&t=${new Date * 1}`)
const $ = cheerio.load(data)
let results = []
$('body > center').each(function (i, el) {
results.push({
url: $(el).find('a.download-btn').attr('href'),
type: $(el).find('video').html() ? 'video' : 'image'})})
return results}

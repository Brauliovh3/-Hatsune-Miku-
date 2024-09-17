//Agradecimientos a GataNina-Li "https://github.com/GataNina-Li"
const fetch = require('node-fetch')
let handler = async (m, { usedPrefix, command, conn, args }) => {
if (!args[0]) throw `*[❗️] Uso correcto del comando:*
*${usedPrefix + command} link/url/enlace*\n
*Ejemplo:* 
*${usedPrefix + command} https://twitter.com/NetflixLAT/status/1496558658620174340?s=20&t=pHojThstRGnJ5us8v3P6RA*`
let res = await twitter(args[0])
let result = res.result.reverse().filter(({ mime }) => /video/i.test(mime)), video, index
for (let vid of result) {
try {
video = await (await fetch(vid.link)).buffer()
index = result.indexOf(vid)
break
} catch (e) {
err = e
continue
}}
if (!video) throw '*Video no encontrado*\n*Inserte en enlace de un video de Twitter*'
let ress = result[index]
conn.sendFile(m.chat, video, 'twitter.mp4', `
✨ *Nombre:* ${res.name}
📍 *Url:* ${args[0]}
📎 *Link:* ${ress.link}
`.trim(), m)}
handler.command = /^twittervideo|twvid|twitter|dltwitter|twitterdl$/i
module.exports = handler
const cheerio = require('cheerio')
const FormData = require('form-data')
async function twitter(url) {
if (!/http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/i) throw 'Link invalid!'
let form = new FormData()
form.append('url', encodeURI(url))
form.append('submit', '')
let res = await fetch('https://www.expertsphp.com/instagram-reels-downloader.php', {
method: 'POST',
headers: {
'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
'cookie': '_ga=GA1.2.783835709.1637038175; _gid=GA1.2.880188214.1637038175; __gads=ID=5b4991618655cd86-22e2c7aeadce00ae:T=1637038176:RT=1637038176:S=ALNI_MaCe3McPrVVswzBEqcQlgnVZXtZ1g',
'origin': 'https://www.expertsphp.com',
'referer': 'https://www.expertsphp.com/twitter-video-downloader.html',
'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
...form.getHeaders()
},
body: form
})
let html = await res.text()
const $ = cheerio.load(html)
let thumbnail = $('#showdata > img').attr('src')
let result = []
$('#showdata > div > table > tbody > tr').each(function () {
result.push({
link: $(this).find('td:nth-child(1) > a').attr('href'),
mime: $(this).find('td:nth-child(2) > strong').text()
})})
let name = /http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/g
name = [...url.matchAll(name)][0][1]
return {
name,
thumbnail,
result
}}

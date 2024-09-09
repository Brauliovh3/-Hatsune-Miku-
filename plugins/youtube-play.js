import fg from 'api-dylux'
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'
import yts from 'yt-search'

let handler = async (m, { conn, args, usedPrefix, text, command }) => {
    if (!text) return conn.reply(m.chat, `🚩 Ingresa el título de un video o canción de YouTube.\n\n*Ejemplo:*\n*${usedPrefix + command}* Alan Walker - Sing Me To Sleep`, m)
    
    await m.react('🕓') // Indicador de "cargando"
    let res = await yts(text)
    let vid = res.videos[0]
    let txt = `*乂  Y O U T U B E  -  P L A Y*\n\n`
    txt += `    ✩   *Título* : ${vid.title}\n`
    txt += `    ✩   *Duración* : ${vid.timestamp}\n`
    txt += `    ✩   *Visitas* : ${vid.views}\n`
    txt += `    ✩   *Autor* : ${vid.author.name}\n`
    txt += `    ✩   *Publicado* : ${eYear(vid.ago)}\n`
    txt += `    ✩   *Url* : ${'https://youtu.be/' + vid.videoId}\n\n`
    txt += `*- ↻ El archivo está siendo procesado. . .*\n`

    // Enviar la información básica
    await conn.sendFile(m.chat, vid.thumbnail, 'thumbnail.jpg', txt, m, null, rcanal)

    // Limite de tamaño en MB
    let limit = 100 

    try {
        // Descargar audio MP3
        let audioMp3 = await fg.yta(vid.url, '128kbps')
        let { dl_url: mp3Url, title: mp3Title, size: mp3Size } = audioMp3
        if (mp3Size.split('MB')[0] < limit) {
            await conn.sendMessage(m.chat, { document: { url: mp3Url }, caption: 'Descargar Audio (MP3)', mimetype: 'audio/mpeg', fileName: `${mp3Title}.mp3` }, { quoted: m })
        }

        // Descargar video MP4
        let videoMp4 = await fg.ytv(vid.url, '360p')
        let { dl_url: mp4Url, title: mp4Title, size: mp4Size } = videoMp4
        if (mp4Size.split('MB')[0] < limit) {
            await conn.sendMessage(m.chat, { document: { url: mp4Url }, caption: 'Descargar Video (MP4)', mimetype: 'video/mp4', fileName: `${mp4Title}.mp4` }, { quoted: m })
        }

        // Descargar Audio Documento
        await conn.sendMessage(m.chat, { document: { url: mp3Url }, caption: 'Descargar Documento de Audio (MP3)', mimetype: 'audio/mpeg', fileName: `${mp3Title}.mp3` }, { quoted: m })

        // Descargar Video Documento
        await conn.sendMessage(m.chat, { document: { url: mp4Url }, caption: 'Descargar Documento de Video (MP4)', mimetype: 'video/mp4', fileName: `${mp4Title}.mp4` }, { quoted: m })

        await m.react('✅') // Indicador de éxito
    } catch (e) {
        console.error(e)
        await m.react('✖️') // Indicador de fallo
        conn.reply(m.chat, `Ocurrió un error al procesar la solicitud.`, m)
    }
}

handler.help = ['play'].map(v => v + " *<búsqueda>*")
handler.tags = ['downloader']
handler.command = ['play'] 
handler.register = true

export default handler

// Función para transformar el tiempo
function eYear(txt) {
    if (!txt) {
        return '×'
    }
    if (txt.includes('month ago')) {
        var T = txt.replace("month ago", "").trim()
        var L = 'hace '  + T + ' mes'
        return L
    }
    if (txt.includes('months ago')) {
        var T = txt.replace("months ago", "").trim()
        var L = 'hace ' + T + ' meses'
        return L
    }
    if (txt.includes('year ago')) {
        var T = txt.replace("year ago", "").trim()
        var L = 'hace ' + T + ' año'
        return L
    }
    if (txt.includes('years ago')) {
        var T = txt.replace("years ago", "").trim()
        var L = 'hace ' + T + ' años'
        return L
    }
    if (txt.includes('hour ago')) {
        var T = txt.replace("hour ago", "").trim()
        var L = 'hace ' + T + ' hora'
        return L
    }
    if (txt.includes('hours ago')) {
        var T = txt.replace("hours ago", "").trim()
        var L = 'hace ' + T + ' horas'
        return L
    }
    if (txt.includes('minute ago')) {
        var T = txt.replace("minute ago", "").trim()
        var L = 'hace ' + T + ' minuto'
        return L
    }
    if (txt.includes('minutes ago')) {
        var T = txt.replace("minutes ago", "").trim()
        var L = 'hace ' + T + ' minutos'
        return L
    }
    if (txt.includes('day ago')) {
        var T = txt.replace("day ago", "").trim()
        var L = 'hace ' + T + ' día'
        return L
    }
    if (txt.includes('days ago')) {
        var T = txt.replace("days ago", "").trim()
        var L = 'hace ' + T + ' días'
        return L
    }
    return txt
}

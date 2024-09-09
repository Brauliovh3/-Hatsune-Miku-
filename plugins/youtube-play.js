import fg from 'api-dylux'
import yts from 'yt-search'

let handler = async (m, { conn, args, usedPrefix, text, command }) => {
    if (!text) return conn.reply(m.chat, `🚩 Ingresa el título de un video o canción de YouTube.\n\n*Ejemplo:*\n*${usedPrefix + command}* Alan Walker - Sing Me To Sleep`, m)
    
    await m.react('🕓') // Indicador de "cargando"
    let res = await yts(text)
    let vid = res.videos[0]
    
    if (!vid) {
        await m.react('✖️') // Indicador de fallo
        return conn.reply(m.chat, `No se encontró ningún video para la búsqueda: *${text}*`, m)
    }

    let txt = `*乂  Y O U T U B E  -  P L A Y*\n\n`
    txt += `    ✩   *Título* : ${vid.title}\n`
    txt += `    ✩   *Duración* : ${vid.timestamp}\n`
    txt += `    ✩   *Visitas* : ${vid.views}\n`
    txt += `    ✩   *Autor* : ${vid.author.name}\n`
    txt += `    ✩   *Publicado* : ${formatTimeAgo(vid.ago)}\n`
    txt += `    ✩   *Url* : ${'https://youtu.be/' + vid.videoId}\n\n`
    txt += `*- ↻ Elige el formato de descarga.*\n`

    // Crear botones
    const buttons = [
        { buttonId: 'download_audio', buttonText: { displayText: 'Descargar Audio (MP3)' }, type: 1 },
        { buttonId: 'download_video', buttonText: { displayText: 'Descargar Video (MP4)' }, type: 1 },
        { buttonId: 'download_audio_doc', buttonText: { displayText: 'Descargar Audio (MP3) - Documento' }, type: 1 },
        { buttonId: 'download_video_doc', buttonText: { displayText: 'Descargar Video (MP4) - Documento' }, type: 1 }
    ]

    const buttonMessage = {
        text: txt,
        footer: 'Selecciona una opción para descargar el archivo.',
        buttons: buttons,
        headerType: 1
    }

    await conn.sendMessage(m.chat, buttonMessage, { quoted: m })

    // Esperar la respuesta del usuario
    const filter = (message) => message.key.fromMe || message.key.remoteJid === m.chat;
    const collector = conn.on('message', async message => {
        if (message.hasOwnProperty('buttonId') && message.buttonId) {
            const buttonId = message.buttonId;

            try {
                if (buttonId === 'download_audio') {
                    let audioMp3 = await fg.yta(vid.url, '128kbps')
                    let { dl_url: mp3Url, title: mp3Title, size: mp3Size } = audioMp3
                    let mp3SizeMB = parseFloat(mp3Size.split('MB')[0])
                    if (mp3SizeMB < limit) {
                        await conn.sendMessage(m.chat, { document: { url: mp3Url }, caption: 'Descargar Audio (MP3)', mimetype: 'audio/mpeg', fileName: `${mp3Title}.mp3` }, { quoted: m })
                    }
                } else if (buttonId === 'download_video') {
                    let videoMp4 = await fg.ytv(vid.url, '360p')
                    let { dl_url: mp4Url, title: mp4Title, size: mp4Size } = videoMp4
                    let mp4SizeMB = parseFloat(mp4Size.split('MB')[0])
                    if (mp4SizeMB < limit) {
                        await conn.sendMessage(m.chat, { document: { url: mp4Url }, caption: 'Descargar Video (MP4)', mimetype: 'video/mp4', fileName: `${mp4Title}.mp4` }, { quoted: m })
                    }
                } else if (buttonId === 'download_audio_doc') {
                    let audioMp3 = await fg.yta(vid.url, '128kbps')
                    let { dl_url: mp3Url, title: mp3Title } = audioMp3
                    await conn.sendMessage(m.chat, { document: { url: mp3Url }, caption: 'Descargar Documento de Audio (MP3)', mimetype: 'audio/mpeg', fileName: `${mp3Title}.mp3` }, { quoted: m })
                } else if (buttonId === 'download_video_doc') {
                    let videoMp4 = await fg.ytv(vid.url, '360p')
                    let { dl_url: mp4Url, title: mp4Title } = videoMp4
                    await conn.sendMessage(m.chat, { document: { url: mp4Url }, caption: 'Descargar Documento de Video (MP4)', mimetype: 'video/mp4', fileName: `${mp4Title}.mp4` }, { quoted: m })
                }

                await m.react('✅') // Indicador de éxito
                collector.stop() // Detener la recolección de mensajes
            } catch (e) {
                console.error(e)
                await m.react('✖️') // Indicador de fallo
                conn.reply(m.chat, `Ocurrió un error al procesar la solicitud.`, m)
                collector.stop() // Detener la recolección de mensajes
            }
        }
    })
}

handler.help = ['play'].map(v => v + " *<búsqueda>*")
handler.tags = ['downloader']
handler.command = ['play'] 
handler.register = true

export default handler

// Función para transformar el tiempo
function formatTimeAgo(txt) {
    if (!txt) return '×'
    const timeMappings = {
        'month ago': 'mes',
        'months ago': 'meses',
        'year ago': 'año',
        'years ago': 'años',
        'hour ago': 'hora',
        'hours ago': 'horas',
        'minute ago': 'minuto',
        'minutes ago': 'minutos',
        'day ago': 'día',
        'days ago': 'días',
    }

    for (let [key, value] of Object.entries(timeMappings)) {
        if (txt.includes(key)) {
            let T = txt.replace(key, "").trim()
            return `hace ${T} ${value}`
        }
    }
    return txt
}

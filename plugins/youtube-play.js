import starlights from 'starlights-api'; // Reemplaza esto con el import correcto

let handler = async (m, { conn, args, usedPrefix, text, command }) => {
    if (!text) return conn.reply(m.chat, `🚩 Ingresa el título de un video o canción de YouTube.\n\n*Ejemplo:*\n*${usedPrefix + command}* Alan Walker - Sing Me To Sleep`, m);
    
    await m.react('🕓'); // Indicador de "cargando"
    
    // Buscando el video en la API de Starlights
    let res = await starlights.search(text);  // Esto depende de cómo se hace la búsqueda en Starlights API
    let vid = res.videos[0];
    
    if (!vid) {
        await m.react('✖️');
        return conn.reply(m.chat, `No se encontró ningún video para la búsqueda: *${text}*`, m);
    }

    let txt = `*乂  Y O U T U B E  -  P L A Y*\n\n`;
    txt += `    ✩   *Título* : ${vid.title}\n`;
    txt += `    ✩   *Duración* : ${vid.timestamp}\n`;
    txt += `    ✩   *Visitas* : ${vid.views}\n`;
    txt += `    ✩   *Autor* : ${vid.author.name}\n`;
    txt += `    ✩   *Publicado* : ${vid.ago}\n`;
    txt += `    ✩   *Url* : ${vid.url}\n\n`;
    txt += `*- ↻ Elige el formato de descarga.*\n`;

    // Crear botones para WhatsApp
    const buttons = [
        { buttonId: 'audio', buttonText: { displayText: 'Descargar Audio (MP3)' }, type: 1 },
        { buttonId: 'video', buttonText: { displayText: 'Descargar Video (MP4)' }, type: 1 },
        { buttonId: 'audio_doc', buttonText: { displayText: 'Audio Documento (MP3)' }, type: 1 },
        { buttonId: 'video_doc', buttonText: { displayText: 'Video Documento (MP4)' }, type: 1 }
    ];

    const buttonMessage = {
        text: txt,
        footer: 'Selecciona una opción para descargar el archivo.',
        buttons: buttons,
        headerType: 1
    };

    // Enviar mensaje con botones
    await conn.sendMessage(m.chat, buttonMessage, { quoted: m });

    // Event listener para respuestas de botones
    conn.ev.on('messages.upsert', async (upsert) => {
        const message = upsert.messages[0];
        if (!message.message || !message.key.fromMe) return;
        
        const buttonId = message.message?.buttonsResponseMessage?.selectedButtonId;
        const limit = 100; // Límite de tamaño en MB

        try {
            if (buttonId === 'audio') {
                let audioMp3 = await starlights.downloadAudio(vid.url); // Reemplaza por la función correcta
                let { dl_url: mp3Url, title: mp3Title, size: mp3Size } = audioMp3;
                if (parseFloat(mp3Size.split('MB')[0]) < limit) {
                    await conn.sendMessage(m.chat, { document: { url: mp3Url }, caption: 'Descargar Audio (MP3)', mimetype: 'audio/mpeg', fileName: `${mp3Title}.mp3` }, { quoted: m });
                }
            } else if (buttonId === 'video') {
                let videoMp4 = await starlights.downloadVideo(vid.url); // Reemplaza por la función correcta
                let { dl_url: mp4Url, title: mp4Title, size: mp4Size } = videoMp4;
                if (parseFloat(mp4Size.split('MB')[0]) < limit) {
                    await conn.sendMessage(m.chat, { document: { url: mp4Url }, caption: 'Descargar Video (MP4)', mimetype: 'video/mp4', fileName: `${mp4Title}.mp4` }, { quoted: m });
                }
            }
        } catch (e) {
            console.error(e);
            await m.react('✖️'); // Indicador de fallo
            conn.reply(m.chat, `Ocurrió un error al procesar la solicitud.`, m);
        }
    });
};

handler.help = ['play'].map(v => v + " *<búsqueda>*");
handler.tags = ['downloader'];
handler.command = ['play'];
handler.register = true;

export default handler;

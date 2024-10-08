import { googleImage } from '@bochilteam/scraper'  // Asegúrate de que la importación sea correcta

let handler = async (m, { conn, text, usedPrefix, command }) => {
    // Verifica si el grupo permite contenido NSFW
    if (!global.db.data.chats[m.chat].nsfw) {
        return conn.reply(m.chat, `💙 El grupo no admite contenido *Nsfw.*\n\n> Para activarlo un *Administrador* debe usar el comando */nsfw on*`, m)
    }

    await m.react('🕓')  // Reacciona mientras se procesa la solicitud

    try {
        // Busca una imagen de hentai usando Google Images
        let res = await googleImage('hentai')
        let imageUrl = res.getRandom()  // Extrae una URL aleatoria de la respuesta

        // Envía la imagen al chat
        await conn.sendFile(m.chat, imageUrl, 'thumbnail.jpg', `*» Hentai*`, m)
        await m.react('✅')  // Marca éxito con un check

    } catch (e) {
        // Si ocurre un error, reacciona con una X y opcionalmente envía un mensaje de error
        await m.react('✖️')
        console.error(e)
        await conn.reply(m.chat, 'Hubo un error al intentar obtener la imagen.', m)
    }
}

handler.help = ['hentai']
handler.tags = ['nsfw']
handler.command = ['hentai']
handler.group = true  // Sólo en grupos
handler.register = true  // Requiere estar registrado

export default handler

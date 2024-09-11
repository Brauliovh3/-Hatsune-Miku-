import path from 'path'
import { fileURLToPath } from 'url'

// Obtén el __dirname para ES Modules
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const handler = async (m, { conn }) => {
    // Ruta al archivo de audio
    const audioFilePath = path.join(__dirname, 'storage/audio/miku brasileña.mp3')
    console.log('Enviando archivo desde:', audioFilePath)

    try {
        // Enviar el archivo como una nota de voz
        await conn.sendFile(m.chat, audioFilePath, 'Banate.mp3', 'Aquí tienes el audio', m, true, {
            type: 'audioMessage',
            ptt: true // Esto asegura que el archivo se envíe como una nota de voz (PTT)
        })
        console.log('Archivo enviado como nota de voz con éxito.')
    } catch (error) {
        console.error('Error al enviar el archivo:', error)
    }
}

handler.customPrefix = /bañate|Bañate/
handler.command = new RegExp

export default handler

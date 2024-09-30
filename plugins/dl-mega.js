import { File } from "megajs";
import path from "path";

let handler = async (m, { conn, args, usedPrefix, text, command }) => {
    try {
        if (!text) return m.reply(`${usedPrefix + command} 💙Ingrese Un enlace de Descarga 💙`);

        const file = File.fromURL(text);
        await file.loadAttributes();

        if (file.size >= 300000000) return m.reply('Error: El archivo es grande (Maximo tamaño: 800MB)');

        const downloadingMessage = `🌩️ Descargando Archivo... Porfavor Espera.`;
        m.reply(downloadingMessage);

        const caption = `*_Descarga exitosa..._*\nFile: ${file.name}\nSize: ${formatBytes(file.size)}`;

        const data = await file.downloadBuffer();

        const fileExtension = path.extname(file.name).toLowerCase();
        const mimeTypes = {
            ".mp4": "video/mp4",
            ".pdf": "application/pdf",
            ".zip": "application/zip",
            ".rar": "application/x-rar-compressed",
            ".7z": "application/x-7z-compressed",
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".png": "image/png",
        };

        let mimetype = mimeTypes[fileExtension] || "application/octet-stream";

        await conn.sendFile(m.chat, data, file.name, caption, m, null, { mimetype, asDocument: true });

    } catch (error) {
        return m.reply(`Error enlace incorrecto: ${error.message}`);
    }
}

handler.help = ["mega"]
handler.tags = ["Descargas de archivos"]
handler.command = /^(mega)$/i
export default handler

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

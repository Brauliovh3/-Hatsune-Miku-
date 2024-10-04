import fs from 'fs';
import path from 'path';

let handler = async (m, { conn }) => {
    let name2 = conn.getName(m.sender); // Obtener el nombre del que usa el comando
    m.react('🤣'); // Reacción al mensaje

    // Mensaje indicando que la persona se está riendo
    let str = `${name2} Se está riendo🤣.`.trim();

    // Si es un grupo, seleccionamos un video aleatorio y lo enviamos
    if (m.isGroup) {
        let pp = 'https://files.catbox.moe/0zrnuq.mp4';
        let pp2 = 'https://files.catbox.moe/hd569j.mp4';
        let pp3 = 'https://files.catbox.moe/e0ybd8.mp4';
        let pp4 = 'https://files.catbox.moe/0dmyx7.mp4';
        let pp5 = 'https://files.catbox.moe/tbycri.mp4';

        const videos = [pp, pp2, pp3, pp4, pp5];
        const video = videos[Math.floor(Math.random() * videos.length)];

        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str });
    }
}

handler.help = ['reirse'];
handler.tags = ['fun'];
handler.command = ['laugh', 'reírse', 'reirse','graciosa','gracioso','risa'];
handler.group = true;

export default handler;

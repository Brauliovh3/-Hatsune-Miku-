import fs from 'fs';
import path from 'path';

let handler = async (m, { conn }) => {
    let name2 = conn.getName(m.sender); // Obtener el nombre del que usa el comando
    m.react('😠'); // Reacción al mensaje

    // Mensaje indicando que la persona está enojada
    let str = `${name2} está enojado/a😡💢.`.trim();

    // Si es un grupo, seleccionamos un video aleatorio y lo enviamos
    if (m.isGroup) {
        let pp = 'https://files.catbox.moe/2aedd3.mp4';
        let pp2 = 'https://files.catbox.moe/fqf4ey.mp4';
        let pp3 = 'https://files.catbox.moe/v7ldgq.mp4';
        let pp4 = 'https://files.catbox.moe/uedd7l.mp4';
        let pp5 = 'https://files.catbox.moe/5stubg.mp4';
        let pp6 = 'https://files.catbox.moe/phaft3.mp4';

        const videos = [pp, pp2, pp3, pp4, pp5, pp6];
        const video = videos[Math.floor(Math.random() * videos.length)];

        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions: [m.sender] });
    }
}

handler.help = ['enojado'];
handler.tags = ['fun'];
handler.command = ['enojado', 'angry','molesto','molesta','arrecho'];
handler.group = true;

export default handler;

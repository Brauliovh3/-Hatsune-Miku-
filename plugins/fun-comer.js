import fs from 'fs';
import path from 'path';

let handler = async (m, { conn }) => {
    let name2 = conn.getName(m.sender); // Obtener el nombre de quien usa el comando
    m.react('😋'); // Reacción al mensaje

    // Mensaje indicando que la persona está comiendo
    let str = `${name2} Está comiendo🍗`.trim();

    // Si es un grupo, seleccionamos un video aleatorio y lo enviamos
    if (m.isGroup){
        let pp = 'https://files.catbox.moe/a67a4g.mp4';
        let pp2 = 'https://files.catbox.moe/rzms6b.mp4';
        let pp3 = 'https://files.catbox.moe/j6akt5.mp4';
        let pp4 = 'https://files.catbox.moe/oew6da.mp4';
        let pp5 = 'https://files.catbox.moe/mappcr.mp4';
        let pp6 = 'https://files.catbox.moe/v6b8cq.mp4';

        const videos = [pp, pp2, pp3, pp4, pp5, pp6];
        const video = videos[Math.floor(Math.random() * videos.length)];

        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions: [m.sender] });
    }
}

handler.help = ['comer'];
handler.tags = ['game'];
handler.command = ['eat', 'comer','tragar'];
handler.group = true;

export default handler;

import fs from 'fs';
import path from 'path';

let handler = async (m, { conn }) => {
    let name2 = conn.getName(m.sender); // Obtener el nombre de quien usa el comando
    m.react('😁'); // Reacción al mensaje

    // Mensaje indicando que la persona está feliz
    let str = `${name2} Se encuentra Feliz.`.trim();

    // Si es un grupo, seleccionamos un video aleatorio y lo enviamos
    if (m.isGroup){
        let pp = 'https://files.catbox.moe/92bs9b.mp4';
        let pp2 = 'https://files.catbox.moe/d56pfs.mp4';
        let pp3 = 'https://files.catbox.moe/kh6ii0.mp4';
        let pp4 = 'https://files.catbox.moe/gmya70.mp4';
        let pp5 = 'https://files.catbox.moe/6mjruj.mp4';
        let pp6 = 'https://files.catbox.moe/kgggyv.mp4';

        const videos = [pp, pp2, pp3, pp4, pp5, pp6];
        const video = videos[Math.floor(Math.random() * videos.length)];

        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions: [m.sender] });
    }
}

handler.help = ['feliz'];
handler.tags = ['fun'];
handler.command = ['feliz', 'happy','alegre'];
handler.group = true;

export default handler;

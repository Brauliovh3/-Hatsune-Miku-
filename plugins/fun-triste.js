import fs from 'fs';
import path from 'path';

let handler = async (m, { conn }) => {
    let name2 = conn.getName(m.sender); // Obtener el nombre del que usa el comando
    m.react('🥹'); // Reacción al mensaje

    // Mensaje indicando que la persona está triste
    let str = `${name2} Está triste😔🥹.`.trim();

    // Si es un grupo, seleccionamos un video aleatorio y lo enviamos
    if (m.isGroup) {
        let pp = 'https://telegra.ph/file/9c69837650993b40113dc.mp4';
        let pp2 = 'https://telegra.ph/file/071f2b8d26bca81578dd0.mp4';
        let pp3 = 'https://telegra.ph/file/0af82e78c57f7178a333b.mp4';
        let pp4 = 'https://telegra.ph/file/8fb8739072537a63f8aee.mp4';
        let pp5 = 'https://telegra.ph/file/4f81cb97f31ce497c3a81.mp4';
        let pp6 = 'https://telegra.ph/file/6d626e72747e0c71eb920.mp4';
        let pp7 = 'https://telegra.ph/file/8fd1816d52cf402694435.mp4';
        let pp8 = 'https://telegra.ph/file/3e940fb5e2b2277dc754b.mp4';

        const videos = [pp, pp2, pp3, pp4, pp5, pp6, pp7, pp8];
        const video = videos[Math.floor(Math.random() * videos.length)];

        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str });
    }
}

handler.help = ['triste'];
handler.tags = ['fun'];
handler.command = ['sad', 'triste','infeliz'];
handler.group = true;

export default handler;

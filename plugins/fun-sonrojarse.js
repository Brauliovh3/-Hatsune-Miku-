import fs from 'fs';
import path from 'path';

let handler = async (m, { conn }) => {
    let name2 = conn.getName(m.sender); // Obtener el nombre del que usa el comando
    m.react('😳'); // Reacción al mensaje

    // Mensaje indicando que la persona se sonrojó
    let str = `${name2} se sonrojó😳.`.trim();

    // Si es un grupo, seleccionamos un video aleatorio y lo enviamos
    if (m.isGroup) {
        let pp = 'https://telegra.ph/file/a4f925aac453cad828ef2.mp4';  
        let pp2 = 'https://telegra.ph/file/f19318f1e8dad54303055.mp4'; 
        let pp3 = 'https://telegra.ph/file/15605caa86eee4f924c87.mp4'; 
        let pp4 = 'https://telegra.ph/file/d301ffcc158502e39afa7.mp4'; 
        let pp5 = 'https://telegra.ph/file/c6105160ddd3ca84f887a.mp4'; 
        let pp6 = 'https://telegra.ph/file/abd44f64e45c3f30442bd.mp4'; 
        let pp7 = 'https://telegra.ph/file/9611e5c1d616209bc0315.mp4'; 

        const videos = [pp, pp2, pp3, pp4, pp5, pp6, pp7];
        const video = videos[Math.floor(Math.random() * videos.length)];

        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str });
    }
}

handler.help = ['sonrojarse'];
handler.tags = ['fun'];
handler.command = ['blush', 'sonrojarse','cesonroja'];
handler.group = true;

export default handler;

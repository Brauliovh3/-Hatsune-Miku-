import fs from 'fs';
let handler = async (m, { conn }) => {
    let vn = './media/miku.mp3';
    conn.sendFile(m.chat, vn, 'miku.mp3', null, m, true, {
        type: 'audioMessage',
        ptt: true
    });
};

handler.customPrefix = /Miku|miku/; 
handler.command = new RegExp(); // Esto puede ser opcional

export default handler; // Asegúrate de exportar el handler

let handler = async (m, { conn, command }) => {
    let paypal = 'https://www.paypal.com/paypalme/DEPOOL03';
    let fkontak = { 
        "key": { 
            "participants": "0@s.whatsapp.net", 
            "remoteJid": "status@broadcast", 
            "fromMe": false, 
            "id": "Halo" 
        }, 
        "message": { 
            "contactMessage": { 
                "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` 
            } 
        }, 
        "participant": "0@s.whatsapp.net" 
    };

    let user = db.data.users[m.sender];
    let str = `💙 *HOLA TE AGRADEZCO DE CORAZON SI ME APOYAS DONANDO. LOS BOTS ME INSPIRARON A CREAR A HATSUNE MIKU Y PUES SEGUIR ADELANTE CON LA CARRERA DE INGENIERO DE SOFTWARE*, *SEGUIRE EN ACTUALIZACION CON LA BOT Y MAS HASTA QUE ME GRADUE*,*GRACIAS POR TU APOYO*💙 nos vemos pronto!
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
💙 *Paypal - Donar*
${paypal}
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈`;
@Hatsune Miku| By DEPOOL
    let dev = 'Braulio Julian Velasquez Huillca';  // Define 'dev' si es necesario

    // Define imagen1
    let imagen1 = 'https://i.ibb.co/h1ssrWC/file.jpg';  // Reemplaza con la URL de tu imagen

    // Usa la función sendMessage en lugar de sendMini
    await conn.sendMessage(m.chat, { 
        image: { url: imagen1 }, 
        caption: str, 
        footer: paypal, 
        mentions: [m.sender], 
        contextInfo: fkontak 
    });
}

handler.help = ['donar'];
handler.tags = ['mantenimiento'];
handler.command = ['donar', 'apoyar', 'PayPal'];

export default handler;

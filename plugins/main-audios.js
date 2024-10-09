import fs from 'fs';

let handler = async (m, { conn }) => {
  try {
    let text = m.text.toLowerCase();
    let user = global.db.data.users[m.sender];

    const audioMap = {
      'miku': './media/miku.mp3',
      'mine': './media/miku2.mp3',
      'baneado': './media/baneado.mp3',
      'ayuda': './media/ayuda.mp3',
      'gey': './media/marica.mp3',
      'ara': './media/Ara.mp3',
      'bot': './media/bot.mp3',
      'bañate': './media/banate.mp3',
      'buenos días': './media/Buenos-dias-2.mp3',
      'felíz cumpleaños': './media/Feliz-cumple.mp3',
      'invocar': './media/Invocar.mp3',
      'hentai': './media/hentai.mp3',
      'nose': './media/maau1.mp3',
      'lala': './media/lala.mp3',
      'dios': './media/dios.mp3',
      'sad': './media/sad.mp3',
      'risa': './media/jaja.mp3',
      'motivar': './media/motivar.mp3',
      'se unió usando el enlace de invitación del este grupo': './media/se unió usando el enlace de invitación del este grupo.mp3',
      'calculadora': './media/calculadora.mp3',
      'tengo novia': './media/tengo novia.mp3'
    };

    // Buscar si alguna clave coincide con el texto recibido
    for (let key in audioMap) {
      if (text.includes(key.toLowerCase())) {  // Comparar en minúsculas
        let filePath = audioMap[key];
        if (fs.existsSync(filePath)) {
          // Enviar el archivo de audio como mensaje de voz
          await conn.sendFile(m.chat, filePath, `${key}.mp3`, null, m, true, { type: 'audioMessage' });
        } else {
          m.reply(`El archivo de audio correspondiente a "${key}" no se encontró.`);
        }
        break; // Romper el bucle si se encuentra y envía un audio
      }
    }
  } catch (err) {
    console.error(err);
    m.reply('Ocurrió un error al intentar enviar el audio.');
  }
};

// Ayuda y comandos reconocidos
handler.help = [
  'miku', 'mine', 'ayuda', 'baneado', 'gey', 'ara', 
  'bañate', 'bot', 'buenos días', 'felíz cumpleaños', 'invocar', 
  'hentai', 'nose', 'lala', 'dios', 'sad', 'risa', 'motivar', 'calculadora', 'tengo novia'
];

// Prefijos y comandos, corregido el prefijo personalizado
handler.customPrefix = /^(miku|mine|baneado|ayuda|gey|ara|bañate|bot|buenos días|felíz cumpleaños|invocar|hentai|nose|lala|dios|sad|risa|motivar|calculadora|tengo novia)$/i;
handler.command = new RegExp;
handler.tags = ['Audios Miku'];

export default handler;

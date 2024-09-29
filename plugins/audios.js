import fs from 'fs';

let handler = async (m, { conn }) => {
  let text = m.text.toLowerCase(); 
  let user = global.db.data.users[m.sender];

  const audioMap = {
    'linda': './media/hdpta.mp3',
    'sin sentimiento': './media/elcorazon.mp3',
    'elcorazone': './media/elcorazon.mp3',
    'ayuda': './media/ayuda.mp3',
    'gey': './media/gey.mp3', 
    'negra': './media/negra.mp3', 
    'callate': './media/callate.mp3', 
    'super albañil': './media/super albañil.mp3', 
    'peruano': './media/peruano.mp3', 
    'viva venezuela': './media/viva venezuela.mp3', 
    'que me importa': './media/que me importa.mp3', 
    'mondongo': './media/mondongo.mp3',
    'bebitofiufiu': './media/bebitofiufiu.mp3',
    'lala': './media/lala.mp3',
    'dios': './media/dios.mp3', 
    'sad': './media/sad.mp3', 
    'risa': './media/jaja.mp3', 
    'motivar': './media/motivar.mp3',
    'se unió usando el enlace de invitación del este grupo': './media/se unió usando el enlace de invitación del este grupo.mp3',
    'calculadora': './media/calculadora.mp3', 
    'tengo novia': './media/tengo novia.mp3'
    
  };

  for (let key in audioMap) {
    if (text.includes(key)) {
      try {
        if (fs.existsSync(audioMap[key])) {
          await conn.sendFile(m.chat, audioMap[key], `${key}.mp3`, '', m, false, { mimetype: 'audioMessage', asDocument: user.useDocument });
        } else {
          m.reply('El audio correspondiente no se encontró.');
        }
      } catch (err) {
        console.error(err);
        m.reply('Ocurrió un error al intentar enviar el audio.');
      }
      break;
    }
  }
};

handler.help = ['ayuda', 'gey', 'ayuda', 'elcorazon', 'sin sentimiento', 'linda','negra', 'callate', 'super albañil', 'que me importa', 'mondongo', 'bebitofiufiu', 'lala', 'dios', 'risa', 'tengo novia', 'calculadora', 'motivar',
'peruano', 'se unió usando el enlace de invitación del este grupo', 'viva venezuela', 'sad']
handler.customPrefix = /^(hola|cómo estás|goku|gey|si te mueves|ayuda|sin sentimiento|linda|negra|eres tu|callate|super albañil|peruano|viva venezuela|que me importa|mondongo|bebitofiufiu|lala|dios|sad|jaja|motivar|calculadora|tengo novia|se unió usando el enlace de invitación del este grupo)/i;
handler.command = new RegExp;
handler.tags = ['Audios Miku'] 
export default handler;

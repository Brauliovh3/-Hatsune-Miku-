import yts from 'yt-search';

let handler = async (m, { conn, command, args, text, usedPrefix }) => {

    if (!text) {

        return conn.reply(m.chat, '*💙Ingresa el nombre de una cancion o video*', m);

    }

    await m.react('🕛');

    let res = await yts(text);

    let play = res.videos[0];

    if (!play) {

        throw `Error: Vídeo o Audio no Encontrado`;

    }

    let { title, thumbnail, ago, timestamp, views, videoId, url } = play;

    let txt = '```Hatsune Miku Download```\n';

    txt += '┗☵☵☵☵☵☵☵🌱🌱🌱☵☵☵☵☵☵┛\n';

    txt += `💙 *𝚃𝚒𝚝𝚞𝚕𝚘* : _${title}_\n`;

    txt += `💙 *𝙲𝚛𝚎𝚊cion* : _${ago}_\n`;

    txt += `💙 *𝙳𝚞𝚛𝚊𝚌𝚒𝚘𝚗* : _${timestamp}_\n`;

    txt += `💙 *𝚅𝚒𝚜𝚒𝚝𝚊𝚜* : _${views.toLocaleString()}_\n`;

    txt += `💙 *𝙻𝚒𝚗𝚔* : _https://www.youtube.com/watch?v=${videoId}_\n`;

    txt += '┗☵☵☵☵☵☵☵|💙💙💙|☵☵☵☵☵☵☵┛ \n';
    
    txt += '  Creador: (ㅎㅊDEPOOLㅊㅎ)        ';

    txt += '             💙HATSUNE MIKU💙          ';

    await conn.sendButton2(m.chat, txt, '. ', thumbnail, [

        ['MP3🎧', `${usedPrefix}ytmp3 ${url}`],

        ['MP3DOC💾', `${usedPrefix}ytmp3doc ${url}`],

        ['MP4🎥', `${usedPrefix}ytmp4 ${url}`], 

        ['MP4DOC🎬', `${usedPrefix}ytmp4doc ${url}`]

        ], null, [['Canal', 'https://whatsapp.com/channel/0029VajYamSIHphMAl3ABi1o']], m);
    
    await m.react('☑️');

};

handler.help = ['play'];

handler.tags = ['downloader'] 

handler.command = ['play',];

export default handler;

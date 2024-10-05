import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
    if (!text) return m.reply('Ingrese el título de un Anime.');

    await m.react('🕓');

    // Obtener datos de la API
    let res = await fetch('https://api.jikan.moe/v4/anime?q=' + encodeURIComponent(text));
    let json = (await res.json()).data;

    // Verifica que haya resultados
    if (!json || json.length === 0) {
        return m.reply('No se encontraron resultados para ese título.');
    }

    // Obtener la imagen
    let img = await (await fetch(json[0].images.jpg.large_image_url)).buffer();

    // Usar la sinopsis en español
    let synopsis = json[0].synopsis; // Asumimos que ya está en español

    // Enviar la imagen
    await conn.sendMessage(m.chat, {
        image: img,
        caption: `*🌱  A N I M E  -  I N F O  🌱*\n\n` +
                 `💙  *Título* : ${json[0].title}\n` + // Título
                 `💙  *Id* : ${json[0].mal_id}\n` +   // Id
                 `💙  *Tipo* : ${json[0].type}\n` +   // Tipo
                 `💙  *Episodios* : ${json[0].episodes}\n` + // Episodios
                 `💙  *Estado* : ${json[0].status}\n` + // Estado
                 `💙  *Emitido* : ${json[0].aired.string}\n` + // Emitido
                 `💙  *Clasificación* : ${json[0].rating}\n` + // Clasificación
                 `💙  *Duración* : ${json[0].duration}\n` + // Duración
                 `💙  *Puntaje* : ${json[0].score}\n` + // Puntaje
                 `💙  *Género* : ${json[0].genres.map((val) => val.name).join(", ")}\n` + // Género
                 `💙  *Sinopsis* : ${synopsis}\n`, // Sinopsis en español
        mentions: [m.sender],
    });

    await m.react('✅');
};

handler.help = ['animeinfo'];
handler.tags = ['search'];
handler.command = ['anime-info', 'animeinfo', 'infonime', 'animesearch'];

handler.react_error = true;

export default handler;

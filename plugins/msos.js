let fetch = require('node-fetch')
     let handler  = async (m, { conn, usedPrefix, command }) => {
    heum = await fetch(`https://api-alc.herokuapp.com/api/chicas/muslos?&apikey=ConfuMods`)
    json = await heum.buffer()
   conn.sendButtonImg(m.chat, json, '*By NeKosmicBot*\n*https://api-alc.herokuapp.com/api/chicas/muslos?&apikey=ConfuMods*', '™𝓝𝓮𝓚𝓸𝓼𝓶𝓲𝓬 - 𝓑𝓞𝓣', 'SIGUIENTE', `${usedPrefix + command}`, m, false)
}
handler.command = /^(muslitos)$/i
handler.admin = true
module.exports = handler

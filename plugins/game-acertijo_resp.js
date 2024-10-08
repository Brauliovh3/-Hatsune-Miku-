import similarity from 'similarity'
const threshold = 0.72
let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    // Asegúrate de que el mensaje está citado y tiene el formato correcto
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/^ⷮ/i.test(m.quoted.text)) return !0

    // Inicializa this.tekateki si no está definido
    this.tekateki = this.tekateki || {}

    // Verifica si el acertijo está en progreso
    if (!(id in this.tekateki)) return m.reply('Ese acertijo ya ha terminado!')

    // Verifica si el mensaje citado es el mismo que el que está en juego
    if (m.quoted.id == this.tekateki[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.tekateki[id][1]))

        // Compara la respuesta del usuario con la respuesta correcta
        if (m.text.toLowerCase().trim() == json.response.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.tekateki[id][2]
            m.reply(`*Respuesta correcta!*\n+${this.tekateki[id][2]} Exp`)
            clearTimeout(this.tekateki[id][3])
            delete this.tekateki[id]
        } 
        // Si la respuesta es cercana según el umbral de similitud
        else if (similarity(m.text.toLowerCase(), json.response.toLowerCase().trim()) >= threshold) {
            m.reply('Casi lo logras!')
        } 
        // Si la respuesta es incorrecta
        else {
            m.reply('Respuesta incorrecta!')
        }
    }
    return !0
}
handler.exp = 0
export default handler

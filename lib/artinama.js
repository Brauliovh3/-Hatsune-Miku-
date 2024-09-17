const axios = require('axios')
const cheerio = require('cheerio')

async function ArtiNama(nama) {
  return new Promise((resolve, reject) => {
    axios.get(`https://www.primbon.com/arti_nama.php?nama1=${nama}&proses=+Submit%21+`)
      .then(({
        data
      }) => {
        const $ = cheerio.load(data)
        const isi = $('#body').text().split('Nama:')[0]
        const res = {
            status: 200,
            result: isi
          }
          resolve(res)
      })
      .catch(reject)
  })
}

module.exports = ArtiNama
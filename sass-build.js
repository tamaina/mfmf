const fs = require('fs')
const sass = require('node-sass')
sass.render({
    file: 'src/style/main.sass'
}, (err, res) => {
    if (err) throw err
    try {
        fs.mkdirSync('dist/style')
    } catch (e) {
        void(0)
    }
    fs.writeFileSync('dist/style/mfm.css', res.css)
})

const mfmf = require('./dist/script')
const src = `> パ
> イ
> ナ
> ツ
> プ
> ル
リクエスト
`

console.log(
    mfmf.render(
        src,
        { nostyle: false, baseUrl: '?', codeTagAsDiv: true }
    )
)
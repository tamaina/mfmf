const fs = require("fs")
const mfmf = require('./dist/script')

const src = fs.readFileSync("test.mfm", "utf8")

console.log('\n★mfm → joinmisskey式html')

const parsed = mfmf.parse(src)

fs.writeFileSync("parsed.json", JSON.stringify(parsed, null, 4))

const res = mfmf.render(
    parsed,
    [],
    { jmstyle: true, url: '?', codeTagAsDiv: false, faJm: true, animate: true }
)

console.log(res)
console.log('\n★mfm → 外部に渡すhtml')
console.log(
    mfmf.render(
        parsed,
        [],
        { url: '?', codeTagAsDiv: false }
    )
)
/*
console.log('\n★Mastodonからのcontent')
console.log(mfmf.htmlToMfm(`\u003cp\u003e\u003ca href=\"http://joinmisskey.github.io/\" rel=\"nofollow noopener\" target=\"_blank\"\u003e\u003cspan class=\"invisible\"\u003ehttp://\u003c/span\u003e\u003cspan class=\"\"\u003ejoinmisskey.github.io/\u003c/span\u003e\u003cspan class=\"invisible\"\u003e\u003c/span\u003e\u003c/a\u003e\u003cbr /\u003e\u003ca href=\"https://mstdn.jp/tags/misskey\" class=\"mention hashtag\" rel=\"tag\"\u003e#\u003cspan\u003emisskey\u003c/span\u003e\u003c/a\u003e\u003cbr /\u003e\u003cspan class=\"h-card\"\u003e\u003ca href=\"https://misskey.xyz/@aqz\" class=\"u-url mention\"\u003e@\u003cspan\u003eaqz\u003c/span\u003e\u003c/a\u003e\u003c/span\u003e \u003cbr /\u003eMastodonにめっちゃTwitterから移住してきたらしいけど、Misskeyにも来てみない？\u003c/p\u003e`))

console.log('\n★Misskeyからのcontent')
console.log(mfmf.htmlToMfm('<p>んー</p><p><a href=\"https://misskey.xyz/notes/5b7973cf30ecca4ed17218ce\">【Misskeyで投票を見る】</a></p>'))

console.log('\nHashtag?')
console.log(mfmf.htmlToMfm('<p><a href=\"https://misskey.xyz/tags/hashtag\" rel=\"tag\">#hashtag</a> ?</p>'))
console.log('\nHashtag?')
console.log(mfmf.htmlToMfm('<p><a href=\"https://misskey.xyz/\">https://misskey.xyz/</a> ?</p>'))
*/


const readme = fs.readFileSync("./README.md", "utf8").replace(/\r?\n/g, "\n")

const x = ["<!-- MFM_START -->\n", "\n<!-- MFM_END -->"]
const re = /<!-- MFM_START -->\n[\s\S]*?\n<!-- MFM_END -->/

const nreadme = readme.replace(/\r?\n/g, "\n").replace(re, `${x[0]}${res}${x[1]}`)

fs.writeFileSync("./README.md", nreadme)


const mfmf = require('./dist/script')
const src = `mfm parse test
***Big***
**Bold**
\`\`\`
Code (Block)
const thisis = true
\`\`\`
\`Code (Inline)\`
:innocent: Emoji
#hashtag
[link](https://misskey.xyz)
@mention @mention@other.instance
(((motion))) <motion>motion</motion>
"
Quote
"
【Title】
[title]
Misskey Search
Misskey [Search]
https://misskey.xyz
`

console.log('\n★mfm → joinmisskey式html')
console.log(
    mfmf.render(
        src,
        { nostyle: false, baseUrl: '?', codeTagAsDiv: true }
    )
)
console.log('\n★mfm → 外部に渡すhtml')
console.log(
    mfmf.render(
        src,
        { nostyle: true, baseUrl: 'https://misskey.xyz', codeTagAsDiv: false }
    )
)
console.log('\n★Mastodonからのcontent')
console.log(mfmf.htmlToMfm(`\u003cp\u003e\u003ca href=\"http://joinmisskey.github.io/\" rel=\"nofollow noopener\" target=\"_blank\"\u003e\u003cspan class=\"invisible\"\u003ehttp://\u003c/span\u003e\u003cspan class=\"\"\u003ejoinmisskey.github.io/\u003c/span\u003e\u003cspan class=\"invisible\"\u003e\u003c/span\u003e\u003c/a\u003e\u003cbr /\u003e\u003ca href=\"https://mstdn.jp/tags/misskey\" class=\"mention hashtag\" rel=\"tag\"\u003e#\u003cspan\u003emisskey\u003c/span\u003e\u003c/a\u003e\u003cbr /\u003e\u003cspan class=\"h-card\"\u003e\u003ca href=\"https://misskey.xyz/@aqz\" class=\"u-url mention\"\u003e@\u003cspan\u003eaqz\u003c/span\u003e\u003c/a\u003e\u003c/span\u003e \u003cbr /\u003eMastodonにめっちゃTwitterから移住してきたらしいけど、Misskeyにも来てみない？\u003c/p\u003e`))

console.log('\n★Misskeyからのcontent')
console.log(mfmf.htmlToMfm('<p>んー</p><p><a href=\"https://misskey.xyz/notes/5b7973cf30ecca4ed17218ce\">【Misskeyで投票を見る】</a></p>'))
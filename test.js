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
https://misskey.xyz
`
console.log(
    mfmf.render(
        src,
        { nostyle: false, baseUrl: '?', codeTagAsDiv: true }
    )
)
// console.log(mfmf.htmlToMfm(`mfm parse test<br><br><a href="https://misskey.xyz">url</a><br><br><a href="https://www.google.com/?#q=Misskey">Misskey search</a>`))
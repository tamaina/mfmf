# [mfmf: Misskey Flavored Markdown Functions](https://tamaina.github.io/mfmf/)
[Misskey](https://github.com/syuilo/misskey)で使われているMarkdown風の書式をライブラリとして扱うことができます。  
Misskeyのソースコードをほぼそのまま抜き出しています。

## liscense
[LICENSE](./LICENSE)

## install
```
npm install mfmf
```

## usage

### Script
```
const mfm = require('mfmf')
```

### Basic
```
const mfmstring = "**mfmf**"
const html = mfm.render(mfm.parse(mfmstring), [])
console.log(html)
// => `<p data-mfm="root"><b data-mfm="bold">mfmf</b></p>`
```

#### mfm.render(input: MfmForest, mentionedRemoteUsers: INote['mentionedRemoteUsers'], options?: any): string(HTML)
`MfmForest`を渡すと、HTML文字列が返ってきます。`toHtml`のエイリアスです。

#### mentionedRemoteUsers: INote['mentionedRemoteUsers']
Misskey内部処理で必要だったものです。リモートのメンションに関係するものです。

#### config
オプションを指定します。  
何も指定しないときでも空のオブジェクト`{}`を渡してください。  
初期値は特記のない限り全てfalseまたは`''`です。

- **`jmstyle`** boolean
  * `true`……joinmisskey用のHTML(付属のCSS/SASSで利用可)
  * `false`……リモート送信用(ただし`data-mfm`属性は自動で付加されます。不要な場合は取り除いてください。)
- **`url`** string : タグやリプライのリンクのプレフィクスです。不要なので`?`などのクエリを指定しておくとよいと思います。
- **`animate`** : `true`に設定するとanimate.cssのクラスを出力します。
- **`codeTagAsDiv`** : `true`に設定すると`pre`・`code`タグだったものが`div.pre`・`div.code`になります。
- **`rootTagName`** : ルート要素のタグを指定します。初期値は`jmstyle ? 'div' : 'p'`です。

#### mfm.parse(source: string): MfmForest
MFMテキストから`MfmForest`を生成します。

#### mfm.htmlToMfm(html: string): string(mfm)
HTMLをMFMに変換します。`fromHtml`のエイリアスです。

### CSS
SASSで記述されており、`src/style`にソースがあります。プレビュー用に`dist/style/mfm.css`もあります。

### おまけ
mfmfは、mfmの実行に必要なpreludeやtypesなどもexportします。

## Example
[ソースファイル](./test.mfm)

<script defer src="https://use.fontawesome.com/releases/v5.5.0/js/all.js" crossorigin="anonymous"></script>
<script defer src="./assets/prism.js" crossorigin="anonymous"></script>
<link rel="stylesheet" type="text/css" href="./dist/style/mfm.css" />
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/animate.css@3.5.2/animate.min.css" />
<link rel="stylesheet" type="text/css" href="./assets/prism.css" />

<!-- MFM_START -->
<div data-mfm="root"><span data-mfm="text">mfm parse test<br></span><span data-mfm="big" class="animated tada"><span data-mfm="text">Big</span></span><span data-mfm="text"><br></span><span data-mfm="bold"><span data-mfm="text">Bold</span></span><span data-mfm="text"><br></span><span data-mfm="strike"><span data-mfm="text">Strike</span></span><span data-mfm="text"><br><br></span><div data-mfm="title"><span data-mfm="text">Code (Block)</span></div><div data-mfm="blockCode"><div data-mfm="blockCode-inner">PLAIN TEXT</div></div><div data-mfm="blockCode"><div data-mfm="blockCode-inner" class="language-typescript">export const うふふ = (name: string = "フランちゃん") =&gt; {
  return `${name}うふふ`
}</div></div><span data-mfm="inlineCode" class="mfm-highlight">Code (Inline)</span><span data-mfm="text"><br></span>:innocent:<span data-mfm="text"> Emoji<br></span><a href="?/tags/hashtag" rel="tag" data-mfm="hashtag">#hashtag</a><span data-mfm="text"><br></span><a href="https://misskey.xyz" data-mfm="link"><span data-mfm="text">link</span></a><span data-mfm="text"><br></span><a href="?/@mention" data-mfm="mention">@mention</a><span data-mfm="text"> </span><a href="?/@mention@other.instance" data-mfm="mention">@mention@other.instance</a><span data-mfm="text"><br></span><span data-mfm="motion" class="animated rubberBand"><span data-mfm="text">motion</span></span><span data-mfm="text"> </span><span data-mfm="motion" class="animated rubberBand"><span data-mfm="text">motion</span></span><span data-mfm="text"><br></span><div data-mfm="center">:v:</div><span data-mfm="text"><br></span><span data-mfm="flip"><span data-mfm="text">flip</span></span><span data-mfm="text"> </span><span data-mfm="jump"><span data-mfm="text">jump</span></span><span data-mfm="text"> </span><span data-mfm="spin"><span data-mfm="text">spin</span></span><span data-mfm="text"><br>"<br>Quote<br>"<br><br></span><div data-mfm="title"><span data-mfm="text">Title</span></div><div data-mfm="title"><span data-mfm="text">title</span></div><div data-mfm="search"><input data-mfm="search-input" type="search" placeholder="Misskey" value="Misskey"><button data-mfm="search-button"><i class="fas fa-search" data-mfm="search-button-icon" data-fa-prefix="fas" data-fa-icon-name="search"></i><span> 検索</span></button></div><div data-mfm="search"><input data-mfm="search-input" type="search" placeholder="Misskey" value="Misskey"><button data-mfm="search-button"><i class="fas fa-search" data-mfm="search-button-icon" data-fa-prefix="fas" data-fa-icon-name="search"></i><span> 検索</span></button></div><a href="https://misskey.xyz/?ai#syuilo" data-mfm="url"><span data-mfm="url-schema">https://</span><span data-mfm="url-hostname">misskey.xyz</span><span data-mfm="url-port"></span><span data-mfm="url-pathname">/</span><span data-mfm="url-icon">?ai</span><span data-mfm="url-hash">#syuilo</span><i class="fas fa-external-link-square-alt" data-mfm="url-icon" data-fa-prefix="fas" data-fa-icon-name="external-link-square-alt"></i></a><span data-mfm="text"><br></span></div>
<!-- MFM_END -->

## 開発
### ビルド
```
npm run build
```

### テスト
```
gulp test
```

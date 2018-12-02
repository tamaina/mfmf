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
// => "<p><b data-mfm=\"bold\">mfmf</b></b>"
```

#### mfm.render(input: Node[], mentionedRemoteUsers: INote['mentionedRemoteUsers'], options?: any): string(HTML)
`Node[]`を渡すと、HTML文字列が返ってきます。

#### mentionedRemoteUsers: INote['mentionedRemoteUsers']
Misskey内部処理で必要だったものです。リモートのメンションに関係するものです。

**特に必要がない場合、`[]`を指定します。**

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

#### mfm.parse(source: string): Node[]
MFMテキストから`Node[]`を生成します。

#### mfm.syntaxHighlighter(source: string): string
Misskey独自のシンタックスハイライトをします。  
VS Codeなどでは第二引数にlang(使用言語)が存在すると言われますが、未実装のため使われません。

#### mfm.htmlToMfm(html: string): string(mfm)
HTMLをMFMに変換します。

### CSS
SASSで記述されており、`src/style`にソースがあります。プレビュー用に`dist/style/mfm.css`もあります。

### おまけ
`misc`や`models`、`prelude`からMisskeyのスクリプトに依存しないものを同梱しています。  
特にmodelsはTypeScriptでの開発に便利だと思います。

## Example
<script defer src="https://use.fontawesome.com/releases/v5.5.0/js/all.js" crossorigin="anonymous"></script>
<link rel="stylesheet" type="text/css" media="screen" href="./dist/style/mfm.css" />
<link rel="stylesheet" type="text/css" media="screen" href="https://cdn.jsdelivr.net/npm/animate.css@3.5.2/animate.min.css" />

<!-- render by test.js and paste here to try mfm -->
<div data-mfm="root"><span data-mfm="text">mfm parse test<br></span><span data-mfm="big" class="animated tada"><span data-mfm="text">Big</span></span><span data-mfm="text"><br></span><span data-mfm="bold"><span data-mfm="text">Bold</span></span><span data-mfm="text"><br></span><div data-mfm="blockCode"><div data-mfm="blockCode-inner" class="mfm-highlight">Code (Block)
const thisis = true</div></div><code data-mfm="inlineCode" class="mfm-highlight">Code (Inline)</code><span data-mfm="text"><br></span>:innocent:<span data-mfm="text"> Emoji<br></span><a href="?/tags/hashtag" rel="tag" data-mfm="hashtag">#hashtag</a><span data-mfm="text"><br></span><a href="https://misskey.xyz" data-mfm="link"><span data-mfm="text">link</span></a><span data-mfm="text"><br></span><a href="?/@mention" data-mfm="mention">@mention</a><span data-mfm="text"> </span><a href="?/@mention@other.instance" data-mfm="mention">@mention@other.instance</a><span data-mfm="text"><br></span><span data-mfm="motion" class="animated rubberBand"><span data-mfm="text">motion</span></span><span data-mfm="text">
</span><span data-mfm="motion" class="animated rubberBand"><span data-mfm="text">motion</span></span><span data-mfm="text"><br></span><div data-mfm="center">:v:</div><span data-mfm="text"><br>"<br>Quote<br>"<br></span><div data-mfm="title"><span data-mfm="text">Title</span></div><div data-mfm="title"><span data-mfm="text">title</span></div><div data-mfm="search"><input data-mfm="search-input" type="search" placeholder="Misskey" value="Misskey"><button data-mfm="search-button"><i class="fas fa-search" data-mfm="search-button-icon" data-fa-prefix="fas" data-fa-icon-name="search"></i><span>検索</span></button></div><div data-mfm="search"><input data-mfm="search-input" type="search" placeholder="Misskey" value="Misskey"><button data-mfm="search-button"><i class="fas fa-search" data-mfm="search-button-icon" data-fa-prefix="fas" data-fa-icon-name="search"></i><span>検索</span></button></div><a href="https://misskey.xyz" data-mfm="url"><span data-mfm="url-schema">https://</span><span data-mfm="url-hostname">misskey.xyz</span><span data-mfm="url-port"></span><span data-mfm="url-pathname">/</span><span data-mfm="url-icon"></span><span data-mfm="url-hash"></span><i class="fas fa-external-link-square-alt" data-mfm="url-icon" data-fa-prefix="fas" data-fa-icon-name="external-link-square-alt"></i></a><span data-mfm="text"><br></span></div>
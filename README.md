# [mfmf: Misskey Flavored Markdown Functions](https://tamaina.github.io/mfmf/)
[Misskey](https://github.com/syuilo/misskey)で使われているMarkdown風の書式をライブラリとして扱うことができます。  
Misskeyのソースコードをほぼそのまま抜き出しています。

## liscense
[LISCENSE](./LISCENSE)

## install
```
npm install mfmf
```

## usage

### Script
```
const mfm = require('mfmf')
```

#### mfm.render(input: TextElement[] | string, options): string(html)
MFMテキストまたは`TextElement[]`を渡すと、HTML文字列が返ってきます。

#### options
オプションを指定します。  
何も指定しないときでも空のオブジェクト`{}`を渡してください。  
初期値は全てfalseまたは`''`です。

- **`nostyle`** boolean : `true`に設定するとスタイル指定を行わない設定のHTMLを返します。
  * `false`のときは付属のCSS/SASSで利用できる形のスタイルが返ってきます。
- **`baseUrl`** string : タグやリプライのリンクのプレフィクスです。不要なので`?`などのクエリを指定しておくとよいと思います。
- **`disableAnimate`** : `true`に設定すると`nostyle: false`のとき出力されるanimate.cssで使われるクラスを出力しません。
- **`codeTagAsDiv`** : `true`に設定すると`pre`・`code`タグだったものが`div.pre`・`div.code`になります。

#### mfm.parse(source: string): TextElement[]
MFMテキストから`TextElement[]`を生成します。

#### mfm.syntaxHighlighter(source: string): string
Misskey独自のシンタックスハイライトをします。  
VS Codeなどでは第二引数にlang(使用言語)が存在すると言われますが、未実装のため使われません。

#### mfm.htmlToMfm(html: string): string(mfm)
HTMLをMFMに変換します。

### CSS
SASSで記述されており、`src/style`にソースがあります。プレビュー用に`dist/style/mfm.css`もあります。

## example
Example may be shown on GitHub powered by Jekyll

{% include example.html %}

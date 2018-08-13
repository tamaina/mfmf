# mfmf: Misskey Flavored Markdown Functions
## install
```
npm install mfmf
```

## usage

### .render(input: TextElement[] | string, options) => string
MFMテキストまたは`TextElement[]`を渡すと、HTML文字列が返ってきます。

#### options
オプションを指定します。  
何も指定しないときでも空のオブジェクト`{}`を渡してください。  
初期値は全てfalseまたは`''`です。

- **`nostyle`** boolean : `true`に設定するとスタイル指定を行わない設定のHTMLを返します。
  * `false`のときは*mfm.sass/.css*で利用できる形のスタイルが返ってきます。
- **`baseUrl`** string : タグやリプライのリンクのプレフィクスです。不要なので`?`などのクエリを指定しておくとよいと思います。
- **`disableAnimate`** : `true`の設定すると

### .parse(source: string) => TextElement[]
MFMテキストから`TextElement[]`を生成します。

### .syntaxHighlighter(source: string) => string
Misskey独自のシンタックスハイライトをします。

特定の単語

###
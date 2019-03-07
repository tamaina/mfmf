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
[結果](./demo.html)

## 開発
### ビルド
```
npm run build
```

### テスト
```
gulp test
```

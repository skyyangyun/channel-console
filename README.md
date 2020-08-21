# Channel Console

## Install
As ES module:
```html
<script type="module" src="index.js"></script>
```
Use npm:
```shell
npm install channel-console
```

## Usage

```javascript
console.config({
  channels: ['yy'], // define channels name
  openDefaultChannel: false // close others output which not in channel
});
console.log("some rubbish output"); 
// it will log nothing happan because you close default channel
console.log("useful information", "yy"); 
// => [yy] useful information
// last param will be channel name, you hava a clear channel info
```

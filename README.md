# clickerheroes-save

Parse a ClickerHeroes save.

## Example

``` javascript
var parse = require('clickerheroes-save');
var fs = require('fs');
var path = require('path');

var fix = path.resolve(__dirname, './save.txt');
fs.readFile(fix, {encoding: 'ascii'}, function(error, data) {
  parse(data);
  // => { ... }
});
```

## Installation

``` bash
$ npm install clickerheroes-save
```

## API

``` javascript
var parse = require('clickerheroes-save');
```

### `parse(save)`

Parse _String_ `save` as a ClickerHeroes save file.
# JPlayVisualizerC  <a href="http://doge.mit-license.org"><img src="http://img.shields.io/:license-mit-blue.svg"></a>

## Usage

### Setup environment

* Install node packages

 ```
 npm install
 ```

* After editin files in docs/js,

```
 npm run build
```
to update bundle.js for browser by webpack.

* Open the index.html on your browser

## Development

### How to use your own syntax file

* Generate

 ```
 antlr4 -Dlanguage=JavaScript -visitor Grammar.g4
 ```

### demo page:
[https://ryoskate.github.io/JPlayVisualizerC/](https://ryoskate.github.io/JPlayVisualizerC/)
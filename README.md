# prefix-css-loader
Webpack loader to prefix css selectors

## Installation
`npm install prefix-css-loader --save`

## Description
A tool for when you have the need to prefix all your css with the same selector. Useful for embedding componenets without a shadow dom and not change the styles on the host page.

### Converts this
```css
h1 {
    color: red;
}

@media screen and (min-width: 768px) {
    h1 {
        color: blue;
    }
}
```

### Into this
```css
.my-class h1 {
    color: red;
}

@media screen and (min-width: 768px) {
    .my-class h1 {
        color: blue;
    }
}
```

## Usage
In webpack config use the loader for your css/style files.
```js
{
    test: /\.css$/,
    use: [
        "css-loader",
        {
            loader: "prefix-css-loader",
            options: {
                selector: ".my-class",
                exclude: null,
                minify: false
            }
        }
    ]
}
```

### Options

* `selector`
    - The selector prefix to use. Can be any css selector.
    - Type: `string`
    - Required: Throws error if omitted.
    - Example: `".my-class"`, `"#my-id"`, `"my-tag"`, `"#my-id.my-class"`
*  `exclude`
    - Regular expression for selectors to exclude from update. Excluded selectors are unchanged.    
    - Type: `string` | `RegExp`
    - Optional: No exclution by default.
    - Example: `"h1"`, `/h1/`, `".label"`, `/.label/`
*  `minify`
    - Minify css. Remove comments and whitespaces.
    - Type: `boolean`
    - Optional: By default minify on production mode.

### Query params
* Options can be passed via webpack config or as query params on import. 
* Query params takes precedence over webpack config for that specific file.   
```js
import "styles.css?selector=.my-class";
```

### @import
One stylesheet can include another stylesheet with the @import rule. To also prefix that file use `importLoaders` option on `css-loader`.
```js
[
    {
        loader: "css-loader",
        options: {
            //Include 1 previous loader for @import. ie use prefix-css-loader for @import.
            importLoaders: 1
        }
    },
    {
        loader: "prefix-css-loader",
        options: {
            selector: ".my-class"
        }
    }
]
```
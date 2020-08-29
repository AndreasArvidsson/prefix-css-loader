console.log("test.js");

import "./styles.css";
import "bootstrap/dist/css/bootstrap.css?selector=#my-id";
import styles from "styles-to-js-loader/styles";

const style = styles.get();
document.head.append(style);

//Parse from browser result instead. For debugging only.
// import cssParser from "../src/cssParser";
// import cssParserToString from "../src/cssParserToString"
// const parserRes = cssParser(styles.get().innerHTML);
// const str = cssParserToString(parserRes, true, ".my-class");
// const style = document.createElement("style");
// style.innerHTML = str;
// document.head.append(style);

console.log(style.innerHTML);

function add(attr, value, text) {
    const row = document.createElement("div");
    row.className = "my-row";
    document.body.appendChild(row);

    const colLeft = document.createElement("div");
    colLeft.className = "my-col";
    row.appendChild(colLeft);

    const colRight = document.createElement("div");
    colRight.className = "my-col my-class";
    row.appendChild(colRight);

    let obj;
    switch (attr) {
        case "tag":
            obj = document.createElement(value);
            break;
        case "class":
            obj = document.createElement("div");
            obj.className = value;
            break;
        case "id":
            obj = document.createElement("div");
            obj.id = value;
            break;
        default:
            throw new Error("Unknown attr");
    }
    obj.innerHTML = text;
    colLeft.appendChild(obj);
    colRight.appendChild(obj.cloneNode(true));
}

add("class", "test-class", ".test-class");
add("id", "test-id", "#test-id");
add("tag", "test-tag", "test-tag");

add("class", "class-from-styles2", "@import .class-from-styles2");
add("class", "animation-class", "@keyframes .animation-class");
add("class", "glyphicon", "@font .glyphicon");
add("tag", "ul", "<li>@counter-style ul</li>");

add("class", "media-class", "@media .media-class");
add("id", "media-id", "@media #media-id");
add("tag", "media-tag", "@media media-tag");

add("class", "supports-class", "@supports .supports-class");
add("id", "supports-id", "@supports #supports-id");
add("tag", "supports-tag", "@supports supports-tag");

//Not supported yet in firefox
add("class", "document-class", "@document .document-class");

//Not working
// add("class", "font-features-class", ".font-features-class");
const loaderUtils = require("loader-utils");
const css = require("css");

function loader(content) {
    const request = this.data.request;
    const options = getOptions(this);

    const parsedCss = css.parse(content, { source: request });

    updateRules(parsedCss.stylesheet.rules, options);

    return css.stringify(parsedCss, { compress: options.minify });
}

loader.pitch = function (request, precedingRequest, data) {
    data.request = request;
};

module.exports = loader;

function updateRules(rules, options) {
    rules.forEach(rule => {
        if (rule.selectors) {
            rule.selectors.forEach((selector, index) => {
                if (
                    //at selectors can't be prefixed
                    selector.startsWith("@")
                    //User given exclusion
                    || (options.exclude && options.exclude.test(selector))) {
                    return;
                }
                rule.selectors[index] = options.selector + selector;
            });
        }
        if (rule.rules) {
            updateRules(rule.rules, options);
        }
    });
}

function getOptions(ctx) {
    const defaultOptions = {
        minify: ctx.mode === "production",
        selector: null,
        exclude: null
    };
    const options = loaderUtils.getOptions(ctx);
    const params = ctx.resourceQuery ? loaderUtils.parseQuery(ctx.resourceQuery) : null;
    const res = Object.assign(defaultOptions, options, params);

    if (typeof options.selector !== "string" || !options.selector.trim()) {
        throw new Error("Missing required option: selector")
    }
    res.selector = res.selector.trim() + " ";

    if (res.exclude && !(res.exclude instanceof RegExp)) {
        res.exclude = new RegExp(res.exclude);
    }

    return res;
}
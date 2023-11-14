export const stringLimit = (str, limit, extra) => {
    const ex = extra == undefined ? "..." : extra;

    return str.substr(0, limit) + "" + ex;
};

export const classNames = (custom, classNames) => {
    if (custom || classNames) {
        return (custom ?? "") + " " + (classNames ?? "");
    }

    return null;
};

export const toLocaleString = (date, options) => {
    return date.toLocaleString("en-US", options);
};

export const copy = (text, ref) => {
    if (window.isSecureContext && navigator.clipboard) {
        navigator.clipboard.writeText(text);
    } else {
        ref.focus();
        ref.select();
        document.execCommand("copy");
    }
};

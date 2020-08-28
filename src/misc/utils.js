export const deepFlatten = (arr) =>
    [].concat(...arr.map((v) => (Array.isArray(v) ? deepFlatten(v) : v)));

export const parseRoute = (routes, link = "routes") => {
    return routes
        .map((item) => {
            let nnav = Object.assign({}, item);
            if (Array.isArray(nnav[link])) {
                delete nnav[link];
                return [nnav, ...parseRoute(item[link])];
            } else {
                return item;
            }
        })
        .filter((item) =>
            item.hasOwnProperty("accessible") ? item.accessible : true
        );
};

export const keyToTitleCase = (str) => {
    if (!str) {
        return str;
    }
    let frags = str.split("_");
    for (let i = 0; i < frags.length; i++) {
        frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(" ");
};

export const clearLocalStorage = () => {
    localStorage.removeItem("_user-details");
    localStorage.removeItem("auth_token");
};

export function view(value) {
    if (value) {
        return value;
    }
    return "N/A";
}

import axios from "axios";
import { useInterceptor } from "./apiUtils";

import { URLS } from ".";

const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;

useInterceptor(axios);

export const makeUrl = (url) => {
    return BASE_URL + url;
};

export const getURL = (name, idx, slug) => {
    let url = URLS[name];
    if (!url) throw Error(`URL with name '${name}' does not exist.`);

    if (idx) {
        url = url.replace(":idx", idx);
    }
    if (slug) {
        url = url.replace(":slug", slug);
    }
    return makeUrl(url);
};

export function request(initialConfig) {
    var csrf = {
        xsrfCookieName: "csrftoken",
        xsrfHeaderName: "X-CSRFToken",
    };
    var config = Object.assign({}, initialConfig, csrf);
    return axios(config)
        .then((response) => {
            // return response.data
            return {
                success: true,
                status: response.status,
                data: response.data,
            };
        })
        .catch((error) => {
            // return error.response.data
            return {
                success: false,
                status: error.response.status,
                data: error.response.data,
            };
        });
}

export function api_get({ url, idx, data, params, slug } = {}) {
    return (dispatch, getState) => {
        var config = {
            method: "get",
            url: getURL(url, idx, slug),
            params: params,
            data: data,
        };
        return request(config);
    };
}

export function api_post(params = {}) {
    const { url, data, idx, slug } = params;
    return (dispatch, getState) => {
        var config = {
            method: "post",
            url: getURL(url, idx, slug),
            data: data,
        };
        return request(config);
    };
}

export function api_patch({ url, data, idx, slug } = {}) {
    return (dispatch, getState) => {
        var config = {
            method: "patch",
            url: getURL(url, idx, slug),
            data: data,
        };
        return request(config);
    };
}

export function api_put({ url, data, idx, slug } = {}) {
    return (dispatch, getState) => {
        var config = {
            method: "put",
            url: getURL(url, idx, slug),
            data: data,
        };
        return request(config);
    };
}

export function api_delete({ url, idx } = {}) {
    return (dispatch, getState) => {
        var config = {
            method: "delete",
            url: getURL(url, idx),
        };
        return request(config);
    };
}

export function postFormData(url, values) {
    const data = new FormData();
    Object.keys(values).forEach((key) => {
        data.append(key, values[key]);
    });
    return request({
        url: getURL(url),
        method: "POST",
        data: data,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

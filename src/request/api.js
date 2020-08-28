import axios from 'axios'

import URLS from './urls'

export const getURL = (name, idx, slug) => {
    let url = URLS[name]
    if (!url) throw Error(`URL with name '${name}' does not exist.`);

    if (idx) {
        url = url.replace(":idx", idx);
    }
    if (slug) {
        url = url.replace(":slug", slug)
    }
    return url;
}

export function request(initialConfig) {
	var csrf = {
		xsrfCookieName: 'csrftoken',
		xsrfHeaderName: 'X-CSRFToken'
	}
	var config = Object.assign({}, initialConfig, csrf)
	return axios(config).then(response => {
		// return response.data
		return {success: true, status: response.status, data: response.data}
	}).catch(error => {
		// return error.response.data
		return {success: false, status: error.response.status, data: error.response.data}
	})
}

export function api_get({url, idx, data, params, slug}={}) {

	return (dispatch, getState) => {
		var config = {
			method: 'get',
			url: getURL(url, idx, slug),
			params: params,
			data: data
		}
		return request(config)
	}
}

export function api_post(params={}) {
	const {url, data, idx, slug} = params;
	return (dispatch, getState) => {
		var config = {
			method: 'post',
			url: getURL(url, idx, slug),
			data: data,
		}
		return request(config)
	}
}

export function api_patch({url, data, idx, slug}={}) {

	return (dispatch, getState) => {
		var config = {
			method: 'patch',
			url: getURL(url, idx, slug),
			data: data,
			xsrfCookieName: 'csrftoken',
			xsrfHeaderName: 'X-CSRFToken'
		}
		return request(config)
	}
}

export function api_put({url, data}={}) {

	return (dispatch, getState) => {

		var init_params = {method: 'PUT', body: data || ""}
		return fetch(url, init_params)

	}
}

export function api_delete({url, idx}={}) {

	return (dispatch, getState) => {
		var config = {
			method: 'delete',
			url: getURL(url, idx),
			xsrfCookieName: 'csrftoken',
			xsrfHeaderName: 'X-CSRFToken'
		}
		return request(config)
	}
}

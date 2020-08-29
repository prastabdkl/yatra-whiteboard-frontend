import {
    api_get,
    api_post,
    api_put,
    api_patch,
    api_delete,
    request,
    makeUrl,
} from "./api";

export function signUpUser(credentials) {
    return api_post({
        url: "SIGNUP",
        data: credentials,
    })();
}

export function loginUser(credentials) {
    return api_post({
        url: "LOGIN",
        data: credentials,
    })();
}

export function getAllUsers(params) {
    return api_get({
        url: "USER",
        params: params,
    })();
}

export function getUserProfile() {
    return api_get({
        url: "USER_PROFILE",
    })();
}

export function getUserDetails(idx) {
    return api_get({
        url: "USER_DETAIL",
        idx: idx,
    })();
}

export function updateUser(idx, values) {
    return api_put({
        url: "USER_DETAIL",
        idx: idx,
        data: values,
    })();
}

export function createUser(idx, values) {
    if (idx) {
        return updateUser(idx, values);
    }
    return api_post({
        url: "USER",
        data: values,
    })();
}

export function deleteUser(idx) {
    return api_delete({
        url: "USER_DETAIL",
        idx: idx,
    })();
}

export function activateUser(idx) {
    return api_patch({
        url: "USER_DETAIL",
        idx: idx,
        data: {
            is_active: true,
        },
    })();
}

export function deActivateUser(idx) {
    return api_patch({
        url: "USER_DETAIL",
        idx: idx,
        data: {
            is_active: false,
        },
    })();
}

export function getAllRoles(params) {
    return api_get({
        url: "ROLE",
        params: params,
    })();
}

export function exportUser(params) {
    return api_get({
        url: "USER_EXPORT",
        params: params,
        responseType: "arraybuffer",
    })();
}

export function changePassword(idx, values) {
    return api_patch({
        url: "USER_PASSWORD",
        idx: idx,
        data: values,
    })();
}

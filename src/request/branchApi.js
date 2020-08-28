import {
    api_get,
    api_post,
    api_put,
    api_patch,
    api_delete,
    request,
    makeUrl,
} from "./api";

export function getAllBranches(params) {
    return api_get({
        url: "BRANCH",
        params: params,
    })();
}

export function getBranchDetails(idx, params) {
    return api_get({
        url: "BRANCH_DETAIL",
        params: params,
        idx: idx,
    })();
}

export function createBranch(idx, values) {
    if (idx == undefined) {
        return api_post({
            url: "BRANCH",
            data: values,
        })();
    }
    return api_put({
        url: "BRANCH_DETAIL",
        idx: idx,
        data: values,
    })();
}

export function deleteBranch(idx) {
    return api_delete({
        url: "BRANCH_DETAIL",
        idx: idx,
    })();
}

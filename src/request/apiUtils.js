import history from "history";
import { toast } from "react-toastify";
import { downloadFile } from "../misc";
import { saveAs } from "file-saver";

function successResponse(response) {
    return {
        success: true,
        status: response.status,
        data: response.data,
    };
}

function errorResponse(error) {
    return {
        success: false,
        status: error.response.status,
        data: error.response.data,
    };
}

function download(type, data) {
    let url = window.URL.createObjectURL(
        new Blob([data], {
            type: type,
        })
    );
    saveAs(url, "file.xlsx");
}

function handleError(status) {}

export function useInterceptor(axios) {
    axios.interceptors.request.use(
        (config) => {
            var userDetails = JSON.parse(
                window.localStorage.getItem("_user-details")
            );
            if (userDetails) {
                config.headers[
                    "Authorization"
                ] = `Token ${userDetails.auth_token}`;
            }
            config["xsrfCookieName"] = "csrftoken";
            config["xsrfHeaderName"] = "X-CSRFToken";
            config["Access-Control-Allow-Origin"] = "*";
            return config;
        },
        (error) => {
            Promise.reject(error);
        }
    );

    axios.interceptors.response.use(
        (response) => {
            const contentType = response.headers["content-type"];
            if (contentType == "application/vnd.ms-excel") {
                download(contentType, response.data);
            }
            return successResponse(response);
        },
        function (error) {
            const originalRequest = error.config;
            if (error.message === "Network Error") {
                toast("Network Error", {
                    type: "error",
                });
                return {
                    success: false,
                    status: "000",
                    data: "Network Error",
                };
            } else if (error.response.status === 400) {
                console.log("400 Bad Request", error);
            } else if (error.response.status === 401) {
                console.log("401 Unauthorized", error);
            } else if (error.response.status === 403) {
                console.log("403 No Permission", error);
                // toast(error.response.data.detail, {type: 'error'});
            } else if (error.response.status === 422) {
                console.log("400", error);
            } else if (error.response.status === 500) {
                console.log("500 Internal Server Error", error);
            } else {
                console.log("Something Went Wrong", error);
            }
            return errorResponse(error);
        }
    );
}

import { PUBLIC_API_URL } from "$env/static/public";
import { refresh } from "$lib/util/auth";

/**
 * Performs an HTTP request to the specified path.
 *
 * @param {string} path - The path for the request.
 * @param {string} method - The HTTP method (e.g., GET, POST, PATCH, etc.).
 * @param {boolean} loggedIn - Indicates whether the user is logged in.
 * @param {boolean} retryOnUnauthorized - Indicates whether to retry on a 401 status.
 * @param {Object} [data] - Optional data for the request body (used in POST, PATCH, etc.).
 * @returns {Promise<any>} - A promise that resolves with the response data or rejects with an error.
 */
export const request = async (
    path,
    method,
    user,
    loggedIn = false,
    retryOnUnauthorized = true,
    data = null
) => {
    try {
        console.log("Request:", method, path, data);
        // Check if the user is logged in and has necessary tokens
        if (loggedIn) {
            if (!user?.accessToken || !user?.refreshToken) {
                throw new Error("Not logged in");
            }
        }

        //if data is object, stringify it and set content type to json
        //if datatype is FormData, set content type to multipart/form-data
        let contentType = "application/json";
        let body = null;
        if (method !== "GET" && data) {
            contentType = data instanceof FormData ? null : "application/json";
            body = data instanceof FormData ? data : JSON.stringify(data);
        }

        console.log("Body:", body);
        console.log("Content-Type:", contentType);

        let headers = {
            Authorization: loggedIn ? `Bearer ${user?.accessToken}` : "",
        };

        if (contentType) headers["Content-Type"] = contentType;

        // Configure request options
        const requestOptions = {
            method: method,
            headers,
            body,
        };

        // Perform the HTTP request
        const response = await fetch(PUBLIC_API_URL + path, requestOptions);

        // Handle the response
        if (response.ok) {
            const responseData = await response.json();
            console.log("Response:", responseData);
            return responseData;
        }

        // If accessToken is expired, refresh it and try again
        if (response.status === 401 && loggedIn && retryOnUnauthorized) {
            console.log("Refreshing token...");
            const accessToken = await refresh(user?.refreshToken);
            user.accessToken = accessToken;
            return request(path, method, user, loggedIn, false, data);
        } else {
            //if response has json error message, throw it as a message
            const responseData = await response.json();

            throw {
                message: responseData?.message,
                data: responseData,
                status: response.status,
            };
        }
    } catch (error) {
        console.error("Request error:", error.message);
        throw error; // Re-throw the error to propagate it further if needed
    }
};

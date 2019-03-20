import getUuid from 'uuid-by-string';

const API_URL = 'http://localhost:3018/api';

/**
 * Performs API request to the backend
 * @param method {string} API method name
 * @param payload {Object} JSON object with a specific for a method params
 * @returns {Promise}
 */
export default function (method, payload = {}) {
    if (!method || !payload) {
        return Promise.reject('bad_params');
    }
    const requestKey = getUuid(method);
    const query = Object.keys(payload)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(payload[k]))
        .join('&');

    return window.fetch(`${API_URL}/${method}?${query}`, {
        headers: {
            "Content-Type": "application/json",
            "X-Request-Key": requestKey
        }
    })
        .then(res => res.json())
        .then(json => {
            if (json.status === 'ok') {
                return Promise.resolve(json);
            } else {
                if(process.env.NODE_ENV === 'development') {
                    console.error(json);
                }
                return Promise.reject(json || 'no_error_message');
            }
        });
}
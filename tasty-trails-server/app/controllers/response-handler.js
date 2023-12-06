/**
 * @fileoverview Defines utility functions for setting HTTP responses in Express controllers.
 */

/**
 * Sets a successful HTTP response with the given data.
 */
export const setResponse = (data, res) => {
    res.status(200)
        .json(data);
};

/**
 * Sets a 404 Not Found HTTP response for resource not found errors.
 */
export const set404ErrorResponse = (err, res, message) => {

    res.status(404)
        .json({ 
            code: "404",
            message: message
        });
}

/**
 * Sets a 400 Bad Request HTTP response for client or request validation errors.
 */
export const set400ErrorResponse = (err, res) => {
    res.status(400)
        .json({
            code: "400",
            message: "Bad Request."
        });
}

/**
 * Sets a 404 Not Found HTTP response with custom message for resource not found errors.
 */

export const set404ErrorResponseWithMsg = (err, res, message) => {

    res.status(404)
        .json({ 
            code: "404",
            message: message
        });
}

export const set401ErrorResponse = (res, message) => {

    res.status(404)
        .json({ 
            code: "401",
            message: message
        });
}

export const setResponseData = (code, res, message) => {
    res.status(code)
        .json({
            code: code,
            message: message
        })
}
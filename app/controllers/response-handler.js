export const setResponse = (data, res) => {
    res.status(200)
        .json(data);
};

export const set404ErrorResponse = (err, res) => {
    res.status(404)
        .json({ 
            code: "404",
            message: "Post not found."
        });
}

export const set400ErrorResponse = (err, res) => {
    res.status(400)
        .json({
            code: "400",
            message: "Bad Request."
        });
}
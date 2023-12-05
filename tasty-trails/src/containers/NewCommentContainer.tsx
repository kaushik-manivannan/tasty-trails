import React, { useState } from 'react';
import NewComment from '../components/NewComment.tsx';
import '../components/NewComment.css';

const NewCommentContainer = ({ userId, postId, addComment}) => {
    const [comment, setComment] = useState('');
    const dateTime = new Date().toISOString();

    const commentChangeHandler = (e) => {
        setComment(e.target.value);
    };

    const addCommentHandler = (commentWithEmoji) => {
        const newComment = {
            userId,
            postId,
            comment: commentWithEmoji,
            dateTime,
            image: 'image.jpg', // You may handle image uploading separately
        };

        // Send a POST request to save the new comment
        fetch('http://localhost:8080/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newComment),
        })
            .then((response) => response.json())
            .then((data) => {
                // Assuming the response contains the newly added comment
                // You may want to add error handling here
                addComment(data);
                setComment('');

            })
            .catch((error) => {
                console.error('Error adding comment:', error);
            });
    };

    return (
        <NewComment
            comment={comment}
            setComment={setComment}
            commentChangeHandler={commentChangeHandler}
            addCommentHandler={addCommentHandler}
        />
    );
};

export default NewCommentContainer;

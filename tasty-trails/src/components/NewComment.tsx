import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faImage, faSmile } from '@fortawesome/free-solid-svg-icons';

const NewComment = ({ comment, commentChangeHandler, addCommentHandler }) => {
    const isSubmitDisabled = comment.trim() === '';
    return (
        <div style={{ width: '300px', height: '51px', border: '1px solid #ccc', padding: '10px', borderRadius: '12px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ display: 'flex', marginBottom: '8px' }}>
                    <input
                        type='text'
                        value={comment}
                        onChange={commentChangeHandler}
                        placeholder="Enter your Comments"
                        style={{ flex: '1', border: 'none', outline: 'none', wordWrap: 'break-word' }}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button style={{ marginRight: '8px' }}>
                        <FontAwesomeIcon icon={faImage} />
                    </button>
                    <button>
                        <FontAwesomeIcon icon={faSmile} />
                    </button>
                    <div style={{ flex: '1' }} />
                    <button onClick={addCommentHandler} disabled={isSubmitDisabled}>
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewComment;

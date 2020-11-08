import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

import './InputQuery.css';

export default function InputQuery(props) {
    // Server message and update hook
	const [message, setMessage] = React.useState('');

	// Send message button handler
	function sendMessage() {
		props.onServerMessage(message);
		document.getElementById('server-message-input').value = '';
	}

    return(
        <div className="input-query-container">
            <TextField
                id="server-message-input"
                label="Server Message"
                multiline
                rows={4}
                variant="outlined"
                defaultValue={message}
                onChange={event => setMessage(event.target.value)}
            />
            <Tooltip title="Send message from server" placement="bottom">
                <Button 
                    variant="contained"
                    className="send-button" 
                    onClick={sendMessage}
                >
                    Send
                </Button>
            </Tooltip>
        </div>
    );
}
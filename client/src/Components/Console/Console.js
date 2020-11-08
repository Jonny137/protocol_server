import React from 'react';
import Typography from '@material-ui/core/Typography';

import './Console.css';

export default function Console(props) {
    return(
        <div className="console-container">
            <Typography variant="h5" className="console-headline">Output Log</Typography>
            <pre className="console-log">{props.message}</pre>
        </div>
    );
}
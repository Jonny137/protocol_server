import React from 'react';
import ReactDOM from 'react-dom';

import 'typeface-roboto';
import ProtocolTabs from './Components/ProtocolTabs/ProtocolTabs';

import './index.css';

function App() {
    return (
        <ProtocolTabs />
    );
}

ReactDOM.render(<App />, document.querySelector('#root'));
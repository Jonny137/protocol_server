import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
import PropTypes from 'prop-types';

import Console from '../Console/Console';

import './PanelHTTP.css';
const socket = socketIOClient('http://127.0.0.1:5000');

export default function PanelTCP(props) {
    const {children, value, index, ...other} = props;

    const [response, setResponse] = useState([]);

      // Trigger on server message
      useEffect(() => {
        socket.on('httpMessage', data => {
            setResponse(response => [...response, data + '\n']);
        });

        return () => socket.disconnect();
    }, []);
    
        return (
            <div
                role="tabpanel"
                className="tcp-panel"
                hidden={value !== index}
                id={`protocol-tabpanel-${index}`}
                {...other}
            >
                {value === index && (
                    <div className="tcp-panel-container">
                        <Console message={response} /> 
                    </div>
                )}
            </div>
        );
  }
  
  PanelTCP.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
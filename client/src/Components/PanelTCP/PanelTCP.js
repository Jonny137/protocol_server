import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import socketIOClient from "socket.io-client";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import Console from '../Console/Console';
import InputQuery from '../InputQuery/InputQuery';

import './PanelTCP.css';
const socket = socketIOClient('http://127.0.0.1:4000');

export default function PanelTCP(props) {
    const {children, value, index, ...other} = props;

    const [response, setResponse] = useState([]);
    const [echo, setEcho] = useState(false);

    const setServerMessage = (msg) => {
        socket.emit('serverMessage', msg);
    }
    
    const handleEcho = () => {
        setEcho(!echo);
        socket.emit('tcpEcho', echo);
    }

    // Trigger on server message
    useEffect(() => {
        socket.on('clientMessage', data => {
            setResponse(response => [...response, data + '\n']);
        });

        return () => socket.disconnect();
    }, []);

    // Trigger on echo message switch toggle
    useEffect(() => {
        socket.emit('tcpEcho', echo);
    }, [echo]);
    
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
                        <div className="tcp-message-container">
                            <InputQuery onServerMessage={setServerMessage} />
                            <FormControlLabel
                                control={
                                <Switch
                                    checked={echo}
                                    onChange={handleEcho}
                                    name="tcpCheck"
                                    color="primary"
                                />
                                }
                                label="Echo message"
                            />
                        </div>  
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
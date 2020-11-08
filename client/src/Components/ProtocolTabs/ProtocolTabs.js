import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import PanelTCP from '../PanelTCP/PanelTCP';
import PanelUDP from '../PanelUDP/PanelUDP';
import PanelHTTP from '../PanelHTTP/PanelHTTP';

import './ProtocolTabs.css';

function tabProps(index) {
	return {id: `protocol-tab-${index}`};
}

export default function ProtocolTabs() {
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div className="tabs-container">
			<AppBar className="appbar" position="static">
                <Tabs 
                    value={value} 
                    onChange={handleChange} 
                    aria-label="protocol-tabs" 
                    orientation="vertical"
                    variant="scrollable"
                >
					<Tab label="TCP" {...tabProps(0)} />
					<Tab label="UDP" {...tabProps(1)} />
					<Tab label="HTTP" {...tabProps(2)} />
				</Tabs>
			</AppBar>
            <PanelTCP value={value} index={0} />
            <PanelUDP value={value} index={1} />
			<PanelHTTP value={value} index={2} />
		</div>
	);
}

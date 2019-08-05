import React from 'react';

function ControlsPanel(props: React.PropsWithChildren<any>) {
    return (
        <div className="url_table__controls_panel">
            {props.children}
        </div>
    );
}

export default ControlsPanel;

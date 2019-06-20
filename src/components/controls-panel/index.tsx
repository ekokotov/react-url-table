import React from 'react';

function ControlsPanel(props: React.PropsWithChildren<any>) {
    return (
        <div className="table__controls-panel">
            {props.children}
        </div>
    );
}

export default ControlsPanel;

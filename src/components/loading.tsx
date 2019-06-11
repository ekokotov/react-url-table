import React from 'react';

interface IProps {
    colspan: number
}

function Loading(props: IProps) {
    return (
        <tr className="table__progress">
            <td colSpan={props.colspan}>Loading...</td>
        </tr>
    );
}

export default Loading;

import React from 'react';
import Icon from './Icon';
import './../style/IconButton.scss';

export default function IconButton(props: any) {
    return (
        <button onClick={ props.onClick }><Icon icon={ props.icon } size="22"/> { props.title }</button>
    );
}

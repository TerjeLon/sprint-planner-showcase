import React from 'react';
import Icon from './Icon';
import './../style/IconButton.scss';

export default function IconButton(props: any) {
    return (
        <button><Icon icon={ props.icon } size="22"/> { props.title }</button>
    );
}

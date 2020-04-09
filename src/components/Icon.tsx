import React from 'react';

export enum IconType {
    Person,
    Plus
}

export default function Icon(props: any) {
    const type: IconType = props.icon;

    function getIcon() {
        switch (type) {
            case IconType.Person:
                return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={ props.size } height={ props.size }>
                    <path className="heroicon-ui" d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm9 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2z"/>
                </svg>;

            case IconType.Plus:
                return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={ props.size } height={ props.size }>
                    <path className="heroicon-ui"
                          d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1-9h2a1 1 0 0 1 0 2h-2v2a1 1 0 0 1-2 0v-2H9a1 1 0 0 1 0-2h2V9a1 1 0 0 1 2 0v2z"/>
                </svg>;
        }
    }

    return getIcon();
}

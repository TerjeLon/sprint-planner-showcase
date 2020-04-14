import React from 'react';
import '../style/Button.scss';

export enum ButtonType {
  Positive = "positive",
  Destructive = "destructive"
}

export interface ButtonInterface {
  title: string;
  type: ButtonType;
  onClick: () => void;
}

export default function Button(props: ButtonInterface) {
  return (
      <button className={ props.type } onClick={ props.onClick }>
        { props.title }
      </button>
  );
}

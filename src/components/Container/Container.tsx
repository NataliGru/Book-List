import React from 'react';
import classNames from 'classnames';
import './Container.scss';

type Props = {
  children: React.ReactNode;
};

export const Container: React.FC<Props> = ({ children }) => {
  return (
    <div>{children}</div>
  );
};

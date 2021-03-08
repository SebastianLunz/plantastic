import React from 'react';
import planetEarthImage from 'images/planting.svg';

const Logo = (props) => {
  return (
    <img src={ planetEarthImage } { ...props } alt='Plantastic logotype: planting plants' />
  );
};

export default Logo;

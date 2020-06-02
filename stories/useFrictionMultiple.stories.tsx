import React from 'react';
import { withKnobs, number } from '@storybook/addon-knobs';

import { useFrictionMultiple } from '../src';
import Button from './components/Button';
import Toggle from './components/Toggle';

import './index.css';

export default {
  title: 'FrictionMultiple',
  decorators: [withKnobs],
};

function getRandomHex() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

export const FrictionMultipleBasic: React.FC = () => {
  const nodes = useFrictionMultiple(5, i => ({
    from: {
      transform: 'translateY(0px)',
      background: getRandomHex(),
      borderRadius: `${Math.floor(Math.random() * 100)}%`,
    },
    to: {
      transform: 'translateY(50px)',
      background: getRandomHex(),
      borderRadius: `${Math.floor(Math.random() * 100)}%`,
    },
    config: {
      mu: number('mu', 0.5),
      mass: number('mass', 300),
      initialVelocity: number('velocity', 10),
    },
    delay: i * 200,
    infinite: true,
  }));

  return (
    <div className="stack-horizontal">
      {nodes.map(({ ref }, i) => (
        <div className="mover mover--opacity" ref={ref} key={i} />
      ))}
    </div>
  );
};

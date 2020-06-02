import React from 'react';
import { UseFrictionArgs } from './useFriction';
import { friction1D, frictionDefaultConfig, Controller } from '../animation';
import { getInterpolatorsForPairs } from '../parsers/pairs';
import { getMaxDistanceFriction } from '../forces';

export const useFrictionMultiple = <M extends HTMLElement | SVGElement = any>(
  n: number,
  fn: (index: number) => UseFrictionArgs
) => {
  const nodes = React.useMemo(
    () =>
      new Array(n).fill(undefined).map((_, i) => {
        const props = fn(i);
        const ref = React.createRef<M>();

        const interpolators = getInterpolatorsForPairs({
          from: props.from,
          to: props.to,
        });
        const config = props.config || frictionDefaultConfig;
        const maxPosition = getMaxDistanceFriction(config);

        const { controller } = friction1D({
          config,
          onUpdate: ({ position }) => {
            interpolators.forEach(({ interpolator, property, values }) => {
              const value = interpolator({
                range: [0, maxPosition],
                domain: [values.from, values.to],
                value: position[0],
              });

              if (ref.current) {
                ref.current.style[property as any] = `${value}`;
              }

              if (props.onFrame) {
                const progress = position[0] / maxPosition;
                props.onFrame(progress);
              }
            });
          },
          onComplete: () => {
            /**
             * Ensure our animation has reached the to value when the physics stopping
             * condition has been reached.
             */
            interpolators.forEach(({ property, values }) => {
              if (
                ref.current &&
                ref.current.style[property as any] !== values.to
              ) {
                ref.current.style[property as any] = values.to;
              }
            });

            if (props.onAnimationComplete) {
              props.onAnimationComplete();
            }
          },
          infinite: props.infinite,
        });

        return { controller, props, ref };
      }),
    [n, fn]
  );

  React.useLayoutEffect(() => {
    const timers: number[] = [];
    const controllers: Controller[] = [];

    nodes.forEach(({ controller, props }) => {
      controllers.push(controller);

      // Declarative animation – start immediately.
      if (!props.pause && !props.delay) {
        controller.start();
      }

      // Declarative animation with delay – start after delay.
      let timerId: number;
      if (!props.pause && props.delay) {
        timerId = window.setTimeout(() => {
          controller.start();
        }, props.delay);
        timers.push(timerId);
      }
    });

    return () => {
      timers.forEach(timerId => {
        window.clearTimeout(timerId);
      });

      controllers.forEach(controller => controller.stop());
    };
  }, [nodes]);

  return nodes;
};

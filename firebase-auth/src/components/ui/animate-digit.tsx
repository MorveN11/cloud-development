import { useMemo } from 'react';

import CountUp from 'react-countup';

interface Props {
  value: number;
  delay?: number;
  start?: number;
  prefix?: string;
  className?: string;
}

export const AnimatedDigit = (props: Props) => {
  const { value, delay = 0, start = 0, prefix = '', className = '' } = props;

  const animationKey = useMemo(() => `count-up-${value}-${Date.now()}`, [value]);

  return (
    <span className="inline-block">
      {prefix ? <small className={className}>{prefix}</small> : null}

      <CountUp
        className={`text-xs font-medium lg:text-sm ${className}`}
        key={animationKey}
        start={start}
        end={value}
        delay={delay}
        useEasing={true}
      />
    </span>
  );
};

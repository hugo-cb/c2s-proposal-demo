declare module '@/components/ui/slider' {
  import * as React from 'react';

  export interface SliderProps {
    defaultValue?: number[];
    value?: number[];
    min?: number;
    max?: number;
    step?: number;
    className?: string;
    onValueChange?: (value: number[]) => void;
    onValueCommit?: (value: number[]) => void;
    disabled?: boolean;
  }

  export const Slider: React.ForwardRefExoticComponent<
    SliderProps & React.RefAttributes<HTMLDivElement>
  >;
}

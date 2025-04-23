declare module '@radix-ui/react-slider' {
  import * as React from 'react';

  type PrimitiveButtonProps = React.ComponentPropsWithoutRef<'button'>;
  type PrimitiveDivProps = React.ComponentPropsWithoutRef<'div'>;

  interface SliderRootProps extends PrimitiveDivProps {
    defaultValue?: number[];
    value?: number[];
    min?: number;
    max?: number;
    step?: number;
    orientation?: 'horizontal' | 'vertical';
    dir?: 'ltr' | 'rtl';
    inverted?: boolean;
    onValueChange?: (value: number[]) => void;
    onValueCommit?: (value: number[]) => void;
    name?: string;
    disabled?: boolean;
  }

  interface SliderTrackProps extends PrimitiveDivProps {}
  interface SliderRangeProps extends PrimitiveDivProps {}
  interface SliderThumbProps extends PrimitiveButtonProps {}

  const Root: React.ForwardRefExoticComponent<SliderRootProps & React.RefAttributes<HTMLDivElement>>;
  const Track: React.ForwardRefExoticComponent<SliderTrackProps & React.RefAttributes<HTMLDivElement>>;
  const Range: React.ForwardRefExoticComponent<SliderRangeProps & React.RefAttributes<HTMLDivElement>>;
  const Thumb: React.ForwardRefExoticComponent<SliderThumbProps & React.RefAttributes<HTMLButtonElement>>;

  export {
    Root,
    Track,
    Range,
    Thumb
  };
}

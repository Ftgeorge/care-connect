import React from 'react';

// Polymorphic component types
type AsProp<C extends React.ElementType> = {
  as?: C;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = {}
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

// Button-specific props
interface ButtonOwnProps {
  className?: string;
  variant?: 'primary' | 'secondary';
}

// Polymorphic Button component type
type ButtonProps<C extends React.ElementType> = PolymorphicComponentProp<C, ButtonOwnProps>;

const baseStyles = 'inline-flex items-center justify-center px-8 py-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 font-medium';
const variants = {
  primary: 'bg-[#D98586] text-white hover:bg-[#D98586]/90',
  secondary: 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm',
};

export const Button = <C extends React.ElementType = 'button'>({
  as,
  children,
  className = '',
  variant = 'primary',
  ...props
}: ButtonProps<C>) => {
  const Component = as || 'button';
  
  return (
    <Component
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Button;
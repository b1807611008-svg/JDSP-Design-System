declare const React: {
  createElement: (...args: unknown[]) => unknown;
};

const sizeClass = {
  xs: "w-3 h-3",
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
  xl: "w-9 h-9",
  "2xl": "w-12 h-12",
} as const;

export type IconSize = keyof typeof sizeClass;

export interface IconProps {
  name: string;
  size?: IconSize;
  className?: string;
  spritePath?: string;
  "aria-label"?: string;
  role?: string;
  style?: string;
}

export function Icon({
  name,
  size = "lg",
  className = "",
  spritePath = "/assets/icons/sprite.svg",
  ...rest
}: IconProps) {
  return (
    <svg
      className={`${sizeClass[size]} ${className}`.trim()}
      aria-hidden={rest["aria-label"] ? undefined : true}
      focusable="false"
      {...rest}
    >
      <use href={`${spritePath}#${name}`} />
    </svg>
  );
}

export default Icon;

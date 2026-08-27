import React from 'react';
import './Icon.css';


// Automatically import all SVGs in src/assets/icons as React components via vite-plugin-svgr
const iconModules = import.meta.glob<React.FC<React.SVGProps<SVGSVGElement>>>(
  '/src/assets/icons/*.svg',
  { query: '?react', import: 'default', eager: true }
);

const icons: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {};

for (const path in iconModules) {
  const match = path.match(/\/([^/]+)\.svg$/);
  if (match) {
    icons[match[1]] = iconModules[path];
  }
}

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
  color?: string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  width,
  height,
  color,
  className = '',
  style,
  ...props
}) => {
  const cleanName = name.replace(/\.svg$/, '').replace(/^.*[\\/]/, '');
  const Component = icons[cleanName];

  if (!Component) {
    console.warn(`[Icon] Icon "${name}" was not found in src/assets/icons/`);
    return null;
  }

  const computedWidth = width ?? size;
  const computedHeight = height ?? size;

  return (
    <Component
      className={`ui-icon ui-icon_${cleanName} ${className}`.trim()}
      width={computedWidth}
      height={computedHeight}
      style={{ color, ...style }}
      {...props}
    />
  );
};

export function QuarterNote(props: {
  selected: boolean;
  onClick?: () => void;
}) {
  return (
    <svg
      viewBox='0 0 744.09 1052.4'
      className={`w-16 h-16 ${
        props.selected ? 'stroke-neutral-50' : 'stroke-neutral-500'
      }`}
      version='1.1'
      onClick={props.onClick ? props.onClick : () => {}}
    >
      <g>
        <path
          className={`fill-neutral-500 ${
            props.selected ? 'fill-neutral-50' : 'fill-neutral-500'
          }`}
          strokeLinejoin='round'
          d='m418.39 231.34c5.3071 163.8 3.0093 316.18 0.55337 483.27-1.2461 42.809-38.247 71.529-72.88 89.908-30.854 18.567-67.795 28.966-103.61 20.691-33.304-3.4173-67.756-27.73-68.454-63.704-2.2204-41.711 27.904-80.552 64.988-97.024 36.404-20.749 82.429-25.246 121.63-10.331 19.156 6.0549 24.483-11.721 26.874-28.819 2.2123-129.77 3.9829-259.54 4.4354-389.33 0.36593-12.973 26.294-17.166 26.461-4.6603z'
          fillRule='evenodd'
          strokeLinecap='round'
          strokeWidth='5.9241'
        />
      </g>
    </svg>
  );
}

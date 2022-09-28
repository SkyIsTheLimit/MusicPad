export function SixteenthNote(props: {
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
          d='m405.69 224.28c-27.693 12.634-18.245 57.254-19.335 86.185-1.1892 107.52 3.5802 210.59 0.66265 318.09-0.188 35.283-34.706 24.684-56.812 18.011-47.827-6.0307-98.444 12.647-131.26 47.772-25.557 27.982-37.247 77.623-7.5783 106.92 26.23 25.588 66.736 30.145 101.44 24.377 37.208-8.3736 71.683-28.449 99.589-54.146 21.635-19.671 26-48.743 26.852-77.758 1.3095-40.253-0.62362-80.752 2.364-120.85-0.0361-29.307-3.586-74.222 32.042-60.444 25.098 17.621 47.474 41.212 62.641 68.072 13.797 30.342 24.555 63.962 19.637 97.673-3.1264 26.779 26.627 19.408 25.662-1.862 16.306-48.252 2.9619-103.28-29.777-141.53-33.729-46.829-83.161-82.097-106.04-136.47-15.258-32.923 21.129-53.285 44.923-26.675 24.732 24.117 49.907 50.141 58.181 84.928 9.2285 23.966 11.078 49.87 8.8527 75.199 13.219 33.997 30.634-12.133 30.463-28.976 7.831-44.298-8.6758-90.222-37.721-123.71-32.97-44.7-80.17-78.97-102.37-131.23-6.03-8.49-9.33-24.37-22.41-23.57z'
          fillRule='evenodd'
          strokeLinecap='round'
          strokeWidth='5.9241'
        />
      </g>
    </svg>
  );
}
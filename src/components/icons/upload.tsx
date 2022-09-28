export function UploadIcon(props: { onClick: () => void }) {
  return (
    <svg
      version='1.1'
      viewBox='0 0 485 485'
      className={`w-6 h-6 hover:stroke-neutral-50 stroke-neutral-500 hover:fill-neutral-50 fill-neutral-500 cursor-pointer mx-2`}
    >
      <g>
        <polygon points='163.07,268.626 321.93,268.626 321.93,153.056 380.926,153.056 242.5,1.374 104.074,153.056 163.07,153.056' />
        <path
          d='M0,308.626v175h485v-175H0z M330,411.126c-8.284,0-15-6.716-15-15s6.716-15,15-15c8.284,0,15,6.716,15,15
       S338.284,411.126,330,411.126z M400,411.126c-8.284,0-15-6.716-15-15s6.716-15,15-15c8.284,0,15,6.716,15,15
       S408.284,411.126,400,411.126z'
        />
      </g>
    </svg>
  );
}

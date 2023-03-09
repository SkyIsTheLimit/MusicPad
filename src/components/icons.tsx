import { HTMLAttributes } from 'react';

export const List = ({ className }: HTMLAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke='currentColor'
    className={className}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
    />
  </svg>
);

export const Edit = ({ className }: HTMLAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke='currentColor'
    className={className}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
    />
  </svg>
);

export const Share = ({ className }: HTMLAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke='currentColor'
    className={className}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z'
    />
  </svg>
);

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

export function DownloadIcon(props: { onClick: () => void }) {
  return (
    <svg
      version='1.1'
      viewBox='0 0 330 330'
      className={`w-6 h-6 hover:stroke-neutral-50 stroke-neutral-500 hover:fill-neutral-50 fill-neutral-500 cursor-pointer mx-2`}
    >
      <g>
        <path
          d='M165,0C74.019,0,0,74.018,0,165c0,90.98,74.019,165,165,165s165-74.02,165-165C330,74.018,255.981,0,165,0z M165,300
		c-74.439,0-135-60.561-135-135S90.561,30,165,30s135,60.561,135,135S239.439,300,165,300z'
        />
        <path
          d='M211.667,127.121l-31.669,31.666V75c0-8.285-6.716-15-15-15c-8.284,0-15,6.715-15,15v83.787l-31.665-31.666
		c-5.857-5.857-15.355-5.857-21.213,0c-5.858,5.859-5.858,15.355,0,21.213l57.271,57.271c2.929,2.93,6.768,4.395,10.606,4.395
		c3.838,0,7.678-1.465,10.607-4.393l57.275-57.271c5.857-5.857,5.858-15.355,0.001-21.215
		C227.021,121.264,217.524,121.264,211.667,127.121z'
        />
        <path d='M195,240h-60c-8.284,0-15,6.715-15,15c0,8.283,6.716,15,15,15h60c8.284,0,15-6.717,15-15C210,246.715,203.284,240,195,240z' />
      </g>
    </svg>
  );
}

export const ChevronUp = ({ className }: HTMLAttributes<SVGSVGElement>) => (
  <svg
    className={className}
    fill='currentColor'
    viewBox='0 0 20 20'
    xmlns='http://www.w3.org/2000/svg'
    aria-hidden='true'
  >
    <path
      clipRule='evenodd'
      fillRule='evenodd'
      d='M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z'
    ></path>
  </svg>
);

export const ChevronDown = ({ className }: HTMLAttributes<SVGSVGElement>) => (
  <svg
    className={className}
    fill='currentColor'
    viewBox='0 0 20 20'
    xmlns='http://www.w3.org/2000/svg'
    aria-hidden='true'
  >
    <path
      clipRule='evenodd'
      fillRule='evenodd'
      d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
    ></path>
  </svg>
);

export const Play = ({ className }: HTMLAttributes<SVGSVGElement>) => (
  <svg
    className={className}
    fill='currentColor'
    viewBox='0 0 20 20'
    xmlns='http://www.w3.org/2000/svg'
    aria-hidden='true'
  >
    <path d='M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z'></path>
  </svg>
);

export const Stop = ({ className }: HTMLAttributes<SVGSVGElement>) => (
  <svg
    className={className}
    fill='currentColor'
    viewBox='0 0 20 20'
    xmlns='http://www.w3.org/2000/svg'
    aria-hidden='true'
  >
    <path d='M5.25 3A2.25 2.25 0 003 5.25v9.5A2.25 2.25 0 005.25 17h9.5A2.25 2.25 0 0017 14.75v-9.5A2.25 2.25 0 0014.75 3h-9.5z' />
  </svg>
);

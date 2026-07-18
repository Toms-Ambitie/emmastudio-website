import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Ic({ size = 20, children, ...p }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...p}
    >
      {children}
    </svg>
  );
}

export const IconBook = (p: IconProps) => (
  <Ic {...p}><path d="M12 6.5C10.5 5 8 4.7 5.5 5.2V18c2.5-.5 5-.2 6.5 1.3M12 6.5c1.5-1.5 4-1.8 6.5-1.3V18c-2.5-.5-5-.2-6.5 1.3M12 6.5v12.8" /></Ic>
);

export const IconEye = (p: IconProps) => (
  <Ic {...p}><path d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6Z" /><circle cx="12" cy="12" r="2.6" /></Ic>
);

export const IconUsers = (p: IconProps) => (
  <Ic {...p}><circle cx="9" cy="9" r="3" /><path d="M3.8 19c.5-3 2.7-4.5 5.2-4.5S13.7 16 14.2 19" /><path d="M16 7.2a3 3 0 0 1 0 5.6M16.8 14.8c2 .6 3.3 2 3.7 4.2" /></Ic>
);

export const IconChart = (p: IconProps) => (
  <Ic {...p}><path d="M4 4v16h16" /><path d="M8 15l3-3.5 2.5 2L18 8" /></Ic>
);

export const IconMegaphone = (p: IconProps) => (
  <Ic {...p}><path d="M4 10v4l9 4V6Z" /><path d="M13 7.5c2 .5 3.5 2.2 3.5 4.5s-1.5 4-3.5 4.5" /><path d="M7 14v3.5a1.5 1.5 0 0 0 3 0V15" /></Ic>
);

export const IconPen = (p: IconProps) => (
  <Ic {...p}><path d="M5 19l1-4L16 5l3 3L9 18Z" /><path d="m14 7 3 3" /></Ic>
);

export const IconUserCircle = (p: IconProps) => (
  <Ic {...p}><circle cx="12" cy="12" r="8.2" /><circle cx="12" cy="10" r="2.6" /><path d="M6.8 18.2c.8-2.2 2.8-3.4 5.2-3.4s4.4 1.2 5.2 3.4" /></Ic>
);

export const IconSearch = (p: IconProps) => (
  <Ic {...p}><circle cx="11" cy="11" r="6.4" /><path d="m16 16 4 4" /></Ic>
);

export const IconArrow = (p: IconProps) => (
  <Ic {...p}><path d="M5 12h14m0 0-5.5-5.5M19 12l-5.5 5.5" /></Ic>
);

export const IconCheck = (p: IconProps) => (
  <Ic {...p}><path d="M5 12l4.5 4.5L19 7" /></Ic>
);

export const IconClock = (p: IconProps) => (
  <Ic {...p}><circle cx="12" cy="12" r="8.2" /><path d="M12 7.5V12l3 1.8" /></Ic>
);

export const IconEuro = (p: IconProps) => (
  <Ic {...p}><path d="M16.5 7.2A6 6 0 1 0 16.5 16.8" /><path d="M5.5 10.5h7M5.5 13.5h6" /></Ic>
);

export const IconShield = (p: IconProps) => (
  <Ic {...p}><path d="M12 3.5 5.5 6v5c0 4 2.8 7 6.5 8.5 3.7-1.5 6.5-4.5 6.5-8.5V6Z" /></Ic>
);

export const IconLink = (p: IconProps) => (
  <Ic {...p}><path d="M9.5 14.5 14.5 9.5" /><path d="M11 7.5l1.5-1.5a3.2 3.2 0 0 1 4.5 4.5L15.5 12" /><path d="M13 16.5 11.5 18a3.2 3.2 0 0 1-4.5-4.5L8.5 12" /></Ic>
);

export const IconSparkChat = (p: IconProps) => (
  <Ic {...p}><path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v6A2.5 2.5 0 0 1 17.5 15H10l-4 3.5V15H6.5A2.5 2.5 0 0 1 4 12.5Z" /></Ic>
);

export const IconTrend = (p: IconProps) => (
  <Ic {...p}><path d="M4 16.5 9 11l3 3 8-8.5" /><path d="M15 5.5h5v5" /></Ic>
);

export const IconBuilding = (p: IconProps) => (
  <Ic {...p}><path d="M5 20V5.5A1.5 1.5 0 0 1 6.5 4h7A1.5 1.5 0 0 1 15 5.5V20" /><path d="M15 9h2.5A1.5 1.5 0 0 1 19 10.5V20" /><path d="M4 20h16M8 8h4M8 11.5h4M8 15h4" /></Ic>
);

export const IconReceipt = (p: IconProps) => (
  <Ic {...p}><path d="M6.5 3.5h11v17l-2-1.4-1.8 1.4-1.7-1.4-1.8 1.4-1.7-1.4-2 1.4Z" /><path d="M9.5 8.5h5M9.5 12h5" /></Ic>
);

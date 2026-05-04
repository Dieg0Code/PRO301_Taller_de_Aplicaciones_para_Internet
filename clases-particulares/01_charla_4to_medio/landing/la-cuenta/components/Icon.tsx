type IconProps = {
  className?: string;
  size?: number;
};

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export function IconSearch({ className, size = 20 }: IconProps) {
  return (
    <svg {...base(size)} className={className} aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export function IconCart({ className, size = 20 }: IconProps) {
  return (
    <svg {...base(size)} className={className} aria-hidden>
      <path d="M3 4h2l2.6 12.2a2 2 0 0 0 2 1.6h7.5a2 2 0 0 0 2-1.6L21 8H6" />
      <circle cx="10" cy="20" r="1.4" />
      <circle cx="17" cy="20" r="1.4" />
    </svg>
  );
}

export function IconPlus({ className, size = 18 }: IconProps) {
  return (
    <svg {...base(size)} className={className} aria-hidden>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function IconMinus({ className, size = 18 }: IconProps) {
  return (
    <svg {...base(size)} className={className} aria-hidden>
      <path d="M5 12h14" />
    </svg>
  );
}

export function IconCheck({ className, size = 18 }: IconProps) {
  return (
    <svg {...base(size)} className={className} aria-hidden>
      <path d="m5 12 5 5L20 7" />
    </svg>
  );
}

export function IconClose({ className, size = 18 }: IconProps) {
  return (
    <svg {...base(size)} className={className} aria-hidden>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function IconFilter({ className, size = 18 }: IconProps) {
  return (
    <svg {...base(size)} className={className} aria-hidden>
      <path d="M3 5h18M6 12h12M10 19h4" />
    </svg>
  );
}

export function IconTag({ className, size = 18 }: IconProps) {
  return (
    <svg {...base(size)} className={className} aria-hidden>
      <path d="M20.5 13.5 13 21a2 2 0 0 1-2.8 0L3 13.8V4h9.8L20.5 11.7a1.3 1.3 0 0 1 0 1.8z" />
      <circle cx="7.5" cy="8.5" r="1.2" />
    </svg>
  );
}

export function IconStore({ className, size = 18 }: IconProps) {
  return (
    <svg {...base(size)} className={className} aria-hidden>
      <path d="M3 9 4.5 4h15L21 9" />
      <path d="M5 9v11h14V9" />
      <path d="M3 9h18" />
      <path d="M9 20v-6h6v6" />
    </svg>
  );
}

export function IconSavings({ className, size = 18 }: IconProps) {
  return (
    <svg {...base(size)} className={className} aria-hidden>
      <path d="M12 2v3M9 5l3-3 3 3" />
      <path d="M5 12c0-3.5 3-6 7-6s7 2.5 7 6v6.5a1.5 1.5 0 0 1-3 0V18H8v.5a1.5 1.5 0 0 1-3 0z" />
      <circle cx="15" cy="12" r="0.8" />
    </svg>
  );
}

export function IconArrow({ className, size = 18 }: IconProps) {
  return (
    <svg {...base(size)} className={className} aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconChevronDown({ className, size = 18 }: IconProps) {
  return (
    <svg {...base(size)} className={className} aria-hidden>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function IconTrash({ className, size = 18 }: IconProps) {
  return (
    <svg {...base(size)} className={className} aria-hidden>
      <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" />
    </svg>
  );
}

export function IconRoute({ className, size = 18 }: IconProps) {
  return (
    <svg {...base(size)} className={className} aria-hidden>
      <circle cx="6" cy="19" r="2" />
      <circle cx="18" cy="5" r="2" />
      <path d="M8 19h7a4 4 0 0 0 0-8H9a4 4 0 0 1 0-8h7" />
    </svg>
  );
}

export function IconPrinter({ className, size = 18 }: IconProps) {
  return (
    <svg {...base(size)} className={className} aria-hidden>
      <path d="M6 9V3h12v6" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <path d="M6 14h12v8H6z" />
    </svg>
  );
}

export function IconShare({ className, size = 18 }: IconProps) {
  return (
    <svg {...base(size)} className={className} aria-hidden>
      <circle cx="18" cy="5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="19" r="2.5" />
      <path d="m8.2 10.7 7.6-4.4M8.2 13.3l7.6 4.4" />
    </svg>
  );
}

export function IconSparkles({ className, size = 18 }: IconProps) {
  return (
    <svg {...base(size)} className={className} aria-hidden>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />
    </svg>
  );
}

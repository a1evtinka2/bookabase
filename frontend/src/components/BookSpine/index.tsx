type BookSpineProps = {
  title: string;
  className?: string;
};

export function BookSpine({ title, className = '' }: BookSpineProps) {
  return (
    <div
      className={`
        group relative
        h-64 w-12
        overflow-hidden
        rounded-sm
        border border-black/20
        bg-gradient-to-r
        from-amber-900
        via-amber-700
        to-amber-900
        shadow-[3px_4px_8px_rgba(0,0,0,0.25)]
        transition-transform
        duration-200
        hover:-translate-y-1
        hover:shadow-[5px_7px_12px_rgba(0,0,0,0.3)]
        ${className}
      `}
    >
      {/* Верхний декоративный кант */}
      <div className="absolute inset-x-0 top-3 h-px bg-amber-200/40" />
      <div className="absolute inset-x-0 top-4 h-px bg-black/20" />

      {/* Нижний декоративный кант */}
      <div className="absolute inset-x-0 bottom-4 h-px bg-black/20" />
      <div className="absolute inset-x-0 bottom-3 h-px bg-amber-200/40" />

      {/* Блики на корешке */}
      <div className="absolute inset-y-0 left-1 w-px bg-white/10" />
      <div className="absolute inset-y-0 right-1 w-px bg-black/20" />

      {/* Название */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="
            max-w-[14rem]
            rotate-90
            whitespace-nowrap
            px-2
            text-center
            font-serif
            text-sm
            font-semibold
            tracking-wide
            text-amber-50
            drop-shadow-[1px_1px_1px_rgba(0,0,0,0.5)]
          "
        >
          {title}
        </span>
      </div>
    </div>
  );
}

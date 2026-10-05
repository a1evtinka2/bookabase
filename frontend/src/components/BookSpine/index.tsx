import getRandomColor from '../../utils/getRandomColor';

type BookSpineProps = {
  title: string;
  className?: string;
  isNew?: boolean;
  onNewClick?: () => void;
};

export function BookSpine({
  title,
  className = '',
  isNew = false,
  onNewClick,
}: BookSpineProps) {
  const color = getRandomColor();
  return (
    <div
      className={`
        group relative
        // ${isNew ? 'h-12 w-84' : 'h-64 w-12'}
        overflow-hidden
        rounded-sm
        border border-black/20
        bg-gradient-to-r
        shadow-[3px_4px_8px_rgba(0,0,0,0.25)]
        transition-transform
        duration-200
        hover:-translate-y-1
        hover:shadow-[5px_7px_12px_rgba(0,0,0,0.3)]
        ${className}
      `}
      style={{ backgroundColor: color }}
      onClick={onNewClick}
    >
      {/* Верхний декоративный кант */}
      <div className="absolute inset-x-0 top-3 h-px" />
      <div className="absolute inset-x-0 top-4 h-px bg-black/20" />

      {/* Нижний декоративный кант */}
      <div className="absolute inset-x-0 bottom-4 h-px bg-black/20" />
      <div className="absolute inset-x-0 bottom-3 h-px" />

      {/* Название */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={`
            inline-flex
            h-12
            w-fit
            items-center
            justify-center
            rounded-sm
            bg-amber-800
            px-6

            max-w-[24rem]
            ${!isNew && 'rotate-90'}
            whitespace-nowrap
            px-2
            text-center
            font-serif
            text-sm
            font-semibold
            tracking-wide
            text-amber-50
            
          `}
        >
          {title}
        </span>
      </div>
    </div>
  );
}

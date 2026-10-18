import type { Item } from '../../client';
import getBookHeight from '../../utils/getBookHeight';
import getRandomColor from '../../utils/getRandomColor';

type BookSpineProps = {
  bookItem: Item;
  onNewClick: (bookId: string) => void;
  index: number;
  isNew?: boolean;
};

export function BookSpine({
  bookItem,
  onNewClick,
  index,
  isNew = false,
}: BookSpineProps) {
  const authorsFullName = `${bookItem.author?.firstName} ${bookItem.author?.surname}`;
  const color = getRandomColor();
  return (
    <button
      key={'sfr'}
      type="button"
      onClick={() => onNewClick(bookItem.id)}
      aria-label={`Pull out ${bookItem.title} by ${authorsFullName}`}
      className={
        'relative cursor-pointer rounded-t-xs outline-1 -outline-offset-1 outline-glass-edge ring-1 ring-foreground/10 transition-all duration-300 hover:-translate-y-5 hover:ring-primary/50 hover:shadow-[0_28px_55px_-18px_var(--color-foreground)]'
        // book.spine,
        // selectedId === book.id && "-translate-y-3 ring-primary/60",
      }
      style={{
        width: '80px',
        height: getBookHeight(bookItem.title),
        backgroundColor: color,
      }}
    >
      <div className="pt-4 absolute inset-0 flex items-start justify-center text-grey">
        <span className="text-sm font-medium">
          {index < 10 ? `0${index + 1}` : index + 1}
        </span>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="rotate-90 whitespace-nowrap text-sm font-medium text-white">
          {bookItem.title}
        </span>
      </div>
      <div className="pb-2 absolute inset-0 flex items-end justify-center">
        <span className="whitespace-wrap text-sm font-medium text-white">
          {authorsFullName}
        </span>
      </div>
    </button>
  );
}

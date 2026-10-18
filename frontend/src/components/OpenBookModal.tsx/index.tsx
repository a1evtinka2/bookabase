import { mockReviews } from '../../pages/BookShellPage';
import Rating from '../../ui-kit/rating';
import Review from '../BookReview';

export default function OpenBookModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed z-50 flex items-center justify-center
                 bg-black/60 backdrop-blur-sm open-book"
      onMouseDown={(e) => {
        onClose();
      }}
    >
      {isOpen && (
        <>
          <div className="book-leaf book-leaf-left">
            <div>
              <h1 className="font-lobster">Kniga</h1>
              <div className="font-flex items-center justify-center gap-10">
                {mockReviews.map((r: any) => (
                  <>
                    <Review text={r.text} author={r.author} />
                    <div className="mt-4 h-px w-30 bg-white" />
                  </>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-start book-leaf gap-30">
            <Rating value={4}></Rating>
            <div>новый отзыв</div>
          </div>
        </>
      )}
    </div>
  );
}

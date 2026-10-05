import { useEffect, useState } from 'react';
import getBookDeclension from '../utils/getBookDeclension';
import type { Item } from '../dto/item';
import getBookHeight from '../utils/getBookHeight';
import getRandomColor from '../utils/getRandomColor';
import { CreateBookModal } from '../components/AddBookForm';
import Rating from '../ui-kit/rating';
import Tag from '../ui-kit/tag';

function BookShellPage() {
  const [nickname, setName] = useState('');
  const [dateOfBirth, setDate] = useState('');
  const [backendError, setBackendError] = useState<string | undefined>();
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [showItemInfo, setShowItemInfo] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>();


  const [items, setItems] = useState<any>([]);
  const [authors, setAuthors] = useState<any>([]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreateBook = (data: { title: string; authorId: string }) => {
    console.log(data);

    const book = {
      ...data,
      type: 'book',
    }


    setIsCreateModalOpen(false);
     const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book),
      };
      console.log(requestOptions);

      fetch('http://localhost:3000/items', requestOptions)
        .then((response) => response.json())
        .then((newBook) => setItems((old: any) => ([...old, newBook])))
        .catch((error) => {
          console.error('Error saving book:', error);
          setBackendError(error.message); 
        });
  };

  useEffect(() => {
    fetch('http://localhost:3000/items')
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => {
        console.error('Error fetching items:', error);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/authors')
      .then((response) => response.json())
      .then((data) => setAuthors(data))
      .catch((error) => {
        console.error('Error fetching authors:', error);
      });
  }, []);

  useEffect(() => {
    console.log(items, 'iiii');
  }, [items]);

  useEffect(() => {
    if (selectedId) {
          fetch(`http://localhost:3000/items/${selectedId}`)
      .then((response) => response.json())
      .then((data) => setCurrentItem(data))
      .catch((error) => {
        console.error('Error fetching items:', error);
      });
      setShowItemInfo(true);
    } else {
      setShowItemInfo(false);
      setCurrentItem(undefined)
    }
  }, [selectedId]);

  useEffect(() => {
    console.log(nickname, dateOfBirth);
    if (nickname === 'Триумфальная арка') {
      const item = {
        authorId: '62fd608d-b49e-4772-9240-c53638ee3b18',
        title: 'Триумфальная арка',
        type: 'book',
      };

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      };
      console.log(requestOptions);

      fetch('http://localhost:3000/items', requestOptions)
        .then((response) => response.json())
        .catch((error) => {
          console.error('Error fetching data:', error);
          setBackendError(error.message);
        });
    }
  }, [nickname, dateOfBirth]);

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground">
      {/* Glow layer */}
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        {/* Top-left glow */}
        <div
          className="
        absolute
        -left-32
        -top-44
        h-[36rem]
        w-[36rem]
        rounded-full
        bg-glow-cool
        opacity-50
        blur-[110px]
      "
        />

        {/* Bottom-right glow */}
        <div
          className="
        absolute
        -bottom-48
        -right-24
        h-[32rem]
        w-[32rem]
        rounded-full
        bg-glow-warm
        opacity-40
        blur-[120px]
      "
        />
      </div>
      <div className="z-100 mr-40 ml-60 flex flex-row items-end justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          {`${items.length} ${getBookDeclension(items.length)}` }. Нажми, чтобы открыть
        </span>

        <h1 className="mt-2 font-lobster text-4xl italic leading-[1.02] text-balance md:text-5xl">
          Прочитал? Положи на общую полочку.
        </h1>
      </div>

      <div className="flex flex-col items-center">
        {/* Books */}
        <div className="flex h-110 items-end gap-2">
          {items?.map((i: Item) => {
            const authorsFullName = `${i.author?.firstName} ${i.author?.surname}`;
            return (
              <button
                key={'sfr'}
                type="button"
                onClick={() => setSelectedId(i.id)}
                aria-label={`Pull out ${i.title} by ${authorsFullName}`}
                className={
                  'relative cursor-pointer rounded-t-md outline-1 -outline-offset-1 outline-glass-edge ring-1 ring-foreground/10 transition-all duration-300 hover:-translate-y-5 hover:ring-primary/50 hover:shadow-[0_28px_55px_-18px_var(--color-foreground)]'
                  // book.spine,
                  // selectedId === book.id && "-translate-y-3 ring-primary/60",
                }
                style={{
                  width: '70px',
                  height: getBookHeight(i.title),
                  backgroundColor: getRandomColor(),
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="rotate-90 whitespace-nowrap text-sm font-medium text-white">
                    {i.title}
                  </span>
                </div>
              </button>
              // <BookSpine title={`${authorsFullName}.${i.title}`} />
            );
          })}
          <button
            key={'sfr'}
            type="button"
            // onClick={() => setSelectedId(book.id)}
            onClick={() => setIsCreateModalOpen(true)}
            // aria-label={`Pull out ${i.title} by ${authorsFullName}`}
            className={
              'relative cursor-pointer rounded-t outline-1 -outline-offset-1 outline-glass-edge ring-1 ring-foreground/10 transition-all duration-300 hover:-translate-y-5 hover:ring-primary/50 hover:shadow-[0_28px_55px_-18px_var(--color-foreground)]'
              // book.spine,
              // selectedId === book.id && "-translate-y-3 ring-primary/60",
            }
            style={{
              width: getBookHeight('Новая книга'),
              height: '70px',
              backgroundColor: getRandomColor(),
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="whitespace-nowrap text-sm font-medium text-white">
                Новая книга
              </span>
            </div>
          </button>
        </div>

        {/* Divider */}
        <div className="mt-4 h-px w-300 bg-white" />
      </div>
      <CreateBookModal
        isOpen={isCreateModalOpen}
        authors={authors}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateBook}
      />
      {showItemInfo && (
        <div className="z-100 mr-40 mt-10 ml-60 flex flex-row items-end justify-between gap-30">
          <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white/30">
            <div className="px-6 py-4">
              <div className="font-bold font-lobster text-xl mb-2">{currentItem?.title}</div>
              <p className="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia, nulla! Maiores et perferendis eaque,
                exercitationem praesentium nihil.
              </p>
            </div>
            <Rating value={4} />
            <div className="px-6 pt-4 pb-2">
              <Tag text="книга" />
              <Tag text="новое" />
            </div>
          </div>
          <div className="h-60 w-100 rounded overflow-hidden shadow-lg bg-white/30">
            <div className="px-6 py-4">
              <div className="font-bold font-mono text-xl mb-2 text-muted-foreground">отзывы</div>
              <div className="flex flex-column items-end justify-between overflow-y-auto">
              <p className="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia, nulla! Maiores et perferendis eaque,
                exercitationem praesentium nihil.
              </p>
              <p className="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia, nulla! Maiores et perferendis eaque,
                exercitationem praesentium nihil.
              </p>
              <p className="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia, nulla! Maiores et perferendis eaque,
                exercitationem praesentium nihil.
              </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookShellPage;

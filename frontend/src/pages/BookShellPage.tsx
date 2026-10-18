import { useEffect, useState } from 'react';
import getBookDeclension from '../utils/getBookDeclension';
import type { Item } from '../dto/item';
import getBookHeight from '../utils/getBookHeight';
import getRandomColor from '../utils/getRandomColor';
import { CreateBookModal } from '../components/AddBookForm';
import Rating from '../ui-kit/rating';
import Tag from '../ui-kit/tag';
import OpenBookModal from '../components/OpenBookModal.tsx';
import { DarkModeToggle } from '../components/DarkModeToggle/index.tsx';
import { Candle } from '../components/Candle/index.tsx';
import heyApiClient from '../api/index.ts';
import { getItems, getItemsByItemId } from '../client/sdk.gen.ts';
import PageTemplate from '../components/PageTemplate/index.tsx';
import { useTheme } from '../providers/ThemeProvider.tsx';
import { BookSpine } from '../components/BookSpine/index.tsx';

export const mockReviews = [
  {
    author: 'mama',
    text: 'Это очень хорошая книга orem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! ',
  },
  {
    author: 'макс',
    text: 'Это очень хорошая книга orem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! ',
  },
  {
    author: 'даша',
    text: 'Это очень хорошая книга orem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! ',
  },
  {
    author: 'наташа',
    text: 'Это очень хорошая книга orem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! ',
  },
];

function BookShellPage() {
  const [nickname, setName] = useState('');
  const [dateOfBirth, setDate] = useState('');
  const [backendError, setBackendError] = useState<string | undefined>();
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [showItemInfo, setShowItemInfo] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>();

  const [items, setItems] = useState<any>([]);
  const [authors, setAuthors] = useState<any>([]);
  const { theme } = useTheme();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreateBook = (data: { title: string; authorId: string }) => {
    console.log(data);

    const book = {
      ...data,
      type: 'book',
    };

    setIsCreateModalOpen(false);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book),
    };
    console.log(requestOptions);

    // fetch('http://localhost:3000/items', requestOptions)
    //   .then((response) => response.json())
    //   .then((newBook) => setItems((old: any) => ([...old, newBook])))
    //   .catch((error) => {
    //     console.error('Error saving book:', error);
    //     setBackendError(error.message);
    //   });
  };

  useEffect(() => {
    const fetchItems = async () => {
      const result = await getItems({ client: heyApiClient });
      console.log(result, 'res');

      setItems(result.data);
    };

    fetchItems();
  }, []);

  // useEffect(() => {
  //   fetch('http://localhost:3000/items')
  //     .then((response) => response.json())
  //     .then((data) => setItems(data))
  //     .catch((error) => {
  //       console.error('Error fetching authors:', error);
  //     });
  // }, []);

  useEffect(() => {
    console.log(items, 'iiii');
  }, [items]);

  const fetchItemById = async (itemId: string) => {
    const result = await getItemsByItemId({
      client: heyApiClient,
      path: { itemId },
    });

    setCurrentItem(result.data);
  };

  useEffect(() => {
    if (selectedId) {
      fetchItemById(selectedId);
      setShowItemInfo(true);
    } else {
      setShowItemInfo(false);
      setCurrentItem(undefined);
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

      // const requestOptions = {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(item),
      // };
      // console.log(requestOptions);

      // fetch('http://localhost:3000/items', requestOptions)
      //   .then((response) => response.json())
      //   .catch((error) => {
      //     console.error('Error fetching data:', error);
      //     setBackendError(error.message);
      //   });
    }
  }, [nickname, dateOfBirth]);

  return (
    <PageTemplate>
      <div className="z-100 mr-40 ml-60 flex flex-row items-end justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          {`${items.length} ${getBookDeclension(items.length)}`}. Нажми, чтобы
          открыть
        </span>

        <h1 className="mt-2 font-lobster text-4xl italic leading-[1.02] text-balance md:text-5xl">
          Прочитал? Положи на общую полочку.
        </h1>
      </div>

      <div className="flex flex-col items-center">
        <div className="bookshelf-stage">
          {/* Books */}
          <div className="flex h-110 items-end gap-2">
            {items &&
              items?.map((i: Item, index: number) => {
                return (
                  <BookSpine
                    bookItem={i}
                    index={index}
                    onNewClick={setSelectedId}
                  />
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
          {theme === 'light' ? (
            <div className="mt-4 h-px w-300 bg-white" />
          ) : (
            <div className="shelf-board" />
          )}
        </div>
      </div>
      <CreateBookModal
        isOpen={isCreateModalOpen}
        authors={authors}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateBook}
      />
      <OpenBookModal
        isOpen={showItemInfo}
        onClose={() => setShowItemInfo(false)}
        // onSubmit={(data) => {
        // console.log(data.nickname, data.dob);
        // Call your registration function here.
        // setIsBookOpen(false);
        // }}
      />
      {theme === 'dark' && <Candle />}
    </PageTemplate>
  );
}

export default BookShellPage;

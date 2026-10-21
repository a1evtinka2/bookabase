import { useState } from "react";
import type { Author } from "../../client";

type CreateBookModalProps = {
  isOpen: boolean;
  authors: Author[];
  onClose: () => void;
  onSubmit: (data: { title: string; authorId: string }) => void;
};

export function CreateBookModal({
  isOpen,
  authors,
  onClose,
  onSubmit,
}: CreateBookModalProps) {
  if (!isOpen) return null;

  const [isNew, setIsNew] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    onSubmit({
      title: formData.get('title') as string,
      authorId: formData.get('authorId') as string,
    });
  };

  const checkIfNew = (e: React.SyntheticEvent<HTMLSelectElement, Event>) => {
    e.preventDefault();

    const newAuthor = e.target.value;
    setIsNew(newAuthor === 'new')
    

  };

   

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-xl bg-background p-6 shadow-2xl ring-1 ring-foreground/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">
            Положить книгу на полку
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-2xl leading-none text-foreground/50 transition-colors hover:text-foreground"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label
              htmlFor="book-title"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Названиие
            </label>

            <input
              id="book-title"
              name="title"
              type="text"
              required
              placeholder="как называется книга"
              className="w-full rounded-md border border-foreground/20 bg-background px-3 py-2 text-sm text-foreground outline-none placeholder:text-foreground/40 focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Author */}
          <div>
            <label
              htmlFor="book-author"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Автор
            </label>

            <select
              id="book-author"
              name="authorId"
              required
              defaultValue=""
              onChange={checkIfNew}
              className="w-full rounded-md border border-foreground/20 bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="" disabled>
                кто написал
              </option>
              <option key={'new'} value={'new'}>
                  {'Добавить автора'}
              </option>

              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {`${author.firstName} ${author.surname}`}
                </option>
              ))}
            </select>
          </div>
          {isNew && 
          <div className="flex flex-row gap-5">
          <div>
            <label
              htmlFor="author-name"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Имя
            </label>

            <input
              id="author-name"
              name="name"
              type="text"
              required
              className="w-full rounded-md border border-foreground/20 bg-background px-3 py-2 text-sm text-foreground outline-none placeholder:text-foreground/40 focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label
              htmlFor="author-surname"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Фамилия
            </label>

            <input
              id="author-surname"
              name="surname"
              type="text"
              required
              className="w-full rounded-md border border-foreground/20 bg-background px-3 py-2 text-sm text-foreground outline-none placeholder:text-foreground/40 focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          </div>}

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md px-4 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-foreground/10"
            >
              Отмена
            </button>

            <button
              type="submit"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

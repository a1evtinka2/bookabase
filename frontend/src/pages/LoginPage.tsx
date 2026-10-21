import { useEffect, useState } from 'react';
import { redirect } from 'react-router-dom';
import image from './books.png';
import google from './google.png';
import PageTemplate from '../components/PageTemplate';
import type { User } from '../client';

function LoginPage() {
  const [users, setUsers] = useState<User[]>([]);

  const handleGoogle = () => {
    fetch('http://localhost:3000/auth/google')
      .then((response) => response.json())
      // .then((data) => setUsers(data))
      .then(() => redirect('/'))
      .catch((error) => {
        console.error('Error auth google:', error);
      });
  };


  return (
    <PageTemplate>
      <div className="mt-40 ml-40 flex items-center justify-center">
        <div className="w-full max-w-sm rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-xl">
          <h2 className="mb-1 text-center font-serif text-3xl text-foreground">
            Покажите читательский
          </h2>

          {/* <p className="text-center font-mono text-sm text-muted-foreground">
    заполни имя пользователя и дату рождения
  </p> */}

          <div className="mt-4 space-y-4">
            <input
              type="text"
              placeholder="Имя пользователя"
              // onChange={(e) => handlenick(e.target.value)}
              className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-foreground placeholder:text-muted-foreground/70 outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/20 placeholder:font-mono"
            />

            <input
              type="text"
              // placeholder="Дата рождения"
              placeholder="Пароль"
              // value={dob}
              // placeholder="dd/mm/yyyy" data-slots="dmy"
              // onChange={(e) => handledob(e.target.value)}
              // onChange={(e) => handledob(e.target.value)}
              className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-foreground placeholder:text-muted-foreground/70 outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/20 placeholder:font-mono"
            />
            <div className="flex items-center justify-center">
              <button
                type="button"
                // onClick={() => register()}
                className="font-mono w-full rounded-lg border border-white/20 bg-white/20 px-4 py-3 font-semibold text-foreground shadow-md transition duration-300 hover:-translate-y-0.5 hover:bg-white/30 hover:shadow-lg active:translate-y-0 placeholder:text-muted-foreground/70"
              >
                Войти
              </button>
              <button
                key={'kjlj'}
                type="button"

                onClick={() => {
                  window.location.href = 'http://localhost:3000/auth/google';
                }}
                className="font-mono w-full rounded-lg border border-white/20 bg-white/20 px-4 py-3 font-semibold text-foreground shadow-md transition duration-300 hover:-translate-y-0.5 hover:bg-white/30 hover:shadow-lg active:translate-y-0 placeholder:text-muted-foreground/70"
              >
                <div className="flex items-center justify-center gap-4">
                  <img width="30px" src={google} />
                  Google
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="ml-40">
        <img src={image} />
      </div>
    </PageTemplate>
  );
}

export default LoginPage;

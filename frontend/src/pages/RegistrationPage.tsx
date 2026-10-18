import { useEffect, useState } from 'react';
import image from './books.png';
import { useNavigate } from 'react-router-dom';
import PageTemplate from '../components/PageTemplate';

function RegistrationPage() {
  const [nickname, setNickname] = useState('');
  const [dob, setDob] = useState('');
  const navigate = useNavigate();

  const register = () => {
    const user = {
      nickname,
      dateOfBirth: dob,
    };
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
      credentials: 'include',
    };

    fetch('http://localhost:3000/auth/register', requestOptions)
      .then((response) => response.json())
      .then((data) => navigate('/'))
      .catch((error) => {
        console.error('Error signing up:', error);
      });
  };
  const handlenick = (name: string) => {
    setNickname(name);
  };
  const handledob = (dobb: string) => {
    const plainString = dobb.replaceAll('.', '');

    const numValue = Number(plainString);
    const dobLength = plainString.length;
    const dobArray = plainString.split('');

    if (Number.isNaN(numValue)) return;

    if (dobLength === 0) setDob('');

    if (dobLength > 8) return;

    if (dobLength > 4) {
      setDob(
        `${dobArray.slice(0, 2).join('')}.${dobArray.slice(2, 4).join('')}.${dobArray.slice(4).join('')}`,
      );
      return;
    }

    if (dobLength > 2) {
      if (Number(dobArray[0]) > 3 || Number(dobArray[2]) > 1) return;

      setDob(`${dobArray.slice(0, 2).join('')}.${dobArray.slice(2).join('')}`);
      return;
    }

    if (dobLength > 0) {
      if (Number(dobArray[0]) > 3) return;
      setDob(dobb);
      return;
    }
  };

  return (
    <PageTemplate>
      <div className="mt-40 ml-40 flex items-center justify-center">
        <div className="w-full max-w-sm rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-xl">
          <h2 className="mb-1 text-center font-serif text-3xl text-foreground">
            Запись в библиотеку
          </h2>

          <p className="text-center font-mono text-sm text-muted-foreground">
            заполни имя пользователя и дату рождения
          </p>

          <div className="mt-4 space-y-4">
            <input
              type="text"
              placeholder="Имя пользователя"
              onChange={(e) => handlenick(e.target.value)}
              className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-foreground placeholder:text-muted-foreground/70 outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/20 placeholder:font-mono"
            />

            <input
              type="text"
              // placeholder="Дата рождения"
              placeholder="дд.мм.гггг"
              value={dob}
              // placeholder="dd/mm/yyyy" data-slots="dmy"
              // onChange={(e) => handledob(e.target.value)}
              onChange={(e) => handledob(e.target.value)}
              className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-foreground placeholder:text-muted-foreground/70 outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/20 placeholder:font-mono"
            />

            <button
              type="button"
              onClick={() => register()}
              className="font-mono w-full rounded-lg border border-white/20 bg-white/20 px-4 py-3 font-semibold text-foreground shadow-md transition duration-300 hover:-translate-y-0.5 hover:bg-white/30 hover:shadow-lg active:translate-y-0 placeholder:text-muted-foreground/70"
            >
              РЕГИСТРАЦИЯ
            </button>
          </div>
        </div>
      </div>
      <div className="ml-40">
        <img src={image} />
      </div>
    </PageTemplate>
  );
}

export default RegistrationPage;

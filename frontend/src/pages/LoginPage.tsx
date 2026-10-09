import { useEffect, useState } from 'react';
import { redirect } from 'react-router-dom';


function LoginPage() {


  const [users, setUsers] = useState<any>([]);

  const handleGoogle = () => {
    fetch('http://localhost:3000/auth/google')
      .then((response) => response.json())
      // .then((data) => setUsers(data))
      .then(() => redirect('/'))
      .catch((error) => {
        console.error('Error auth google:', error);
      });
  }


  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .then(() => redirect('/'))
      .catch((error) => {
        console.error('Error fetching authors:', error);
      });
  }, []);

  useEffect(() => {
    console.log(users, 'iiii');
  }, [users]);



  return (
    <>
    <div className="relative min-h-screen w-full bg-background text-foreground">

Login Page
    </div>
{/* <button onClick={handleGoogle}>google</button> */}
<button
                key={'kjlj'}
                type="button"
                onClick={() => {window.location.href = 'http://localhost:3000/auth/google'}}
                className={
                  'relative cursor-pointer rounded-t-md outline-1 -outline-offset-1 outline-glass-edge ring-1 ring-foreground/10 transition-all duration-300 hover:-translate-y-5 hover:ring-primary/50 hover:shadow-[0_28px_55px_-18px_var(--color-foreground)]'
                  // book.spine,
                  // selectedId === book.id && "-translate-y-3 ring-primary/60",
                }
              >GOOGLE</button>
</>
  );
}

export default LoginPage;

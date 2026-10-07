import { useEffect, useState } from 'react';
import { redirect } from 'react-router-dom';


function LoginPage() {


  const [users, setUsers] = useState<any>([]);


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
    <div className="relative min-h-screen w-full bg-background text-foreground">

Login Page
    </div>
  );
}

export default LoginPage;

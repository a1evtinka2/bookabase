import { useEffect, useState } from 'react'
import './App.css'
import { BookSpine } from './components/BookSpine'
import type { Item } from './dto/item'

function App() {
  const [nickname, setName] = useState('')
  const [dateOfBirth, setDate] = useState('')
  const [backendError, setBackendError] = useState<string | undefined>(undefined)
  const [items, setItems] = useState<any>([])


    useEffect(() => {
         
      fetch('http://localhost:3000/items/list',)
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => {
        console.error('Error fetching items:', error)
      }
      )
  }, [])

    useEffect(() => {
    console.log(items, 'iiii');
    
  }, [items])

  useEffect(() => {
    console.log(nickname, dateOfBirth)
    if (nickname === 'Dialogs') {
      const item = {
        authorId: '909e10f7-964d-48c0-8654-386ed6f510f1',
        title: nickname,
        type: 'book'
      }

        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item)
         };
         console.log(requestOptions);
         
      fetch('http://localhost:3000/items', requestOptions)
      .then(response => response.json())
      .catch(error => {
        console.error('Error fetching data:', error)
        setBackendError(error.message);
      }
      )
    }

  }, [nickname, dateOfBirth])

  return (
    <>
    {/* <div className="flex items-end gap-2">
        <BookSpine title="Мастер и Маргарита" />
        <BookSpine title="Преступление и наказание" />
        <BookSpine title="Сто лет одиночества" />

    </div> */}
    {items?.map((i: Item) => {
      const authorsFullName = `${i.firstName} ${i.surname}` 
      return (
        <BookSpine title={`${authorsFullName}.${i.title}`} />
      )
    })}
       

   {/* {items?.map((i: any) => return {
      <div>{i.title}</div>
   })} */}
      <div className="ticks">
      {/* <section id="next-steps"> */}
        {/* <form > */}
          <input 
            type="text" 
            id="first_name" 
            onChange={(v) => setName(v.target.value)}
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" 
            placeholder="John" required />
          <input 
            type="text" 
            id="first_name" 
            onChange={(v) => setDate(v.target.value)}
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" 
            placeholder="John" required />

        {/* </form> */}
      {/* </section> */}
      </div>

    </>
  )
}

export default App

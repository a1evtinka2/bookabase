const getBookDeclension = (value: number) => {
  let word;
  switch(value) {
    case 1: 
      word = 'книга';
      break;
    case 2: 
    case 3: 
    case 4: 
      word = 'книги';
      break;
    default: 
      word = 'книг';
      break;
  };
  return word;
};

export default getBookDeclension;

const randomColors = [
  '#90B494',
  '#718F94',
  '#BFC8AD',
  '#DBCFB0',
  '#9DC3C2',
  '#77A6B6',
  '#035E7B',
  '#8EB19D',
  '#4D7298',
  '#536271',
  '#6A687A',
  '#84828F',
  '#188FA7',
  '#769FB6',
  '#9DBBAE',
  '#D5D6AA',
  '#E2DBBE',
];

const getRandomColor = () => {
  const length = randomColors.length;
  const index = Math.floor(Math.random() * length);
  return randomColors[index];
};

export default getRandomColor;

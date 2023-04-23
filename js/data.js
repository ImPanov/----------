import {
  getRandomElement, getRandomInt, checkLength, makeUniqueRandomIntegerGenerator,
} from './utils.js';

const NAMES = ['John', 'Mary', 'Mike', 'Jack', 'Jill'];

const MESSAGES = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTIONS = ['классная фотка',
  'сплюю',
  'здесь я ем',
];

const generateComments = ()=> {
  let comments = [];
  let limit = getRandomInt(1, 3);
  for (let i = 0; i < limit; i++) {
    comments.push({
      id: getRandomInt(0, 999),
      avatar: `./img/avatar-${getRandomInt(1, 6)}.svg`,
      name: getRandomElement(NAMES),
      message: getRandomElement(MESSAGES),
    })
  }
  return comments
}

const randomGenerator = makeUniqueRandomIntegerGenerator(1, 25);
const createProfile = (index) => ({
  id: randomGenerator(),
  url: `./photos/${index}.jpg`,
  descriptions: getRandomElement(DESCRIPTIONS),
  likes: getRandomInt(0, 100),
  comments: generateComments(),
});

const photos = new Array(25).fill(null).map((_, i) => createProfile(i+1));
export { photos };

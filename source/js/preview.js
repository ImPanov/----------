import { getProfiles } from './data.js'
import { showPicture } from './fullImage.js'
import { debounce, shuffleArray } from './utils.js';
const DEFAULT_PREVIEW_LOAD = 25;
const RANDOM_PREVIEW_LOAD = 10;
let photos = [];
const imgFilters = document.querySelector('.img-filters');
const templatePicture = document.querySelector('#picture').content.querySelector('.picture');
const pictureList = document.querySelector('.pictures')

const removeActiveClass = function() {
  let activeFilter = document.querySelector('.img-filters__button--active');
  activeFilter.classList.remove('img-filters__button--active');
}

const removePhotos = () => {
  const images = document.querySelectorAll('.picture');
  if (images) {
    images.forEach(element => {
      element.remove();
    });
  }
}
const filters = {
  'filter-default': () => {
    renderPhotos(photos.slice(0, DEFAULT_PREVIEW_LOAD))
  },
  'filter-random': () => {
    renderPhotos(shuffleArray(photos.slice()).slice(0, RANDOM_PREVIEW_LOAD));

  },
  'filter-discussed': () => {
    renderPhotos(photos.slice().sort((a, b) => {
      return b.comments.length - a.comments.length;
    }))
  },
}
const onFilterClick = debounce((evt) => {
  if (evt.target.classList.contains('img-filters__button')) {
    removePhotos();
    filters[evt.target.id]()
  }
})
const onSuccess = (data) => {
  imgFilters.classList.remove('img-filters--inactive');
  photos = data.slice()
  renderPhotos(photos.slice(0, DEFAULT_PREVIEW_LOAD))
}
imgFilters.addEventListener('click', (evt)=>{
  removeActiveClass()
  evt.target.classList.add('img-filters__button--active')
})
imgFilters.addEventListener('click', onFilterClick)

const renderPhoto = ({url, comments, likes, description}) => {
  const previewPicture = templatePicture.cloneNode(true);

  previewPicture.querySelector('.picture__img').src = url;
  previewPicture.querySelector('.picture__likes').textContent = likes;
  previewPicture.querySelector('.picture__comments').textContent = comments.length;

  const onClickPicture = function (evt) {
    evt.preventDefault();
    showPicture({ url, comments, likes, description});
  };
  previewPicture.addEventListener('click', onClickPicture);

  return previewPicture;
};
const renderPhotos = (previews) => {

  const picturesListFragment = document.createDocumentFragment();
  previews.forEach((preview) => {
    picturesListFragment.appendChild(renderPhoto(preview));
  });
  pictureList.appendChild(picturesListFragment);
  imgFilters.classList.remove('img-filters--inactive');
}
getProfiles(onSuccess);

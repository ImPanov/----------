import { photos } from './data.js'
import { showPicture } from './fullImage.js'
const templatePicture = document.querySelector('#picture').content.querySelector('.picture');
const pictureList = document.querySelector('.pictures')

const renderPhoto = ({url, comments, likes,description}) => {
  const previewPicture = templatePicture.cloneNode(true);

  previewPicture.querySelector('.picture__img').src = url;
  previewPicture.querySelector('.picture__likes').textContent = likes;
  previewPicture.querySelector('.picture__comments').textContent = comments.length;

  let onClickPicture = function (evt) {
    evt.preventDefault();
    showPicture({ url, comments, likes, description});
  };
  previewPicture.addEventListener('click', onClickPicture);

  return previewPicture;
};
const renderPhotos = () => {
  let picturesListFragment = document.createDocumentFragment();

  photos.forEach((photos) => {
    picturesListFragment.appendChild(renderPhoto(photos));
  });

  pictureList.appendChild(picturesListFragment);
}

export {renderPhotos};

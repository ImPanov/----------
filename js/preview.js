import { photos } from './data.js'
const templatePicture = document.querySelector('#picture').content.querySelector('.picture');
const pictureList = document.querySelector('.pictures')
const renderPhoto = ({url, comments, likes}) => {
  const previewPicture = templatePicture.cloneNode(true);

  previewPicture.querySelector('.picture__img').src = url;
  previewPicture.querySelector('.picture__likes').textContent = likes;
  previewPicture.querySelector('.picture__comments').textContent = comments.length;

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

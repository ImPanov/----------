import { getProfiles } from './data.js'
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
const renderPhotos = (previews) => {
  let picturesListFragment = document.createDocumentFragment();
  previews.forEach((preview) => {
    picturesListFragment.appendChild(renderPhoto(preview));
  });

  pictureList.appendChild(picturesListFragment);
}
getProfiles(renderPhotos);

import { getRandomInt, isEscEvent } from './utils.js';
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
let fullImage = document.querySelector('.big-picture');
let commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
let commentList = document.querySelector('.social__comments');
let fullImageClose = document.querySelector('.big-picture__cancel');
const commentsCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const previewImage = document.querySelector('.img-upload__preview > img');
const uploadedImage = document.querySelector('.img-upload__input');
const COMMENTS_LOAD_STEP = 5;

uploadedImage.addEventListener('change', () => {
  const file = uploadedImage.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it)=>{
    return fileName.endsWith(it);
  });
  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      previewImage.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});

let commentsCounter = COMMENTS_LOAD_STEP;

let commentsLoaded = [];
const addComments = () => {
  let commentListFragment = document.createDocumentFragment();
  let newComments = commentsLoaded.slice(commentsCounter, commentsCounter + COMMENTS_LOAD_STEP);
  if (newComments) {
    newComments.forEach(comment => {
      commentListFragment.appendChild(renderComment(comment));
    });
  }
  commentsCounter += newComments.length;
  commentsCount.textContent = `${commentsCounter} из ${commentsLoaded.length} комментариев`;
  commentList.appendChild(commentListFragment);
};

commentsLoader.addEventListener('click', addComments);

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closePicture();
  }
};

let closePicture = function() {
  fullImage.classList.add('hidden');
  document.body.classList.remove('modal-open');
  fullImageClose.removeEventListener('click', closePicture);
  document.removeEventListener('keydown', onPopupEscKeydown);
  commentList.innerHTML = '';
  commentsCounter = COMMENTS_LOAD_STEP;
  commentsLoaded = []
}

let showPicture = function({url,description,likes,comments}) {
  let picture = fullImage.querySelector('.big-picture__img > img');
  picture.src = url;
  picture.alt = 'simple text';
  let social = fullImage.querySelector('.big-picture__social');
  social.querySelector('.social__picture').src = `./img/avatar-${getRandomInt(1, 6)}.svg`;
  social.querySelector('.social__caption').textContent = description;
  social.querySelector('.likes-count').textContent = likes;
  social.querySelector('social__comments');
  commentsLoaded = comments;
  renderComments(comments.slice(0, commentsCounter));
  fullImage.classList.remove('hidden');
  document.body.classList.add('modal-open');
  fullImageClose.addEventListener('click', closePicture);
  document.addEventListener('keydown', onPopupEscKeydown);
};

let renderComments = function(comments) {
  let commentListFragment = document.createDocumentFragment();
  if (comments) {
    comments.forEach(comment => {
      commentListFragment.appendChild(renderComment(comment));
    });
  }

  commentsCount.textContent = `${commentsCounter} из ${commentsLoaded.length} комментариев`;
  commentList.appendChild(commentListFragment);
}
let renderComment = function ({avatar, name, message}) {
  let commentSimilar = commentTemplate.cloneNode(true);
  let imgSocial = commentSimilar.querySelector('.social__picture');
  imgSocial.src = avatar;
  imgSocial.alt = name;
  commentSimilar.querySelector('.social__text').textContent = message;
  return commentSimilar
}
export { showPicture };

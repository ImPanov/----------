import { getRandomInt, isEscEvent } from './utils.js';
let fullImage = document.querySelector('.big-picture');
let commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
let commentList = document.querySelector('.social__comments');
let fullImageClose = document.querySelector('.big-picture__cancel');

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
}

let showPicture = function({id,url,description,likes,comments}) {
  let picture = fullImage.querySelector('.big-picture__img > img');
  picture.src = url;
  picture.alt = 'simple text';
  let social = fullImage.querySelector('.big-picture__social');
  social.querySelector('.social__picture').src = `./img/avatar-${getRandomInt(1, 6)}.svg`;
  social.querySelector('.social__caption').textContent = description;
  social.querySelector('.likes-count').textContent = likes;
  social.querySelector('social__comments');
  renderComments(comments);
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

const sendData = function(onSuccess, onFailure, body) {
  fetch('https://23.javascript.pages.academy/kekstagram',{
    method: 'POST',
    body,
  }).then((response)=>{
    if(response.ok) {
      onSuccess();
    } else {
      throw new Error();
    }
  }).catch(()=>{onFailure()});
};
export {sendData}

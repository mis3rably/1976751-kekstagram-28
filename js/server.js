const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '',
};
const Method = {
  GET: 'GET',
  POST: 'POST',
};
const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

let errorsContainer;

const generateErrorMessage = (message) => {
  const documentFragment = document.createDocumentFragment();
  if (!document.querySelector('.error-container')) {
    errorsContainer = document.createElement('div');
    documentFragment.appendChild(errorsContainer);
    errorsContainer.classList.add('error-container');
    errorsContainer.style.cssText = `
      position: fixed;
      bottom: 0;
      right: 0;
      height: 100vh;
      display: flex;
      flex-direction: column-reverse;
      gap: 2px;
    `;
    const mainTag = document.querySelector('main');
    mainTag.appendChild(errorsContainer);
  }
  const errorContainer = document.createElement('div');
  errorsContainer.appendChild(errorContainer);
  errorContainer.classList.add('error-element');
  errorContainer.style.cssText = `
      background-color: #bd2a2e;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 300px;
      height: 50px;
      max-height: 400px;
      z-index: 10;
  `;
  const errorText = document.createElement('p');
  errorContainer.appendChild(errorText);
  errorText.textContent = message;
  setTimeout(() => {
    errorContainer.style.display = 'none';
  }, 3000);
};

const load = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error(errorText);
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

const getData = () => load(Route.GET_DATA, ErrorText.GET_DATA);

const sendData = (body) => load(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);

export { getData, sendData, generateErrorMessage };

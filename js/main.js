import { getData, generateErrorMessage } from './server.js';
import './data.js';
import './util.js';
import { generatePreviews } from './render-preview.js';
import './render-photo.js';
import './form.js';

getData()
  .then((data) => {
    generatePreviews(data);
  })
  .catch(() => {
    generateErrorMessage('Ошибка при загрузке данных!');
  });

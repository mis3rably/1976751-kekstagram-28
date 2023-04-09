import { getData, generateErrorMessage } from './server.js';
import './util.js';
import { generatePreviews, displayFilterOptions } from './render-preview.js';
import './render-photo.js';
import './form.js';

const ERROR_MESSAGE = 'Ошибка при загрузке данных!';

getData()
  .then((data) => {
    generatePreviews(data);
    displayFilterOptions(data);
  })
  .catch(() => {
    generateErrorMessage(ERROR_MESSAGE);
  });

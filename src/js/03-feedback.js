import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const textarea = document.querySelector('.feedback-form textarea');
const input = document.querySelector('.feedback-form input');
const LOCAL_STORAGE_KEY = 'feedback-form-state';

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onTextareaInput, 500));

let data = {
  email: ' ',
  message: ' ',
};

populateTextarea();

function onFormSubmit(e) {
  e.preventDefault();
  if (input.value === '' || textarea.value === '') {
    return alert(`Всі поля мають бути заповнені !`);
  }

  e.currentTarget.reset();
  localStorage.removeItem(LOCAL_STORAGE_KEY);
  console.log(data);
  data.email = '';
  data.message = '';
}

function onTextareaInput(e) {
  data[e.target.name] = e.target.value;
  if (e.isComposing || e.keyCode === 229) {
    return;
  }
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
}

function populateTextarea() {
  const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (savedData) {
    data = JSON.parse(savedData);

    let { email, message } = form.elements;

    email.value = data.email;
    message.value = data.message;
  }
}

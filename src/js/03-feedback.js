import throttle from "lodash.throttle";

const key = 'feedback-form-state';
const formData = {};
const refs = {
    form: document.querySelector('.feedback-form'),
    email: document.querySelector('.feedback-form input'),
    textarea: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onTextInput,500));

function onFormSubmit(evt) {
    evt.preventDefault();

    evt.currentTarget.reset();
    localStorage.removeItem(key)
};

fillTextarea();
function fillTextarea() {
    const savedMessage = localStorage.getItem(key);

    if(savedMessage) {
        const parsedData = JSON.parse(savedMessage);

        if(parsedData.email) {
            refs.email.value = parsedData.email;
        }
        
        if(parsedData.message) {
            refs.textarea.value = parsedData.message;
        }
    }
};

function onTextInput(evt) {
    formData[evt.target.name] = evt.target.value;
    console.log(formData);
    localStorage.setItem(key, JSON.stringify(formData));
};


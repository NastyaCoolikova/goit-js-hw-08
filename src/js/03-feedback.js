import throttle from "lodash.throttle";

const key = 'feedback-form-state';
const formData = {};
const refs = {
    form: document.querySelector('.feedback-form'),
    email: document.querySelector('.feedback-form input'),
    textarea: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.textarea.addEventListener('input', throttle(onTextInput,500));
refs.email.addEventListener('input', throttle(onTextInput,500));

function onFormSubmit(evt) {
    evt.preventDefault();

    console.log(formData);

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
            formData.email = parsedData.email;
        }
        
        if(parsedData.message) {
            refs.textarea.value = parsedData.message;
            formData.message = parsedData.message;
        }
    }
};

function onTextInput(evt) {
    formData[evt.target.name] = evt.target.value;
    
    const savedMessage = localStorage.getItem(key);
    const parseMessage = JSON.parse(savedMessage);

    if(parseMessage != null) {
        parseMessage[evt.target.name] = evt.target.value;
        localStorage.setItem(key, JSON.stringify(parseMessage));
    } else {
        localStorage.setItem(key, JSON.stringify(formData));
    }
}
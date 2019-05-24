let phoneNumber = '';

const container = document.getElementById('container');
const form = document.getElementById('form');
const input = form.querySelector('input');
const button = form.querySelector('button');

/* templates */

const descriptionTemplate = document.getElementById('registration-descr');
const description = document.importNode(descriptionTemplate.content, true);
let number = description.getElementById('phoneNumberContainer');
const time = description.getElementById('timer');

const callTemplate = document.getElementById('call');
const call = document.importNode(callTemplate.content, true);


input.onfocus = () => {
    input.value = "380";
}

const startTimer = (duration, display) => {
    let timer = duration, minutes, seconds;
    let interval = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(interval);
            container.replaceChild(call, document.getElementsByClassName('registration__descr')[1]);
            const callBTN = document.getElementById('call-me');
            console.log(callBTN);
            callBTN.onclick = () => {
                callBTN.querySelector('p').innerHTML = 'Вас вызывает +380997315309';
                callBTN.classList.add('registration__call-me_ringing');
            }
        }
    }, 1000);
}

const saveNumber = () => {
    if( input.value.length === 12 ) {
        phoneNumber = input.value;
        input.value = "";
        input.placeholder = "Введите ОТП-пароль";
        console.log(phoneNumber);
        container.appendChild(description);
        container.a
        number.textContent = phoneNumber;
        startTimer( 60 * 0.1, time);
    }
}



/*input.addEventListener('keydown', inputListener, false);*/

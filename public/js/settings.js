const container = document.getElementById('container');

/*first text block template*/

const firstStepContentTemplate = document.getElementById('firstStep'),
      firstStepContent = document.importNode(firstStepContentTemplate.content, true);

/* second text block template */

window.onload = () => {
    let nextComponent = container.querySelector('button');

    container.insertBefore(firstStepContent, nextComponent);
}

const changeContent = (oldContentId, templateId) => {
    let secondStepContentTemplate = document.getElementById(templateId),
        secondStepContent = document.importNode(secondStepContentTemplate.content, true);

    document.querySelector('h1').textContent = "Для успешной записи интервью:";

    container.removeChild(document.getElementById(oldContentId));

    container.insertBefore(secondStepContent, container.querySelector('button'));
    if(document.querySelector('video')){
        startStream();
    }
    document.querySelector('button').setAttribute('onclick', 'changeText()');
}


const changeText = () => {
    let container = document.getElementById('secondStepContent'),
        title = document.querySelector('h1');

    let thirdStepContentTemplate = document.getElementById('thirdStep'),
        thirdStepContent = document.importNode(thirdStepContentTemplate.content, true);

    title.textContent = "Давайте начинать!";

    let oldText = container.querySelectorAll('p');
    for(let i = 0; i< oldText.length; i++) {
        container.removeChild(oldText[i]);
    }
    container.removeChild(container.querySelector('ul'));

    container.insertBefore(thirdStepContent, container.querySelector('figure'));

    document.querySelector('button').setAttribute('onclick', 'location.href="questions.html"');
}

let constraintObj = {
    audio: true,
    video: true
}
/*
if(navigator.mediaDevices === undefined) {
    alert('You have problems with your webcam')
} else {
    navigator.mediaDevices.enumerateDevices().then(devices => { })
}*/
const startStream = () => {
    navigator.mediaDevices.getUserMedia(constraintObj)
        .then( (mediaStreamObj) => {
            let video = document.querySelector('video');
            if('srcObject' in video) {
                video.srcObject = mediaStreamObj;
            } else {
                video.src = window.URL.createObjectURL(mediaStreamObj);
            }

            video.onloadedmetadata = function(ev) {
                video.play();
            }
        });
}


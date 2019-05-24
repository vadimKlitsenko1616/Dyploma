let currentPage = 2;
let step = document.getElementById('step');

let marker = document.getElementById('marker');
let markerImg = marker.querySelector('img');
let markerText = marker.querySelector('span');


let constraintObj = {
    audio: true,
    video: {
        facingMode: "user",
        width: {min: 640, ideal: 1280, max: 1920},
        height: {min: 480, ideal: 720, max: 1080}
    }
};

navigator.mediaDevices.getUserMedia(constraintObj)
    .then(function (mediaStreamObj) {
        let video = document.getElementById('video');

        if ("srcObject" in video) {
            video.srcObject = mediaStreamObj;
        } else {
            video.src = window.URL.createObjectURL(mediaStreamObj);
        }

        video.onloadedmetadata = function(ev) {
            video.play();
        }

        let start = document.getElementById('btnStart');
        let pause = document.getElementById('btnPause');
        let stop = document.getElementById('btnStop');
        let replay = document.getElementById('btnReplay');
        let next = document.getElementById('btnNext');
        let videoSave = document.getElementById('videoSave');
        let mediaRecorder = new MediaRecorder(mediaStreamObj);
        let counter = 0;
        let counterFirstBtn = 0;
        let chunks = [];

        start.addEventListener('click', (ev) => {
            mediaRecorder.start();
            console.log(mediaRecorder.state);

            start.classList.add("content__button_hidden");
            stop.classList.remove("content__button_hidden");
            pause.classList.remove("content__button_hidden");

            marker.className = "recording__descr recording__descr_active";
            markerImg.src = "img/svg/record.svg";
            markerText.textContent = "идет запись";
        });
        stop.addEventListener('click',  (ev) => {
           mediaRecorder.stop();
           videoSave.classList.add('recording__video-preview_active');
           console.log(mediaRecorder.state);

            marker.className = "recording__descr_hidden";

            stop.classList.add("content__button_hidden");
            pause.classList.add("content__button_hidden");
            replay.classList.remove("content__button_hidden");
            next.classList.remove("content__button_hidden");
        });
        pause.addEventListener('click',  (ev) => {
            if ( counter % 2 === 0 ) {
                marker.className = "recording__descr recording__descr_pause";
                markerImg.src = "img/svg/record.svg";
                markerText.textContent = "пауза";

                mediaRecorder.pause();
                pause.querySelector('span').textContent = "продолжить запись";
                pause.querySelector('img').src = "img/svg/record.svg";
                pause.querySelector('img').alt = "record";
            } else {
                marker.className = "recording__descr recording__descr_active";
                markerImg.src = "img/svg/record.svg";
                markerText.textContent = "идет запись";

                mediaRecorder.resume();
                pause.querySelector('span').textContent = "поставить паузу";
                pause.querySelector('img').src = "img/svg/pause.svg";
                pause.querySelector('img').alt = "pause";
            }
            console.log(mediaRecorder.state);
            counter++;
        });
        replay.addEventListener('click', (ev) => {
            marker.classList = "recording__descr";
            markerText.textContent = "готово к записи";

            videoSave.classList.remove("recording__video-preview_active");
            replay.classList.add("content__button_hidden");
            pause.classList.add("content__button_hidden");
            next.classList.add("content__button_hidden");
            start.classList.remove("content__button_hidden");
        });
        next.addEventListener('click', (ev) => {
            marker.classList = "recording__descr";
            markerText.textContent = "готово к записи";

            next.classList.add("content__button_hidden");
            replay.classList.add("content__button_hidden");
            start.classList.remove("content__button_hidden");

            videoSave.classList.remove("recording__video-preview_active");

            if (currentPage < 5) {
                step.textContent = currentPage.toString();
                window.scrollTo(0, 0);
                currentPage++;
            } else if (currentPage === 5 ) {
                step.textContent = currentPage.toString();
                window.scrollTo(0, 0);
                next.querySelector('span').textContent = "завершить интервью";
                next.setAttribute('onclick', 'location.href="ending.html"');
            }
        });

        mediaRecorder.ondataavailable = function (ev) {
            chunks.push(ev.data);
        };
        mediaRecorder.onstop = (ev) => {
            let blob = new Blob(chunks, { 'type' : 'video/mp4;' });
            console.log(blob);
            chunks = [];
            let videoURL = window.URL.createObjectURL(blob);
            videoSave.src = videoURL;
        }

    })
    .catch( function(err) {
        console.log(err.name, err.message);
    });


let progressBar = document.querySelector(".container .progress-area .progress-bar");
let queueBox = document.querySelector(".container .queue-box");
let queueClose = document.querySelector(".container .queue-close");
let queueBtn = document.querySelector(".container .queue");
let musicImg = document.querySelector(".container .img img");
let musicTitle = document.querySelector(".container .title-artist .title");
let musicArtist = document.querySelector(".container .title-artist .artist");
let music = document.querySelector("#music");
let playPauseBtn = document.querySelector(".container .play-pause");
let currentTime = document.querySelector(".container .current-time");
let totaltime = document.querySelector(".container .total-time");
let nextBtn = document.querySelector(".container .next-btn");
let prevBtn  = document.querySelector(".container .back-btn");
let repeatBtn = document.querySelector(".container .repeat-Btn");
let allMusicsBox = document.querySelector(".container .music-list");

let musicIndex = 1;

//Queue Box Popup
queueBtn.addEventListener("click", ()=>{
    queueBox.style.bottom = "0px";
})

//Queue Box close
queueClose.addEventListener("click", ()=>{
    queueBox.style.bottom = "-100%";
})


//Progress Bar Slider Runnable track
let updateSliderTrack = () =>{
    let min = progressBar.min;
    let max = progressBar.max;
    let value = progressBar.value;

    let bgSize = progressBar.style.cssText= 'background-size:' + (value - min) * 100 / (max - min) + "% 100%";
}

window.addEventListener("load", ()=>{
    loadMusic(musicIndex);//calling loadMusic function on page load
})

//loadMusic function
let loadMusic =(indexNumb)=>{
    musicImg.src = `${allmusic[indexNumb - 1].img}.jpg`;
    musicTitle.innerHTML = `${allmusic[indexNumb - 1].name}`;
    musicArtist.innerHTML = `${allmusic[indexNumb - 1].artist}`;
    music.src = `${allmusic[indexNumb - 1].src}.mp3`;
    playingNow();
}

//play pause Button Event
playPauseBtn.addEventListener("click", ()=>{
    if(playPauseBtn.classList.contains("play")){ //if playPause contains class "play"
        playPauseBtn.classList.replace("play", "pause");//then replace class "play" to "pause"
        playPauseBtn.querySelector("i").innerHTML = "pause";
        music.play();
    } else {
        playPauseBtn.classList.replace("pause", "play");//else replace class "play" to "pause"
        playPauseBtn.querySelector("i").innerHTML = "play_arrow";
        music.pause();
    }
    playingNow();
})

music.addEventListener("timeupdate", (e)=>{
    let currTime = e.target.currentTime; // Music current time
    let ttlTime = e.target.duration;// Music duration time
    
    //formatting current time in minute and second
    let currMin= Math.floor(currTime / 60);
    let currSec = Math.floor(currTime % 60);
    if (currSec < 10){
        currSec =  `0${currSec}`; //adding zero if current second less than 10
    }
    currentTime.innerHTML = `${currMin}:${currSec}`;

    //updating progress Bar on time update
    let progressWidth = (currTime / ttlTime) * 100; //progress value
    if(isNaN(progressWidth)){ //if progressWidth is "NaN"
        progressWidth = 0;
    }
    progressBar.value = progressWidth;
    updateSliderTrack();
})

//updating music current time on slider seeking
progressBar.addEventListener("input", (e)=>{
    music.currentTime = e.target.value / 100 * music.duration;
})

music.addEventListener("loadeddata", ()=>{
    let duration = music.duration; //Music duration

    //Formatting music duration in minute and second
    let ttlMin = Math.floor(duration / 60);
    let ttlSec = Math.floor(duration % 60);
    if(ttlSec < 10){
        ttlSec =   `0${ttlSec}`;//adding 0 if total second less than 10
    }
    totaltime.innerHTML = `${ttlMin}:${ttlSec}`;
})

//Next button event
nextBtn.addEventListener("click", ()=>{
    musicIndex++;//Increment of INdex by 1
    musicIndex > allmusic.lenght ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    if(playPauseBtn.classList.contains("play")){ //if playPause contains class "play"
        playPauseBtn.classList.replace("play", "pause");//then replace class "play" to "pause"
        playPauseBtn.querySelector("i").innerHTML = "pause";
    }
    setTimeout(()=>{
        music.play();
    }, 700);
    playingNow();
})

//Previous Music Button event
prevBtn.addEventListener("click", ()=>{
    musicIndex--;//decrement in index by 1
    //if musicIndex is lessthan 1 then musicIndex will be equal to array lenght
    musicIndex < 1 ? musicIndex = allmusic.lenght : musicIndex = musicIndex;
    loadMusic(musicIndex);
    if(playPauseBtn.classList.contains("play")){ //if playPause contains class "play"
        playPauseBtn.classList.replace("play", "pause");//then replace class "play" to "pause"
        playPauseBtn.querySelector("i").innerHTML = "pause";
    }
    setTimeout(()=>{
        music.play();
    }, 700);
    playingNow();
})

//changing repeat/Repeat_one/shuffle Button
repeatBtn.addEventListener("click", ()=>{
    let getText = repeatBtn.innerHTML;
    console.log(getText);
    switch(getText){
        case 'repeat':
                repeatBtn.innerHTML = "repeat_one";
            break;
        case 'repeat_one':
            repeatBtn.innerHTML = "shuffle";
            break;
        case 'shuffle':
            repeatBtn.innerHTML = 'repeat';
            break;
        }
})

music.addEventListener("ended", ()=>{
    let getText = repeatBtn.innerHTML;
    switch(getText){
        case 'repeat':
            music.current = 0;
            nextBtn.click();
            break;

        case 'repeat_one':
            loadMusic(musicIndex);
            music.play();
            break;
            
        case 'shuffle':
            let randomIndex = Math.floor((Math.random() * allmusic.lenght) + 1);
            do {
                randomIndex = Math.floor((Math.random() * allmusic.lenght) + 1);
            } while(musicIndex == randomIndex);
            musicIndex = randomIndex;
            loadMusic(musicIndex);
            music.play();
    }

})

//showing all musics in music list
let showallMusic =()=>{
    //Creating music list according to the array lenght
    for(let i = 0; i < allmusic.length; i++){
        let list = 
                `<div class="music-list-music" li-index="${i + 1}">
                    <div class="mlm-img">
                        <img src="${allmusic[i].img}.jpg" alt="">
                    </div>
                    <p class="mlm-music-title">${allmusic[i].name}</p>
                    <p class="mlm-music-artist">${allmusic[i].artist}</p>
                    <audio class = "music${i + 1}" src="${allmusic[i].src}.mp3"></audio>
                    <span class="mlm-music-time" id ="music${i + 1}">4:43</span>
                </div>`;
        allMusicsBox.insertAdjacentHTML('beforeend', list);

        let audioTag = document.querySelector(`.music${i + 1}`);

        //selecting span tag of list 
        let audioDuration = document.querySelector(`#music${i + 1}`);

        audioTag.addEventListener("loadeddata", ()=>{
            let audioDura = audioTag.duration;
            
            //formatting duration in minute and second
            let totalMin = Math.floor(audioDura / 60);
            let totalSec = Math.floor(audioDura % 60);
            if(totalSec < 10){
                totalSec = `0${totalSec}`;
            }
            audioDuration.innerHTML = `${totalMin}:${totalSec}`;
            audioDuration.setAttribute('total-duration', `${totalMin}:${totalSec}`);
        })
    }
}
let playingNow = ()=>{
    const allMusicTag = document.querySelectorAll(".music-list-music");
    for(let i = 0; i < allmusic.length; i++){
        let adDuraTxt = allMusicTag[i].querySelector(".mlm-music-time")
        
        //
        if(allMusicTag[i].classList.contains("playing")){
            allMusicTag[i].classList.remove("playing");
            let adDuration = adDuraTxt.getAttribute("total-duration");
            adDuraTxt.innerHTML = adDuration;
        }

        //if there is any music in music list which index is equal to musicIndex then add class "playing" in list
        if(allMusicTag[i].getAttribute('li-index') == musicIndex){
            allMusicTag[i].classList.add("playing");
            adDuraTxt.innerHTML = "Playing";
        }

        //adding on click attribute in all list of music list
        allMusicTag[i].setAttribute('onclick','clicked(this)');
    }
}

//Play song on click
let clicked =(element)=>{
    let getMusicIndex = element.getAttribute('li-index');
    musicIndex = getMusicIndex;
    loadMusic(musicIndex);
    music.play();
    playingNow();
    if(playPauseBtn.classList.contains("play")){ //if playPause contains class "play"
        playPauseBtn.classList.replace("play", "pause");//then replace class "play" to "pause"
        playPauseBtn.querySelector("i").innerHTML = "pause";
        music.play();
    }
    queueClose.click();
}


showallMusic();
playingNow();
progressBar.addEventListener("input", updateSliderTrack);




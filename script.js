console.log("Welcome to Spotify-Clone");

let songIndex = 0;
let audioElement = new Audio('music/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('progressBar');
let gif=document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let sItems = Array.from(document.getElementsByClassName('songItem'));


let songs = [
    {songName: "Jab Tak", songPath: "1.mp3", coverPath: "images/cover1.jpeg"},
    {songName: "Vikram", songPath: "2.mp3", coverPath: "images/cover2.jpeg"}, 
    {songName: "Hua Main", songPath: "3.mp3", coverPath: "images/cover3.jpeg"},
    {songName: "Tum Hi Ho", songPath: "4.mp3", coverPath: "images/cover4.jpeg"},
    {songName: "Agar Tum Saath Ho", songPath: "5.mp3", coverPath: "images/cover5.jpeg"},
    {songName: "chaldiye", songPath: "6.mp3", coverPath: "images/cover6.jpeg"},
    {songName: "Mawa Enthaina", songPath: "7.mp3", coverPath: "images/cover7.jpeg"},
]

sItems.forEach((element,i) => {
   
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});
//handle play/pause
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('play_cirlce');
        masterPlay.classList.add('pause_circle'); 
        gif.style.opacity = 1;       
    }else{
        audioElement.pause();
        masterPlay.classList.remove('pause_circle');
        masterPlay.classList.add('play_circle');
        gif.style.opacity = 0;    
    }
})

//Listen to events
audioElement.addEventListener('timeupdate', ()=>{
   
    //updating seek bar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value *audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('pause_circle');
        element.classList.add('play_circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('play_circle');
        e.target.classList.add('pause_circle');
        audioElement.src = `${songIndex+1}.mp3` ;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('play_circle');
        masterPlay.classList.add('pause_circle');
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=7){
        songIndex=0;
    }else{
        songIndex += 1;
    }
    audioElement.src = `${songIndex+1}.mp3` ;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('play_circle');
    masterPlay.classList.add('pause_circle');    
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0;
    }else{
        songIndex -= 1;
    }
    audioElement.src = `${songIndex+1}.mp3` ;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('play_circle');
    masterPlay.classList.add('pause_circle');  
})
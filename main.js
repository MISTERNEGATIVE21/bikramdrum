//features to be implemented:
//1. user can input string representing the audio to be played -->done
//2. while inputing the string they can choose for looping a specific part
//3. users can save the prepared audio if they want to

//fix:
//1. latency audio being played
//2. improve CSS

//implementing the audio play on keydown event and click event

window.addEventListener('load',function(){
    loader=document.getElementById("loading")
    loader.style.display= "none"
    

    function removetransition(){
        this.classList.remove("playing");
    }
    
    function playsound(e){
        let audio;
        let key;
        
        if(e.type=="keydown"){
            audio = document.querySelector(`audio[data-key="${e.code}"]`);
            key = document.querySelector(`.key[data-key="${e.code}"]`)
        }
        if(e.type=="click"){
            audio = document.querySelector(`audio[data-key="${this.getAttribute("data-key")}"]`);
            key = this;
        }
        if (audio!=null){
            if(e.isTrusted==true){audio.currentTime=0;}
            key.classList.add("playing");
            audio.play();
        }
    }
    
    const keys=document.querySelectorAll(".key");
    keys.forEach(key=>key.addEventListener("transitionend",removetransition));
    
    window.addEventListener("keydown", playsound);
    keys.forEach(key=>key.addEventListener('click',playsound));
    
    
    //1. user can input string representing audio to be played
    
    //1a ->when user is inputing string the audio effect on keys is turned off
    function disablePlay(){
        if (input===document.activeElement){
            window.removeEventListener("keydown",playsound);
        }
    };
    //disablePlay function removes keydown event listener from window if active element is input
    window.addEventListener("click",disablePlay);
    input=document.querySelector(".inputString");
    input.addEventListener("blur", function(){window.addEventListener("keydown",playsound)});
    //keydown event listener added again if user clicks away from input
    
    
    //1b ->when play button clicked, store textarea value to playString
    let playString;
    function saveString(){
        playString=input.value.trim();
        
    }
    playButton=document.querySelector("button.play");
    playButton.addEventListener("click",saveString);
    playButton.addEventListener("click",simulateKeyDown);
    
    //1c ->simulate keyDown events according to playString when Play button is clicked and empty input field
    
    //nodelist containing all element of class playing
    playingNodeList=document.querySelectorAll(".playing")
    function simulateKeyDown(){
        gap=document.getElementById("gap");
        if(gap.value){
            gapVal= parseInt(gap.value)
        }else{gapVal= 1}
        const chars=playString.split("");
        
        
        //implementing chars of string being played with specified time gap
        
        function sleep(ms) {
            // return new Promise(resolve => setTimeout(resolve, ms));
            return new Promise(resolve => {setTimeout(resolve, ms)});
        }
         async function dispatchKeyDown() {
             if(chars[0]!=undefined){
                 window.dispatchEvent(new KeyboardEvent("keydown",{'code':`Key${chars[0].toUpperCase()}`}))
                 
                 for (let i = 1; i <chars.length ; i++) {
                     await sleep(gapVal);
                     window.dispatchEvent(new KeyboardEvent("keydown",{'code':`Key${chars[i].toUpperCase()}`}))
                }
            }
        }
        dispatchKeyDown();
    
    }
    
    
    //clearing input fields on reload
    window.onload = function() {
        input.value = '';
        gap.value='';
    }
})



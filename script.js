const countdownE1s = document.querySelectorAll(".countdown")
countdownE1s.forEach(countdownE1 =>
    createCountdown(countdownE1))

    function createCountdown(countdownE1){
        const target = new Date(new Date(countdownE1.dataset.targetDate).toLocaleDateString('En', ))
        const parts = {
            days: {text: ["dias","dia"], dots: 30},
            hours: {text: ["horas","hora"], dots: 24},
            minutes: {text: ["minutos","minuto"], dots: 60},
            seconds: {text: ["segundos","segundo"], dots: 60},
        }
        Object.entries(parts).forEach(([key,value])=>{
            const partE1 = document.createElement("div");
            partE1.classList.add("part", key);
            partE1.style.setProperty("--dots",value.dots);
            value.element = partE1;

            const remainingE1 = document.createElement("div");
            remainingE1.classList.add("remaining");
            remainingE1.innerHTML = `
            <span class="number"></span>
            <span class="text"></span>
            `
            partE1.append(remainingE1);
            for(let i=0; i< value.dots; i++){
                const dotContainerE1= document.createElement("div");
                dotContainerE1.style.setProperty("--dot-idx",i);
                dotContainerE1.classList.add("dot-container")
                const dotE1 = document.createElement("div");
                dotE1.classList.add("dot")
                dotContainerE1.append(dotE1);
                partE1.append(dotContainerE1);
            }
            countdownE1.append(partE1);
        })
        getRemainingTime(target,parts)
    }

function getRemainingTime(target,parts, first=true){
    const now = new Date()
    if(first) console.log({target,now})
    const remaining = {}
let seconds = Math.floor((target-(now))/1000);
let minutes = Math.floor(seconds/60);
let hours = Math.floor(minutes/60);
let days = Math.floor(hours/24);
hours = hours-(days*24);
minutes = minutes-(days*24*60)-(hours*60);
seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);
Object.entries({days,hours,minutes,seconds}).forEach(([key,value])=>{
    const remaining = parts[key].element.querySelector(".number");
    const text = parts[key].element.querySelector(".text");
    remaining.innerText = value;
    text.innerText= parts[key].text[Number(value==1)]
    const dots = parts[key].element.querySelectorAll(".dot")
    dots.forEach((dot,idx)=>{
        dot.dataset.active = idx <= value;
        dot.dataset.lastactive = idx == value;
    })
})
if(now <= target){
    window.requestAnimationFrame(()=>{
        getRemainingTime(target,parts,false)
    })
}
}


const range=document.querySelector(".range")
const new_password=document.querySelector(".new_password")
const all_hard_item=document.querySelectorAll(".password_hard_item")
const btn=document.querySelector(".btn")
const history_items=document.querySelector(".history_items")
const clear_history=document.querySelector('.history_clear')
const checkbox=document.querySelectorAll(".real_checkbox")
const reset=document.querySelector('.password_reset')
const error=document.querySelector('.error_text')
const txt_slider=document.querySelector('.output')

let old_px=Number(txt_slider.style.left)
let now_count=4;
/* Объект хранящий мин и макс для каждого стиля */
const symbol_obj={
    0:{
        min:65,
        max:90,
    },
    1:{
        min:48,
        max:57,
    },
    2:{
        min:97,
        max:122,
    },
    3:{
        min:33,
        max:47,
    },
}

/* Массив со стилями */
let style_password=[]

/* Перебираю массив и добавляю евент чтобы при нажатии добавлять в массив стиль */
checkbox.forEach((el,ind)=>{
    el.addEventListener("click",(e)=>{
       
        if (countChecked()) {
            error.classList.add('disable')
            if (el.checked) {
                style_password.push(ind)
            }else{
                style_password=style_password.filter((el)=>el!=ind)
             
            }
           
           
        }else{
            style_password=style_password.filter((el)=>el!=ind)
            error.classList.remove('disable')
            
            
        }
        
    })
})

/* Старт приложения */
const startProj=()=>{
style_password.push(0)
new_password.value=passwordGenerator(4);
hardPassword(new_password.value.split('').length);
}

/*Рандом с мин и макс */
function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

/* Узнаю сколько чекбоксов true */
const countChecked=()=>{
    let result=0;
    checkbox.forEach((el)=>{
        if(el.checked){

            result++;
        }
    })
    return result
}

/* По нажатию на ресет генерирую новый пароль с сохраненными параметрами */
reset.addEventListener("click",()=>{
    new_password.value=passwordGenerator(range.value)
})

/* Копирование по кнопке */
btn.addEventListener("click",(e)=>{
    e.preventDefault()
    navigator.clipboard.writeText(new_password.value)
    addHistoryItem()
})

/* Эвент выполняеться когда двигаю ползунок */
range.addEventListener('input',()=>{
    txt_slider.textContent=range.value;
    const change=range.offsetWidth/23
    
   if (now_count<Number(range.value)) {
    
    txt_slider.style.left=`${old_px+change}px`
    old_px+=change;
    now_count=range.value;
   }else{
    
    txt_slider.style.left=`${old_px-change}px`
    old_px-=change;
    now_count=range.value;
   }
   
   
    
    if(countChecked()){
        new_password.value=passwordGenerator(range.value);
        hardPassword(new_password.value.split('').length);
    }else{
        
    }
    
})


/* Генератор пароля */
const passwordGenerator=(leng)=>{
    
    let result=''
    let count=0;
    const style_leng=style_password.length;
    let style_random;
    while(count!=leng){
      
        style_random=style_password[randomInteger(0,style_leng-1)]
        let randomCode=randomInteger(symbol_obj[style_random].min,symbol_obj[style_random].max)
        result+=String.fromCharCode(randomCode)
        
        count++;
    }
    return result
}

/* Эвент сложности пароля */
const hardPassword=(leng,hard)=>{

    all_hard_item.forEach((el)=>el.classList.remove('red'))

    if (leng>0) {
        all_hard_item[3].classList.add("red")
    }
    if (leng>10) {
        all_hard_item[2].classList.add("red")
    }
    if (leng>16) {
        all_hard_item[1].classList.add("red")
    }

    if (leng>20) {
        all_hard_item[0].classList.add("red")
    }

}

/* Добавление пароль в историю */
const addHistoryItem=()=>{

    const history_item=document.createElement('div')
    history_item.classList.add('history_item')

    const history_password=document.createElement('div')
    history_password.classList.add('history_password')

    const password=document.createElement('div')
    password.textContent=new_password.value
    
    const data_passwor=document.createElement('div')
    data_passwor.classList.add('data_passwor')
    const data=new Date()
    const day=data.getDay()
    const mounth=data.getMonth()
    const yers=data.getFullYear()
    const hour=data.getHours()
    const min=data.getMinutes()
    const sec=data.getSeconds()
    data_passwor.textContent=`${day}/${mounth}/${yers} ${hour}:${min}:${sec}`
    
    const icon=document.createElement('img')
    icon.classList.add('copy_password')
    icon.src="./img/copy.svg"

    history_password.appendChild(password)
    history_password.appendChild(data_passwor)
    history_item.appendChild(history_password)
    history_item.appendChild(icon)
    history_items.appendChild(history_item)
    /* Копирование пароля из истории */
    icon.addEventListener('click',(e)=>{
        e.preventDefault()
        navigator.clipboard.writeText(password.textContent)
    })

}

/* Очистить историю */
clear_history.addEventListener('click',(e)=>{
    e.preventDefault()
    let history_item_all=document.querySelectorAll('.history_item')
    history_item_all.forEach((el)=>el.remove())
})


startProj()


         
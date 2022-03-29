const burger=document.querySelector('#burger');
const menu=document.querySelector('#menu');

burger.addEventListener('click',()=>{
    if(menu.classList.contains('phone:hidden')){
        menu.classList.remove('phone:hidden')
        menu.classList.add('phone:block')
    }else{
        menu.classList.remove('phone:block')
        menu.classList.add('phone:hidden')
    }
})

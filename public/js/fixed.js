const space=document.querySelector('#space');
const last=document.querySelector('#last');
window.onscroll=()=>{
    if(window.pageYOffset> last.offsetTop){
        // space.classList.remove('hidden')
        nav.classList.add('fixed')

    }
    else{
        // space.classList.add('hidden')
        nav.classList.remove('fixed')
    }
}
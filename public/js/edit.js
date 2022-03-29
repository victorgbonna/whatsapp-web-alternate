var img_div=document.getElementById('img_div')
var img_parent=document.getElementById('img_parent')
var count=1
function _upload(){
    document.querySelector('input[type="file"]').click();
}
img_parent.addEventListener('change',function(e){
    if (document.querySelector('input[type="file"]').contains(e.target)){
        image_change(e)
    }
})
function image_change(e){
    if(e.target.files[0]){
        count++
        for (let im = 0; im < e.target.files.length; im++) {
            var img=document.createElement('img')
            img.classList.add('w-12','h-12','opacity-75')
            img.src=URL.createObjectURL(e.target.files[im])
            img_div.appendChild(img)  
        }
        
        var newd=e.target.cloneNode(true)
        newd.value=''
        e.target.parentElement.insertBefore(newd,e.target)
        }
    }


document.getElementById('EditProductForm').addEventListener('submit', function(e){
    e.preventDefault()    
        var body=new FormData(EditProductForm)
        console.log('sjjs')
        // console.log(result)
        // window.location.reload()
        axios.put(`/api/product/edit/${slug}`, body)
        .then(result=>{
            // console.log('sjjs')
            window.location.replace(`/`)                
        })
        .catch(err=>{
            console.log(err)
        })
    
    
})
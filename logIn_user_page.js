const getImgBtn = document.getElementById('img-btn');
const wrapper = document.getElementsByClassName('wrapper')[0];
const logOutBtn = document.getElementById('log-out-btn');



window.addEventListener('load', function(){

    loadImg();
    changeUsername();

})

function loadImg(){
    const url = 'https://api.imgflip.com/get_memes';


    fetch(url)
    .then(response =>{
        if ( response.ok ){
            return response.json();
        } else {
            alert(response.status)
        }
    })

    .then(data => {
        const gridDivs = [];
        const imageNodes = [];
        const images = [];
        const metaName = [];
        const metaId = [];
        

        for( let i = 0; i < data.data.memes.length; i++){

            gridDivs[i] = document.createElement('figure');
            gridDivs[i].className = 'gallery_item';
            wrapper.appendChild(gridDivs[i]);

            const gallery_item = document.getElementsByClassName('gallery_item')[i];

            imageNodes[i] = document.createElement('div');
            imageNodes[i].className = 'image';
            gallery_item.appendChild(imageNodes[i]);

            const imageNode = document.getElementsByClassName('image')[i];
            images[i] = document.createElement('img');
            images[i].src = `${data.data.memes[i].url}`;
            imageNode.appendChild(images[i]);


            metaName[i] = document.createElement('p');
            metaName[i].className = 'meme-title';
            metaName[i].innerHTML = data.data.memes[i].name;
            gallery_item.appendChild(metaName[i]);

            metaId[i] = document.createElement('p');
            metaId[i].className = 'meme-id';
            metaId[i].innerHTML = `ID: ${data.data.memes[i].id}`;
            gallery_item.appendChild(metaId[i]);

            const imageTitle = document.getElementsByClassName('meme-title')[i];
            const imgId = document.getElementsByClassName('meme-id')[i];

            gallery_item.addEventListener('click', function(){
                
                if (gallery_item.classList.contains('animation') && imageTitle.classList.contains('opacityChange') && imgId.classList.contains('opacityChange')){
                    gallery_item.classList.remove('animation');
                    imageTitle.classList.remove('opacityChange');
                    imgId.classList.remove('opacityChange');
                } else {
                    gallery_item.classList.add('animation');
                    imageTitle.classList.add('opacityChange');
                    imgId.classList.add('opacityChange');
                }
            })
        }
    })
}


logOutBtn.addEventListener('click', function(){
    let stored = localStorage.getItem("newUserData");

    let storedArr = JSON.parse(stored);

    let result = storedArr.filter(obj => {
        return obj.status == 'logged in';
        })

    result[0].status = 'logged out';
    console.log(result[0].status);   

    localStorage.setItem("newUserData", JSON.stringify(storedArr));

    window.location.href = "index.html";
})

function changeUsername(){
    let stored = localStorage.getItem("newUserData");

    let storedArr = JSON.parse(stored);

    let result = storedArr.filter(obj => {
        return obj.status == 'logged in';
        })
    let currentName = result[0].name;
    
    const userName = document.getElementById('user-name');
    userName.innerHTML = currentName;

}


"use strict"

if (document.deviceready) {
    document.addEventlistener('deviceready', init);
} else {
    document.addEventListener('DOMContentLoaded', init)
}

var itemList = {reviews:[]};
var index = 0;
var currentId = null;
var key = "tout0004";
var img = document.getElementById("imgHolder");
var currentId = null;
var saveButton = document.getElementById("saveButton");
var cancelButton = document.getElementById("cancelButton");
var cancelButton2 = document.getElementById("cancelButton2");
var pictureButton = document.getElementById("pictureButton");
var addReviewButton = document.getElementById("addReviewButton");
var deleteButton = document.getElementById("deleteButton");

function init(){
    //localStorage.clear();
    
    if(!localStorage.getItem(key)){
        localStorage.setItem(key, JSON.stringify(itemList));
    }
    addEvents();
    showReviews();
}

function saveReview(ev){
    
    let itemName = document.getElementById("itemName").value;
    
    let starRating = document.querySelector('input[name="star"]:checked').value;
    console.log(starRating);
    
    let newReview = {
        id: Date.now(),
        item: itemName,
        rating: starRating,
        img: img.src
    }
    
    itemList.reviews.push(newReview);
    
    localStorage.setItem(key, JSON.stringify(itemList));
    
    clearForm();
    showReviews();
    hideModal();
    clearStars();
    console.log("saved!");
}

function showReviews(){
    
    itemList = JSON.parse(localStorage.getItem(key));
    
    let reviews = itemList.reviews;
    
    let ul = document.getElementById("reviewList");
        ul.innerHTML="";
    
    reviews.forEach(function(review){
    
        //console.log(review);
    let items = review.item;
    let rating = review.rating;
    let imgSrc = review.img;
    let id = review.id;
    
    let li = document.createElement("li");
        li.setAttribute("data-id",id);
    let a1 = document.createElement("a");
        a1.href = "#deleteModal";
        a1.className = "imgTag";
        
        a1.addEventListener("touchend",getStarId);
        a1.addEventListener("touchend", reviewToDelete);
        
    let itemImg = document.createElement("img");
        itemImg.className = "itemImg";
        itemImg.src= imgSrc;
         
    let div = document.createElement("div");
        div.className = "media-body";
    let h3 = document.createElement("h3");
    //class name
        if(items == ""){
                h3.innerHTML = "Thing Being Judged";
             }else{
                 h3.innerHTML = items;
             }    
        
    let form = document.createElement("form");
        form.className = "starForm";
        
    let input5 = document.createElement("input");
        input5.className ="star star-5";  
        input5.type="radio"; 
        input5.name="starList"; 
        input5.value = "5";
    let label5 = document.createElement("label");
        label5.className ="star star-5";  
        label5.type="radio"; 
        label5.name="starList"; 
        label5.value = "5";
    let input4 = document.createElement("input");
        input4.className ="star star-4";  
        input4.type="radio"; 
        input4.name="starList"; 
        input4.value = "4";
    let label4 = document.createElement("label");
        label4.className ="star star-4";  
        label4.type="radio"; 
        label4.name="starList"; 
        label4.value = "4";
    let input3 = document.createElement("input");
        input3.className ="star star-3";  
        input3.type="radio"; 
        input3.name="starList"; 
        input3.value = "3";
    let label3 = document.createElement("label");
        label3.className ="star star-3";  
        label3.type="radio"; 
        label3.name="starList"; 
        label3.value = "3";
    let input2 = document.createElement("input");
        input2.className ="star star-2";  
        input2.type="radio"; 
        input2.name="starList"; 
        input2.value = "2";
    let label2 = document.createElement("label");
        label2.className ="star star-2";  
        label2.type="radio"; 
        label2.name="starList"; 
        label2.value = "2";
    let input1 = document.createElement("input");
        input1.className ="star star-1";  
        input1.type="radio"; 
        input1.name="starList"; 
        input1.value = "1";
    let label1 = document.createElement("label");
        label1.className ="star star-1";  
        label1.type="radio"; 
        label1.name="starList"; 
        label1.value = "1";
        
    form.appendChild(input5);
    form.appendChild(label5);
    form.appendChild(input4);
    form.appendChild(label4);
    form.appendChild(input3);
    form.appendChild(label3);
    form.appendChild(input2);
    form.appendChild(label2);
    form.appendChild(input1);
    form.appendChild(label1);
        
        //let stars = createStars();
        //console.log(form);
        //setRating(form,rating)
        div.appendChild(h3);
        div.appendChild(a1);
        div.appendChild(setRating(form,rating));
    
        //console.log(rating);
        
    ul.appendChild(li);
    a1.appendChild(itemImg);
    li.appendChild(div);
    
    //div.appendChild(p1);
    })
}
function addEvents(){
    saveButton.addEventListener("touchend", saveReview);
    cancelButton.addEventListener("touchend", clearForm);
    cancelButton2.addEventListener("touchend", cancelBtn);
    pictureButton.addEventListener("touchend", takePicture);
    deleteButton.addEventListener("touchend", deleteReviews);
    
    document.querySelector(".btn-positive").style.display="block";
    document.getElementById("imgHolder").classList.add("hidden");
    document.getElementById("theFirstStars").classList.add("hidden");
    console.log("added");
}
function clearForm(){
    document.querySelector(".btn-positive").style.display="block";
    document.getElementById("imgHolder").classList.add("hidden");
    document.getElementById("theFirstStars").classList.add("hidden");
    
    document.getElementById("itemName").value = "";
    img.src="";
    clearStars();
}
function takePicture(){
var options = {
  quality: 80,
  destinationType: Camera.DestinationType.FILE_URI,
  encodingType: Camera.EncodingType.PNG,
  mediaType: Camera.MediaType.PICTURE,
  pictureSourceType: Camera.PictureSourceType.CAMERA,
  allowEdit: true,
  targetWidth: 300,
  targetHeight: 300,
  saveToPhotoAlbum: true
}

    navigator.camera.getPicture( onSuccess, onFail, options );
    
    
}
function onSuccess(imageURI) {
    
    img.src = imageURI;
    
  
    document.getElementById("theFirstStars").classList.remove("hidden");
    document.querySelector(".btn-positive").style.display="none";
    img.classList.remove("hidden");
    
}
function onFail(message) {
    alert('Failed because: ' + message);
}
function clearStars(){

var stars = document.getElementsByName("star");
    for(var i = 0; i < stars.length; i++){
        stars[i].checked = false;
    }    
}

function setRating(stars, rating){
    let starList = stars.querySelectorAll('input[name="starList"]');
//stars.querySelectorAll('input[name="starList"]').forEach(function(star, index){    
//    if(rating == star.value){
//        console.log(star)
//        star.checked = true;
//      //star.setAttribute("checked","checked");
//        console.log(star)
//    }
 // });
for(var i = 0; i < starList.length; i++){
       console.log(starList[i]);
    
    if(rating == starList[i].value){
        starList[i].checked = true;
    }
    }    
    //console.log(stars);
    return stars;
}
function cancelBtn(){
    clearForm();
    img.src="";
    hideModal();
}
function hideModal(){
    let addModal = document.querySelector("#addModal");
        addModal.classList.toggle("active");
    console.log("hidden");
}
function hideDeleteModal(){
    let deleteModal = document.querySelector("#deleteModal");
        deleteModal.classList.toggle("active");
    console.log("hidden")
}

function getStarId(ev){
    //ev.preventDefault();
    
    let a = ev.currentTarget;
    let div = a.parentElement;
    let starId = div.parentElement.getAttribute("data-id");
    
    console.log(starId);
    currentId = starId;
}

function deleteReviews(){
    let index = -1;
    
    let reviews = itemList.reviews;
    let ul = document.getElementById("reviewList");
    let li = document.querySelector("[data-id='"+currentId+"']")
    console.log(li);
    
    for(var i = 0; i < reviews.length; i++){
        //console.log(peeps[i].id.toString());
         if(currentId == reviews[i].id){
            index = i;
             break;
        }
    };
   console.log(index);
    if(index > -1){
        reviews.splice(index, 1);
        
    };
    console.log(localStorage);
    if(reviews.length > -1){
        localStorage.setItem(key, JSON.stringify(itemList));
        console.log("i did it");
   }
    console.log(localStorage);
       if(li.getAttribute("data-id") == currentId){
           console.log("i made it here");
           ul.removeChild(li);
       }
    
    showReviews();
    clearForm();
    hideDeleteModal();
}

function reviewToDelete(ev){
    
    let deleteThisReview = document.getElementById("imgToDelete");
    let starList = document.querySelectorAll('input[name="starList2"]');
    console.log(starList);
    let index = -1;
    
    let reviews = itemList.reviews;
    console.log(reviews);
    for(var i = 0; i < reviews.length; i++){
        
         if(currentId == reviews[i].id){
            deleteThisReview.src = reviews[i].img;
             index = reviews[i].rating;
         }
    }
    for(var i = 0; i < starList.length; i++){
       console.log(starList[i]);
    
    if(index == starList[i].value){
        starList[i].checked = true;
    }
    } 
     
}



//declare viarable
let findButton = document.querySelectorAll("#findButton")
let clearButton = document.querySelector("#findButton")
let content = document.querySelector(".content")
let search = document.getElementById("searchValue")
let notify = document.querySelector(".notify")
let discover = document.querySelector("#discover")
let discoverCard = document.querySelector(".discoverCard")
let viewButton = document.getElementById("views")
const arrayIndex = [] // store the index of data but duplicated
const unique =[] //store new index without duplicated
//Find button function
findButton.forEach((findButton)=>{
    findButton.addEventListener("click", event=>
    {
        discoverCard.style.display ="none" 
        content.style.display = "grid"
        //fetchData(search.value.toLowerCase())
        if(search.value ===""){
            fetchData()
        }
        else{
            fetchData("resortName",search.value.toLowerCase())
        }
    })
    findButton.addEventListener("mouseleave", event=>{
    })
})

//clear input function
search.onfocus=()=> {search.value ="";}
search.addEventListener("click", event=>{displayDiscover()})

//fetching data and create card function
async function fetchData(key, resortName){
    const endpoint = resortName   //const endpoint 
    const url =  `https://der-lg-api.vercel.app/province?${key}=${endpoint}`
    const response = await fetch(url)
    console.log(url)
    const data = await response.json()
     data.forEach((value,index)=>{
        const {indexNumber,landscape, type,provinceName,location,averagecost,travelTime,travelDistance} = value //destructuring from data
        const card = document.createElement("div")  //create card div
        card.className ="card"  //class name of card
        content.appendChild(card) //append to parent element
        //create detail inside card
        card.innerHTML =   `
                             <div class ="insideCard"></div>
                                <div class ="cardDetail">
                                            <h4>${type}</h4>
                                            <h4>${provinceName}</h4>
                                            <i id ="heart" class="fa-solid fa-heart"></i>
                                </div>    
                                <div class ="distance">
                                            <i class="fa-regular fa-map"><span class ="distanceText">${location}</span></i>
                                            <i class="fa-solid fa-sack-dollar"><span class ="distanceText">Average spend per day ${averagecost}$</span></i>
                                            <i class="fa-solid fa-car"><span class ="distanceText">Travel Distance ${travelDistance} <sup>km</sup></span></i>
                                            <i class="fa-regular fa-clock"><span class ="distanceText">Travel Time ${travelTime}</span></i>
                                 </div> 
                              <button class ="discover"><span>Discover More</span></button> `

        //view button function                    
        let insideCard = document.querySelectorAll(".insideCard") //select all insideCard 
        let imageNumber = 0 //initilize index of image
        const img = document.createElement("img")  //create image element 
        img.className ="indexImage" //add image class
        insideCard.forEach((value)=>{
            img.src = landscape[imageNumber]
            value.appendChild(img)
        })
        viewButton.addEventListener("click", event=>{
            imageNumber++
            if(imageNumber>2){imageNumber = 0;img.src =landscape[imageNumber] }
            else{ img.src =landscape[imageNumber]}
        })

        //heart function inside card
        let i = 0;
        let heart = document.querySelectorAll("#heart")
        heart.forEach((value,index)=>{
            value.addEventListener("click", event=>{
                i++

                if(i==1){
                        value.style.color ="red";
                        notify.style.display ="flex"
                        setTimeout(()=>{
                            notify.style.display ="none"
                        },3000)
                        }
                if(i>1){ value.style.color ="",i=0}
            })
        }) 
        //
        card.addEventListener("click", event=>{ //testing
                card.setAttribute("id", `${indexNumber}`)
                const cardId = card.getAttribute("id")
                arrayIndex.push(cardId)
                arrayIndex.forEach((value)=>{if(!unique.includes(value)){ unique.push(value)}})
        })
    })

}

//discover function
function displayDiscover(){
    content.innerHTML = ``
    discoverCard.style.display ="grid"
    discoverCard.style.marginLeft =""
    filterBox.classList.remove("filterBox")
}
//favorite function
function displayFavorite(){
    content.innerHTML = ``
    discoverCard.style.display ="none"
    unique.forEach((value)=>{fetchData("id",value)})
}
//show the data of discover
function discoverData(key,value){
    content.style.display = "grid"
    discoverCard.style.display ="none"
    fetchData(key,value)
}
function filter(){
    alert("Filter Still Fixing Thank You ")
}


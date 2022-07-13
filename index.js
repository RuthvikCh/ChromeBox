let myLeads = []
let myTitles =[]
const inputEl = document.getElementById("input-el")
const inputElti = document.getElementById("input-elti")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const singledeleteBtn = document.getElementById("singledelete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const titlesFromLocalStorage = JSON.parse(localStorage.getItem("myTitles"))

const tabBtn = document.getElementById("tab-btn")

if (leadsFromLocalStorage && titlesFromLocalStorage ) {
    myLeads = leadsFromLocalStorage
    myTitles = titlesFromLocalStorage
    render(myLeads,myTitles)
}


tabBtn.addEventListener("click", function(){ 
//    console.log("Clickedd")  
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        myTitles.push(tabs[0].title)
        //console.log(myTitles)
        //console.log(JSON.stringify(myTitles))

        //console.log(myLeads)
        //console.log(JSON.stringify(myLeads))
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        localStorage.setItem("myTitles", JSON.stringify(myTitles) )
        render(myLeads,myTitles)
    })
})


function render(leads,Titles) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li class='list-group-item'>
                <a class="iname" target='_blank' href='${leads[i]}'>
                    ${Titles[i]}
                </a>
                <button id='singledelete-btn' class="delbtn btn btn-dark" onClick="singledelfunc(\'${Titles[i]}\')">
                <i class="bi bi-trash3"></i>
                </button>
                
            </li>
        `
    }
    ulEl.innerHTML = listItems
}



deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    myTitles= []
    render(myLeads,myTitles)
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    myTitles.push(inputElti.value)
    inputEl.value = ""
    inputElti.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    localStorage.setItem("myTitles", JSON.stringify(myTitles) )
    render(myLeads,myTitles)
})

function singledelfunc(item) {
   // console.log("clicked")
    var index = myTitles.indexOf(item)
   // console.log("Hello :" + index )
    if (index !== -1) {
        myTitles.splice(index, 1)
        myLeads.splice(index, 1)
    }
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    localStorage.setItem("myTitles", JSON.stringify(myTitles) )
    render(myLeads,myTitles)
}

const list = document.querySelectorAll(".item");
let changeList = Object.keys(list).map(function (key) {
    return list[key];
})

document.querySelector(".next").addEventListener("click", () => {
    let list = document.querySelectorAll(".item");
    let changeList = Object.keys(list).map(function (key) {
        return list[key];
    })

    let slider = document.querySelector("#slider");

    slider.appendChild(changeList[0])
})

document.querySelector(".prev").addEventListener("click", () => {
    let list = document.querySelectorAll(".item");
    let changeList = Object.keys(list).map(function (key) {
        return list[key];
    })

    let slider = document.querySelector("#slider");

    slider.prepend(changeList[changeList.length -1])
})
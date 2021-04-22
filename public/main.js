console.log("Welcome to covid resource !");

const city = document.querySelector("#city");
const generateLink = document.querySelector("#linkGenerate");
const checkVerify = document.querySelector("#verify");
const unverifyTweets = document.querySelector("#unverify");

checkVerify.addEventListener("click", () => {
    if (checkVerify.checked) {
        alert("Keep this unchecked for small cities !");
    }
})

// Link generation

const generationContainer = document.querySelector(".contain");

// Multiselect Logic !
function btnToggle() {
    document.getElementById("Dropdown").classList.toggle("show");
}

// Prevents menu from closing when clicked inside
document.getElementById("Dropdown").addEventListener('click', function (event) {
    // alert("click outside");
    event.stopPropagation();
});

// Closes the menu in the event of outside click
window.onclick = function (event) {
    if (!event.target.matches('.dropbutton')) {

        var dropdowns =
            document.getElementsByClassName("dropdownmenu-content");

        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

// Items collection !
const items = [];

function itemclick(i) {
    items.push(i);

    console.log("Items :", items);
}

// Generate Item url !

function generateItemURL(items) {
    let url = "(";

    for (let i = 0; i < items.length; i++) {
        url += items[i];
        url += "+OR+"
    }

    url += ")";

    return url.replace(/OR\s$/g, "");
}

function addVerify() {
    let option;


    if (checkVerify.checked) {
        option = "verified+";
    } else {
        option = "";
    }

    console.log("Option : ", option);


    return option;
}

function unverifyURL() {
    let option = "";

    if (unverifyTweets.checked) {
        option += `+-`;
        option += '"not+verified"';
        option += "+-";
        option += '"unverified"';
    } else {
        option = "";
    }

    return option;
}

// CSS list

const itemsList = document.querySelector("#list");
const showList = document.querySelector(".show");
const showList2 = document.querySelector(".show-2");



// https://twitter.com/search?q=verified+Mumbai+%28bed+OR+beds+OR+icu+OR+oxygen+OR+ventilator+OR+ventilators+OR+fabiflu+OR+remdesivir%29+-%22not+verified%22+-%22unverified%22+-%22needed%22+-%22required%22&f=live

generateLink.addEventListener("click", () => {

    if (city.value === "") {
        alert("Please Enter City Name !");
    } else {
        if (document.querySelector("#other_item").value != "") {
            items.push(document.querySelector("#other_item").value);
        }

        console.log("Item URL : ", generateItemURL(items));
        let url = "https://twitter.com/search?q=";
        url += addVerify();
        url += city.value.replace(/\s/g, "") + "+";
        url += generateItemURL(items);
        url += unverifyURL();
        url += "&f=live"
        console.log(url);

        showList2.style.display = "none";
        showList.style.display = "none";
        document.querySelector(".page").classList.toggle("active");
        generationContainer.classList.toggle("active");

        document.querySelector("#twitter_link").value = url;
    }

});

document.querySelector("#back").addEventListener("click", () => {
    document.querySelector(".page").classList.toggle("active");
    generationContainer.classList.toggle("active");

    location.reload();
})

// Vist Twitter Page

document.querySelector("#button").addEventListener("click", () => {
    window.open(document.querySelector("#twitter_link").value);
})


showList.addEventListener("click", () => {
    itemsList.classList.toggle("active");
    document.querySelector(".page").classList.toggle("active");
});

showList2.addEventListener("click", () => {
    itemsList.classList.toggle("active");
    document.querySelector(".page").classList.toggle("active");
});


function showItem() {

    document.querySelector("#number").innerText = items.length;
    document.querySelector("#number-2").innerText = items.length;
    let html = "";

    for (let i = 0; i < items.length; i++) {
        html += `<li>${items[i]}</li>`;
    }

    itemsList.innerHTML = html;
}
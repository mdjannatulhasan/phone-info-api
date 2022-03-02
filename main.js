// Initializing variables with elements from HTML

const searchBtn = document.getElementById('search');
const searchBox = document.getElementById('searchBox');
const spinner = document.getElementById('spinnerContainer');
const resultBox = document.getElementById('resultContainer');
const phoneDetailsBox = document.getElementById('phoneDetails');
let showAll = document.getElementById('showAll');


let searchText = '';
let resultData;


/**
 * Function for calling Search API
 */
const callSearchApi = () => {
    searchText = searchBox.value;

    //If user gives empty value for search
    if (searchText != '') {
        let phoneList = fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
            .then(res => res.json())
            .then(data => printResult(data.data));
        spinner.classList.toggle('d-none');
        clearResultBox();
        phoneDetailsBox.innerHTML = '';
    } else {
        clearResultBox();
        phoneDetailsBox.innerHTML = '';
        const h4 = document.createElement('h4');
        h4.classList.add('text-center');
        h4.classList.add('text-danger');
        h4.innerHTML = `Please enter phone name`;
        resultBox.appendChild(h4);
        showAll.classList.add('d-none');
    }
}

/**
 * Function for printing result inside HTML
 */
const printResult = result => {
    const h4 = document.createElement('h4');
    h4.innerHTML = `Here is your search result for "${searchText}":`;

    showAll.classList.add('d-none');
    searchBox.value = '';

    //If no phone found
    if (result.length == 0) {
        h4.innerHTML = `No phone found`;
        resultBox.appendChild(h4);
        spinner.classList.toggle('d-none');
        return;
    }
    resultData = result;

    resultBox.appendChild(h4);
    let count = 0;
    for (const item of result) {
        if (count >= 20) {
            showAll.classList.toggle('d-none');
            break;
        }

        singleColumn(item);
        count++;
    };
    spinner.classList.toggle('d-none');
}

/**
 * Function for creating single phone card
 */
const singleColumn = item => {
    //Single column containing single item from search response
    const div = document.createElement('div');
    div.classList.add('col-lg-4');
    div.classList.add('col-12');
    div.innerHTML = `
    <div class="card w-full text-center p-3 bg-light pt-4">
        <img src="${item.image}" class="mx-auto card-img-top" alt="${item.phone_name}">
        <div class="card-body">
            <h5 class="card-title">${item.phone_name}</h5>
            <p class="card-text"><strong>Brand:</strong> ${item.brand}</p>
            <a href="#" onclick="detailsBox('${item.slug}')" class="btn btn-primary">Details</a>
        </div>
    </div>
    `;
    resultBox.appendChild(div);
};

/**
 * Function for clearing Result Container
 */
const clearResultBox = () => {
    resultBox.innerHTML = '';
}


/**
 * Function for details box creation
 */
const detailsBox = phone => {
    const phoneDetails = fetch(`https://openapi.programming-hero.com/api/phone/${phone}`)
        .then(res => res.json())
        .then(singledData => detailsTable(singledData.data));
}

/**
 * Function for Creating table with data
 */
const detailsTable = phoneInfo => {
    phoneDetailsBox.innerHTML = '';
    const box = document.createElement('div');
    box.classList.add('phone-details');
    let releaseDate = phoneInfo.releaseDate;
    if (releaseDate == '') {
        releaseDate = 'No release date yet';
    }
    let sensors = (phoneInfo.mainFeatures.sensors).map(element => ' ' + element.charAt(0).toUpperCase() + element.slice(1));
    let sensors2 = sensors.toString();
    box.innerHTML = `
    <div class="info-body" id="infoBody">

        <div class="row">
            <div class="col-12 d-flex flex-column align-items-center justify-content-center border-end-0">
                <img class="mt-3" src="${phoneInfo.image}" alt="${phoneInfo.name}">
                <h4 class="mt-4 title">${phoneInfo.name}</h4>
                <p><span class="col-title">Release Date: </span> ${releaseDate}</p>
            </div>
        </div>
        <div class="row">
            <div class="col-4 col-title">
                Brand
            </div>
            <div class="col-8">${phoneInfo.brand}</div>
        </div>
        <div class="row">
            <div class="col-12 col-title">
                Main Features
            </div>
        </div>
        <div class="row">
            <div class="col-4 col-title">Chipset</div>
            <div class="col-8">${phoneInfo.mainFeatures.chipSet}</div>
        </div>

        <div class="row">
            <div class="col-4 col-title">
                Display Size
            </div>
            <div class="col-8">${phoneInfo.mainFeatures.displaySize}</div>
        </div>
        <div class="row">
            <div class="col-4 col-title">
                Memory
            </div>
            <div class="col-8">${phoneInfo.mainFeatures.memory}</div>
        </div>
        <div class="row">
            <div class="col-4 col-title">
                Sensors
            </div>
            <div class="col-8">
            ${sensors2}
            </div >
        </div >
        <div class="row">
            <div class="col-4 col-title">
                Storage
            </div>
            <div class="col-8">${phoneInfo.mainFeatures.storage}</div>
        </div>
    </div >
    `;

    phoneDetailsBox.appendChild(box);
    if (phoneInfo.hasOwnProperty('others')) {

        const othersDiv = document.createElement('div');
        othersDiv.innerHTML = `
        <div class="row">
            <div class="col-12 col-title">
                Others
            </div>
        </div>
        <div class="row">
            <div class="col-4 col-title">Bluetooth</div>
            <div class="col-8">${phoneInfo.others.Bluetooth}</div>
        </div>
        <div class="row">
            <div class="col-4 col-title">GPS</div>
            <div class="col-8">${phoneInfo.others.GPS}</div>
        </div>
        <div class="row">
            <div class="col-4 col-title">NFC</div>
            <div class="col-8">${phoneInfo.others.NFC}</div>
        </div>
        <div class="row">
            <div class="col-4 col-title">Radio</div>
            <div class="col-8">${phoneInfo.others.Radio}</div>
        </div>
        <div class="row">
            <div class="col-4 col-title">USB</div>
            <div class="col-8">${phoneInfo.others.USB}</div>
        </div>
        <div class="row">
            <div class="col-4 col-title">WLAN</div>
            <div class="col-8">${phoneInfo.others.WLAN}</div>
        </div>
        `;
        document.getElementById('infoBody').appendChild(othersDiv);
    }
    console.log(phoneInfo);
}

/**
 * Function for Creating all listed phone
 */
const displayFullItemList = () => {
    let count = 0;

    for (const item of resultData) {
        if (count < 20) {

            count++;
            continue;
        }
        singleColumn(item);

    };
    showAll.classList.toggle('d-none');
}
searchBtn.addEventListener('click', callSearchApi);
showAll.addEventListener('click', displayFullItemList);
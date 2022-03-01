// Initializing variables with elements from HTML

const searchBtn = document.getElementById('search');
const searchBox = document.getElementById('searchBox');
const spinner = document.getElementById('spinnerContainer');
const resultBox = document.getElementById('resultContainer');


let searchText = '';

/**
 * Function for clearing Result Container
 */
const clearResultBox = () =>{
    resultBox.innerHTML = '';
}


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
    } else {
        resultBox.innerHTML = '';
        const h4 = document.createElement('h4');
        h4.classList.add('text-center');
        h4.classList.add('text-danger');
        h4.innerHTML = `Please enter phone name`;
        clearResultBox();
    }
}

/**
 * Function for printing result inside HTML
 */
const printResult = result => {
    const h4 = document.createElement('h4');
    h4.innerHTML = `Here is your search result for "${searchText}"`;

    //If no phone found
    if (result.length == 0) {
        h4.innerHTML = `No phone found`;
        resultBox.appendChild(h4);
        spinner.classList.toggle('d-none');
        return;
    }
    console.log(result);
    searchBox.value = '';

    resultBox.appendChild(h4);
    let count = 0;
    for (const item of result) {
        if (count >= 20) {
            const btn = document.createElement('button');
            btn.classList.add('btn');
            btn.classList.add('btn-success');
            btn.classList.add('mt-5');
            btn.setAttribute('id', 'showMore')
            btn.innerHTML = 'Show All'
            resultBox.appendChild(btn);
            break;

        }

        //Single column containing single item from search response
        const div = document.createElement('div');
        div.classList.add('col-lg-4');
        div.classList.add('col-12');
        div.innerHTML = `
        <div class="card w-full">
            <img src="${item.image}" class="card-img-top" alt="${item.phone_name}">
            <div class="card-body">
                <h5 class="card-title">${item.phone_name}</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="btn btn-primary">Details</a>
            </div>
        </div>
        `;
        resultBox.appendChild(div);
        count++;
    };
    spinner.classList.toggle('d-none');
}
searchBtn.addEventListener('click', callSearchApi);
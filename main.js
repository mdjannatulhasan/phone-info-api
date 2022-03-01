const searchBtn = document.getElementById('search');
const searchBox = document.getElementById('searchBox');
const resultBox = document.getElementById('resultContainer');
let searchText = '';

const callApi = () =>{
    searchText = searchBox.value;
    // const searchText = 'iphone';
    let phoneList = fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
                        .then(res => res.json())
                        .then(data =>printResult(data.data));
}
const printResult = result => {
    console.log(result);
    resultBox.innerHTML = '';
    searchBox.value = '';
    const h4 = document.createElement('h4');
    h4.innerHTML = `Here is your search result for "${searchText}"`;
    resultBox.appendChild(h4);
    let count = 0;
    for(const item of result) {
        if(count >= 20){
            const btn = document.createElement('button');
            btn.classList.add('btn');
            btn.classList.add('btn-success');
            btn.classList.add('mt-5');
            btn.setAttribute('id','showMore')
            btn.innerHTML = 'Show All'
            resultBox.appendChild(btn);
            break;

        }
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
}
searchBtn.addEventListener('click', callApi);
const searchBtn = document.getElementById('search');
const searchBox = document.getElementById('searchBox');
const resultBox = document.getElementById('resultContainer');


const callApi = () =>{
    // const searchText = searchBox.value;
    const searchText = 'iphone';
    let phoneList = fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
                        .then(res => res.json())
                        .then(data =>printResult(data.data));
}
const printResult = result => {
    console.log(result);
    result.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('col-lg-4');
        div.classList.add('col-12');
        div.innerHTML = `
        <div class="card w-full">
            <img src="${item.image}" class="card-img-top" alt="${item.phone_name}">
            <div class="card-body">
                <h5 class="card-title">${item.phone_name}</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
        `;
        resultBox.appendChild(div);
    });
}
searchBtn.addEventListener('click', callApi);
const searchBtn = document.getElementById('search');
const searchBox = document.getElementById('searchBox');


const callApi = () =>{
    const searchText = searchBox.value;
    let phoneList = fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
                        .then(res => res.json())
                        .then(data =>printResult(data.data));
}
const printResult = result => {
    console.log(result);
}
searchBtn.addEventListener('click', callApi);
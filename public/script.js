const input = document.querySelector('input');
const form = document.querySelector('form');
const div = document.querySelector('.data');

form.addEventListener('submit', handleForm);
function handleForm(e) {
    e.preventDefault();
    div.innerHTML = "<div class='sub-heading'>Loading data....</div>";
    const search = input.value;
    const url = `/weather?search=${search}`;
    fetch(url)
        .then((res) => res.json())
        .then((res) => showData(res))
}
function showData(data) {
    
    if (data.error) {
        div.innerHTML = `<div class="sub-heading">${data.error}</div>`;
    } else {
        div.innerHTML = `<div class="sub-heading"><div class= "blue">${data.place}</div></div>
        <div>Observation time: <div class= "blue">${data.time}</div></div>
        <div>Temperature : <div class= "blue">${data.temp}</div></div>
        <div>Weather Description: <div class="blue"> ${data.weather_details}</div></div>`
    }

}
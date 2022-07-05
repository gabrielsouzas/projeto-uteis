const form = document.querySelector('.form');

const locationName = document.querySelector('.card-location-name');
const locationInfo = document.querySelector('.card-location-info');
const temperatureValue = document.querySelector('.card-temperature-value');
const imgIcon = document.querySelector('.card-img-icon');
const imgText = document.querySelector('.card-img-text');

const cityInput = document.querySelector('.city');

// Chave para usar a API
const KEY = 'e7129dfcf5e645d5991174633222406';

/* Dados iniciais */
const initialData = {
    location: {
      name: '-',
      region: '-',
      country: '-',
    },
    current: {
      temp_c: 0,
      condition: {
        text: '-',
        icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
      },
    },
  };

// Array para armazenar o retorno da API
var data = initialData;

// Essa função assincrona vai retornar uma promise, que é uma promessa do retorno,
// ou seja, ela vai ficar aguardando o retorno dos dados
const fetchData = async () => {
  const url = `https://api.weatherapi.com/v1/current.json?key=${KEY}&q=${cityInput.value}&aqi=no`;

  /* Aqui a função fetch do JavasScript pega o retorno da chamada da url da API Weather */
  const fetchResponse = await fetch(url);
  /* Pega o retorno apenas do objeto JSON da API */
  const data = await fetchResponse.json();

  return data;
};

/* Evento clique do Pesquisar */
const handleSubmit = (event) => {
    event.preventDefault();

    // O THEN vai esperar a execução da função
    // abaixo que vem de services/api por causa da promise da API
    // Depois ele executa uma função anonima
    fetchData().then((response) => {
    fillInFields(response);
    });
};

const fillInFields = (data) => {
  locationName.innerHTML = data.location.name;
  locationInfo.innerHTML = `${data.location.region}, ${data.location.country}`;
  temperatureValue.innerHTML = data.current.temp_c
  imgText.innerHTML = data.current.condition.text
  imgIcon.setAttribute('src', data.current.condition.icon);
}

form.addEventListener('submit', handleSubmit);

const load = () => {
    fillInFields(data);
};

load();

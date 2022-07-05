const form = document.querySelector('.form');

const locationName = document.querySelector('.card-location-name');
const locationInfo = document.querySelector('.card-location-info');
const temperatureValue = document.querySelector('.card-temperature-value');
const imgIcon = document.querySelector('.card-img-icon');
const imgText = document.querySelector('.card-img-text');

// Código para usar a API
const KEY = 'e7129dfcf5e645d5991174633222406';

// Uso do useState do Hooks (Dica: Use sempre o Hooks no inicio do código, nunca no meio)
/* city: variavel, setCity: função de set da variavel
Explicando: O useState vai armazenar a variavel city através do método setCity */
var city = 'Assis';

/* Dados iniciais */
const initialData = {
    location: {
      name: 'Assis',
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

// useState para armazenar o retorno da API
var data = initialData;

/* Dados da API */

// Essa função assincrona vai retornar uma promise, que é uma promessa do retorno,
// ou seja, ela vai ficar aguardando o retorno dos dados
const fetchData = async (city) => {
  const url = `https://api.weatherapi.com/v1/current.json?key=${KEY}&q=${city}&aqi=no`;

  /* Aqui a função fetch do JavasScript pega o retorno da chamada da url da API Weather */
  const fetchResponse = await fetch(url);
  /* Pega o retorno apenas do objeto JSON da API */
  const data = await fetchResponse.json();

  return data;
};

/* Evento clique do Pesquisar */
const handleSubmit = (event) => {
    event.preventDefault();

    city = locationName.innerHTML;
    // O THEN vai esperar a execução da função
    // abaixo que vem de services/api por causa da promise da API
    // Depois ele executa uma função anonima pasando a resposta da API e setando no useState data
    fetchData(city).then((response) => {
    data = response;
    locationName.innerHTML = data.location.name;
    locationInfo.innerHTML = `${data.location.region}, ${data.location.country}`;
    temperatureValue.innerHTML = data.current.temp_c
    imgText.innerHTML = data.current.condition.text
    imgIcon.setAttribute('src', data.current.condition.icon);
    });
};

form.addEventListener('submit', handleSubmit);

const load = () => {
  city = 'Assis';
  fetchData(city).then((response) => {
   data = response; 
  
  locationName.innerHTML = data.location.name;
    locationInfo.innerHTML = `${data.location.region}, ${data.location.country}`;
    temperatureValue.innerHTML = data.current.temp_c
    imgText.innerHTML = data.current.condition.text
    imgIcon.setAttribute('src', data.current.condition.icon);
  });

};

load();

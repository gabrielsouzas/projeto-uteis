const KEY = 'e7129dfcf5e645d5991174633222406';

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

export default fetchData;

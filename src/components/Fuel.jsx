import React, { useState, useEffect } from 'react';
import '../components/Fuel.css'
import ButtonFuel from './ButtonFuel'

const Fuel = () => {
  // Define a state variable for the fuel prices data
  const [fuelData, setFuelData] = useState([]);
  const [TipoCombustivel, setTipoCombustivel] = useState('2105')

  // Use the useEffect hook to make the HTTP request when the component is rendered
  useEffect(() => {
    const getFuelPrices = async () => {
      try {
        // Make the HTTP request
        const response = await fetch(`https://precoscombustiveis.dgeg.gov.pt/api/PrecoComb/PesquisarPostos?idsTiposComb=${TipoCombustivel}&idMarca=&idTipoPosto=&idDistrito=&idsMunicipios=229&qtdPorPagina=50&pagina=1`);
        const data = await response.json();

        // Update the state variable with the retrieved data
        setFuelData(data.resultado);
      } catch (err) {
        // Handle any errors
        console.error(err);
      }
    }

    getFuelPrices();
  }, [TipoCombustivel]); // The empty array as the second argument tells the hook to only run the effect when the component is first rendered

  const limitedData = fuelData.slice(0, 5);

  return (
    <div className="container-lg ct">
        <div className="row text-center">
            <div className="col-lg-12">
                <h1>Preço Gasolina Simples Mais Barata do Seixal</h1>
            </div>
        </div>
        <div className="row text-center rl">
            <div className="col-lg-3">
                <ul className='my-ul'>
                    <li className="tit">Nome</li>
                  {limitedData.map(name => (
                    <li key={name.Id}>
                      {name.Nome}
                    </li>
                  ))}
                </ul>
            </div>
            <div className="col-lg-3">
                <ul>
                    <li className='tit'>Preço</li>
                    {limitedData.map(price => (
                    <li key={price.Id}>
                      {price.Preco}
                    </li>
                  ))}
                </ul>
            </div>
            <div className="col-lg-3">
                <ul>
                    <li className='tit'>Tipo</li>
                    {limitedData.map(tipo => (
                    <li key={tipo.Id}>
                      {tipo.Combustivel}
                    </li>
                  ))}
                </ul>
            </div>
            <div className="col-lg-3">
                <ul>
                    <li className='tit'>Google Maps</li>
                    {limitedData.map(local => (
                    <a href={`https://maps.google.com/?q=${local.Latitude},${local.Longitude}`}><li key={local.Id}>
                      Localização
                    </li></a>
                  ))}
                </ul>
            </div>
        </div>
        <div className="row text-center justify-content-center rbtn">
            <div className="col-lg-2">
                <ButtonFuel text="Gasolina Simples" onClick={() => setTipoCombustivel('3201')}/>
            </div>
            <div className="col-lg-2">
                <ButtonFuel  text="Gasoleo Simples" onClick={() => setTipoCombustivel('2101')}/>
            </div>
            <div className="col-lg-2">
                <ButtonFuel  text="Gasoleo Aditivado" onClick={() => setTipoCombustivel('2105')}/>
            </div>
        </div>
    </div>
  )
}

export default Fuel

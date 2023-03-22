import React, { useState, useEffect, useRef } from 'react';
import '../components/Fuel.css'
import ButtonFuel from './ButtonFuel'

const Fuel = () => {
  const munOptionsRef = useRef();
  const [fuelData, setFuelData] = useState([]);
  const [TipoCombustivel, setTipoCombustivel] = useState('2105')
  const [Municipios, setMunicipios] = useState('229')
  const [MunicipioNome, setMunicipioNome] = useState('Seixal')

  // Use the useEffect hook to make the HTTP request when the component is rendered
  useEffect(() => {
    const getFuelPrices = async () => {
      try {
        // Make the HTTP request
        const response = await fetch(`https://precoscombustiveis.dgeg.gov.pt/api/PrecoComb/PesquisarPostos?idsTiposComb=${TipoCombustivel}&idMarca=&idTipoPosto=&idDistrito=&idsMunicipios=${Municipios}&qtdPorPagina=50&pagina=1`);
        const data = await response.json();

        // Update the state variable with the retrieved data
        setFuelData(data.resultado);
      } catch (err) {
        // Handle any errors
        console.error(err);
      }
    }

    getFuelPrices();
  }, [TipoCombustivel, Municipios]); // The empty array as the second argument tells the hook to only run the effect when the component is first rendered

  const limitedData = fuelData.slice(0, 5);

  //Lógic of Municipios
  const MunicipiosFunc = () => {
    if (munOptionsRef.current.value === 'Almada') {
      setMunicipios('222')
      setMunicipioNome('Almada')
    } else if (munOptionsRef.current.value === 'Sesimbra') {
      setMunicipios('230')
      setMunicipioNome('Sesimbra')
    } else if (munOptionsRef.current.value === 'Seixal') {
      setMunicipios('229')
      setMunicipioNome('Seixal')
    } else if (munOptionsRef.current.value === 'Grândola') {
      setMunicipios('224')
      setMunicipioNome('Grândola')
    } 
  }

  //Linkedin and Github Buttons

  const linkedinFunc = () => {
     window.open('https://pt.linkedin.com/in/iuri-peniche-29337a183', '_blank');
  }

  const githubFunc = () => {
     window.open('https://github.com/dreazz97', '_blank');
  }
  

  return (
    <div className="container-lg ct">
      <div className="row r_select">
        <div className="col-lg-2 col-4 text-start">
          <select ref={munOptionsRef} className='form-select' onChange={MunicipiosFunc}>
            <option>Seixal</option>
            <option>Almada</option>
            <option>Sesimbra</option>
            <option>Grândola</option>
          </select>
          </div>
        <div className="col-lg-10 col-8 d-flex justify-content-end">
          <img className='images-social linkedin' src="/combustiveis-react/images/linkedin.png" alt='linkedin' onClick={linkedinFunc} />
          <img className='images-social' src="/combustiveis-react/images/github.png" alt='github' onClick={githubFunc} />
        </div>
        </div>
        <div className="row text-center">
            <div className="col-lg-12">
                <h1>Preço do Combustível Mais Barato de {MunicipioNome}</h1>
            </div>
        </div>
        <div className="row text-center rl">
            <div className="col-lg-3 col-12 cols-ul">
                <ul className='my-ul'>
                    <li className="tit">Nome</li>
                  {limitedData.map(name => (
                    <li key={name.Id}>
                      {name.Nome}
                    </li>
                  ))}
                </ul>
            </div>
            <div className="col-lg-3 col-12 cols-ul">
                <ul>
                    <li className='tit'>Preço</li>
                    {limitedData.map(price => (
                    <li key={price.Id}>
                      {price.Preco}
                    </li>
                  ))}
                </ul>
            </div>
            <div className="col-lg-3 col-12 cols-ul">
                <ul>
                    <li className='tit'>Tipo</li>
                    {limitedData.map(tipo => (
                    <li key={tipo.Id}>
                      {tipo.Combustivel}
                    </li>
                  ))}
                </ul>
            </div>
            <div className="col-lg-3 col-12 cols-ul">
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
            <div className="col-lg-2 col-12 cols-ul">
                <ButtonFuel text="Gasolina Simples" className={'btn-margin btn-size'} onClick={() => setTipoCombustivel('3201')}/>
            </div>
            <div className="col-lg-2 col-12 cols-ul">
                <ButtonFuel text="Gasoleo Simples" className={'btn-margin btn-size'} onClick={() => setTipoCombustivel('2101')}/>
            </div>
            <div className="col-lg-2 col-12 cols-ul">
                <ButtonFuel text="Gasoleo Aditivado" className={'btn-margin btn-size btn-last'} onClick={() => setTipoCombustivel('2105')}/>
            </div>
        </div>
    </div>
  )
}

export default Fuel

import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [mean, setMean] = useState(0);
  const [stdDev, setStdDev] = useState(0);
  const [sampleSize, setSampleSize] = useState(1);
  const [confidenceInterval, setConfidenceInterval] = useState("");
  const [marginOfError, setMarginOfError] = useState("");
  const [zValue, setZValue] = useState(1.96);

  useEffect(() => {
    setConfidenceInterval(null);
    setMarginOfError(null);
  }, [selectedOption]);

  const calculateConfidenceInterval = () => {
    let z;

if (zValue === 0.90) {
    z = 1.645;
} else if (zValue === 0.95) {
    z = 1.96;
} else if (zValue === 0.99) {
    z = 2.575;
}
    const stdError =  z * (stdDev / Math.sqrt(sampleSize));
    const lowerBound = mean -  stdError;
    const upperBound = mean + stdError;
    setConfidenceInterval(
      `Intervalo de Confiança: ${lowerBound.toFixed(2)} - ${upperBound.toFixed(2)} - Erro: ${stdError.toFixed(2)}`
    );
  };

  function calculaICMedia() {
    return (
      <>
        <h2>Calculadora de IC (Média)</h2>
        <div>
          <input
            class="inputtext"
            type="number"
            placeholder="Média"
            onChange={(e) => setMean(Number(e.target.value))}
          />
          <input
            class="inputtext"
            type="number"
            placeholder="Desvio Padrão"
            onChange={(e) => setStdDev(Number(e.target.value))}
          />
        </div>
        <div>
          <input
            class="inputtext"
            type="number"
            placeholder="Tamanho da Amostra"
            onChange={(e) => setSampleSize(Number(e.target.value))}
          />
          <input
            class="inputtext"
            type="number"
            placeholder="Valor de confiança"
            onChange={(e) => setZValue(Number(e.target.value))}
          />
        </div>
        <div>
          <button onClick={calculateConfidenceInterval}>Calcular!</button>
        </div>
        <span class="spanresp">{confidenceInterval} </span>
      </>
    );
  }

  const [proportion, setProportion] = useState(0);
  const calculateConfidenceIntervalProp = () => {

    let z, p;
    if(proportion > 1){
      p = proportion / sampleSize;
    }
    else{
      p = proportion
    }
    if (zValue === 0.90) {
        z = 1.645;
    } else if (zValue === 0.95) {
        z = 1.96;
    } else if (zValue === 0.99) {
        z = 2.575;
    }
    const stdError = Math.sqrt((p * (1 - p)) / sampleSize) * z;
    const lowerBound = p - stdError;
    const upperBound = p + stdError;
    setConfidenceInterval(
      `Intervalo de Confiança: ${lowerBound.toFixed(2)} - ${upperBound.toFixed(2)} - Erro: ${stdError.toFixed(2)}`);
  };

  function calculaICProporcao() {
    return (
      <>
        <h2>Calculadora de IC (Proporção)</h2>
        <div>
        <input
          class="inputtext"
          type="number"
          placeholder="Proporção"
          onChange={(e) => setProportion(Number(e.target.value))}
        />
        <input
          class="inputtext"
          type="number"
          placeholder="Tamanho da Amostra"
          onChange={(e) => setSampleSize(Number(e.target.value))}
        />
        </div>
        <div>
        <input
          class="inputtext"
          type="number"
          placeholder="Valor de confiança"
          onChange={(e) => setZValue(Number(e.target.value))}
        />
        </div>
        <div>
        <button onClick={calculateConfidenceIntervalProp}>Calcular!</button>
        </div>
        <span class="spanresp">{confidenceInterval}</span>
      </>
    );
  }

  const calculateMarginOfError = () => {
    let z;
    if (zValue === 0.90) {
      z = 1.645;
  } else if (zValue === 0.95) {
      z = 1.96;
  } else if (zValue === 0.99) {
      z = 2.575;
  }
    const tm = Math.ceil((z * stdDev / sampleSize) * (z * stdDev / sampleSize));
    
    setMarginOfError(`Tamanho da amostra: ${tm}`);
  };

  function calculaTmMedia() {
    return (
      <>
        <h2>Calculadora de Amostra (Média)</h2>
        <div>

        <input
          class="inputtext"
          type="number"
          placeholder="Desvio Padrão"
          onChange={(e) => setStdDev(Number(e.target.value))}
        />

        <input
          class="inputtext"
          type="number"
          placeholder="Margem de Erro"
          onChange={(e) => setSampleSize(Number(e.target.value))}
        />
        </div>
        <input
          class="inputtext"
          type="number"
          placeholder="Valor de confiança"
          onChange={(e) => setZValue(Number(e.target.value))}
        />

        <div>
        <button onClick={calculateMarginOfError}>Calcular!</button>
        </div>
        <span class="spanresp">{marginOfError}</span>
      </>
    );
  }

  const calculateMarginOfErrorProp = () => {
    let z, p;
    if(proportion > 1){
      p = proportion / sampleSize;
    }
    else{
      p = proportion
    }
    if (zValue === 0.90) {
        z = 1.645;
    } else if (zValue === 0.95) {
        z = 1.96;
    } else if (zValue === 0.99) {
        z = 2.575;
    }
  const tm = Math.ceil((z * z) * p * (1 - p) / (sampleSize * sampleSize));
    setMarginOfError(`Tamanho da amostra: ${tm}`);
  };

  function calculaTmProporcao() {
    return (
      <>
        <h2>Calculadora de Amostra (Proporção)</h2>
        <div class="inputCalculadoraTmProporcao">
          <div>
            <input
              class="inputtext"
              type="number"
              placeholder="Proporção"
              onChange={(e) => setProportion(Number(e.target.value))}
            />
            <input
              class="inputtext"
              type="number"
              placeholder="Margem de erro"
              onChange={(e) => setSampleSize(Number(e.target.value))}
            />
          </div>
          <input
            class="inputtext"
            type="number"
            placeholder="Valor de confiança"
            onChange={(e) => setZValue(Number(e.target.value))}
          />
        </div>
        <div class="botaocalcular">
          <button onClick={calculateMarginOfErrorProp}>Calcular!</button>
        </div>
        <span class="spanresp">{marginOfError}</span>
      </>
    );
  }

  return (
    <div className="App">
      <div lang="en">
        <link rel="stylesheet" href="style.css" />
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>Calculadora</title>
        </head>
        <body>
          <div className="Calculadora"></div>
          {selectedOption === null && <h5>Selecione uma opção Abaixo</h5>}
          <div div id="Conteudo">
            <div className="radio-input">
              <input
                name="value-radio"
                id="IC (Média)"
                type="radio"
                onClick={() => setSelectedOption("IC (Média)")}
              />
              <label htmlFor="IC (Média)">IC (Média)</label>
              <input
                name="value-radio"
                id="IC (Proporção)"
                type="radio"
                onClick={() => setSelectedOption("IC (Proporção)")}
              />
              <label htmlFor="IC (Proporção)">IC (Proporção)</label>
              <input
                name="value-radio"
                id="TM (Média)"
                type="radio"
                onClick={() => setSelectedOption("TM (Média)")}
              />
              <label htmlFor="TM (Média)">Amostra (Média)</label>
              <input
                name="value-radio"
                id="TM (Proporção)"
                type="radio"
                onClick={() => setSelectedOption("TM (Proporção)")}
              />
              <label htmlFor="TM (Proporção)">Amostra (Proporção)</label>
            </div>
          </div>
          {selectedOption === "IC (Média)" && calculaICMedia()}
          {selectedOption === "IC (Proporção)" && calculaICProporcao()}
          {selectedOption === "TM (Média)" && calculaTmMedia()}
          {selectedOption === "TM (Proporção)" && calculaTmProporcao()}
        </body>
      </div>
    </div>
  );
}

export default App;

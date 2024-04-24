"use client";
import { useState } from "react";
import { Frequency } from "./types.ts";
import { Button } from "primereact/button";
import { Slider } from "primereact/slider";
import { InputNumber } from "primereact/inputnumber";
import { RadioButton } from "primereact/radiobutton";
import "primereact/resources/themes/mira/theme.css";
import "primeflex/primeflex.css";
import "./calc.css";

export default function Home() {
  const [initialDeposit, setInitialDeposit] = useState(1200);
  const [contribution, setContribution] = useState(100);
  const [frequency, setFrequency] = useState<Frequency>("Mensual");
  const [term, setTerm] = useState(3);
  const [percent, setPercent] = useState(15);
  const isPlural = term > 1 ? "Años" : "Año";

  function handleClick(e) {
    e.preventDefault();
  }

  return (
    <main>
      <div id="master">
        <h1>Veamos tu potencial</h1>
        <p>
          Aquí una muestra de cómo el tiempo y el interés compuesto pueden
          ayudarte a hacer crecer tu dinero.
        </p>
      </div>
      <section className="calc">
        <form>
          <div>
            <label htmlFor="initDepo" className="spacing">
              Depósito Inicial
            </label>
            <br />
            <InputNumber
              className="border-circle-top border-circle-bottom spacing rounded"
              id="initDepo"
              inputId="currency-us"
              value={initialDeposit}
              onValueChange={(e) => setInitialDeposit(e.value)}
              mode="currency"
              currency="USD"
              locale="es"
            />
          </div>
          <div>
            <label htmlFor="contributions" className="spacing">
              Aportes
            </label>
            <br />
            <InputNumber
              style={{ borderRadius: "22px" }}
              className="spacing rounded"
              id="contributions"
              inputId="currency-us"
              value={contribution}
              onValueChange={(e) => setContribution(e.value)}
              mode="currency"
              currency="USD"
              locale="es"
            />
            <div className="radio">
              <RadioButton
                inputId="years"
                name="selectFrequency"
                value="Anual"
                onChange={(e) => setFrequency(e.value)}
                checked={frequency === "Anual"}
              />
              <label htmlFor="years" className="spacing">
                Anual
              </label>
              <RadioButton
                inputId="months"
                name="selectFrequency"
                value="Mensual"
                onChange={(e) => setFrequency(e.value)}
                checked={frequency === "Mensual"}
              />
              <label htmlFor="months" className="spacing">
                Mensual
              </label>
              <RadioButton
                inputId="weeks"
                name="selectFrequency"
                value="Semanal"
                onChange={(e) => setFrequency(e.value)}
                checked={frequency === "Semanal"}
              />
              <label htmlFor="weeks" className="spacing">
                Semanal
              </label>
              <RadioButton
                inputId="days"
                name="selectFrequency"
                value="Diario"
                onChange={(e) => setFrequency(e.value)}
                checked={frequency === "Diario"}
              />
              <label htmlFor="days" className="spacing">
                Diario
              </label>
            </div>
          </div>
          <div>
            <label htmlFor="growTime" className="spacing">
              Plazo de Inversión
            </label>
            <p>{`${term} ${isPlural}`}</p>
            <Slider
              className="spacing"
              name="growTime"
              value={term}
              onChange={(e) => setTerm(e.value)}
              className="p-slider p-slider-handle w-20rem"
              min={1}
              max={40}
            />
          </div>
          <div>
            <label htmlFor="percent" className="spacing">
              Retorno anual promedio
            </label>
            <br />
            <InputNumber
              className="spacing"
              id="percent"
              suffix="%"
              value={percent}
              onValueChange={(e) => setPercent(e.value)}
              mode="decimal"
              min={10}
              max={40}
            />
          </div>
          <Button label="Calcular mis rendimientos" onClick={handleClick} />
        </form>
        <div className="resultGraph">
          <label htmlFor="returnOfInv" className="spacing">
            Saldo potencial
          </label>
          <h2 id="returnOfInv">Return Of Investment</h2>
          <svg></svg>
        </div>
      </section>
    </main>
  );
}

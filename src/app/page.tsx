"use client";
import { useState } from "react";
import { Frequency } from "./types";
import { Button } from "primereact/button";
import { Slider } from "primereact/slider";
import { InputNumber } from "primereact/inputnumber";
import { RadioButton } from "primereact/radiobutton";
import "primereact/resources/themes/mira/theme.css";
import "primeflex/primeflex.css";
import "./calc.css";

export default function Home() {
  const [initialDeposit, setInitialDeposit] = useState(1200);
  const [contribution, setContribution] = useState(200);
  const [frequency, setFrequency] = useState<Frequency>("Mensual");
  const [term, setTerm] = useState(5);
  const [percent, setPercent] = useState(15);
  const isPlural = term > 1 ? "años" : "año";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>
    e.preventDefault();

  return (
    <main>
      <section className="roi-calculus">
        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="initial-deposit"
              className="spacing toplabel-styles"
            >
              DEPÓSITO INICIAL
            </label>
            <br />
            <InputNumber
              className="spacing"
              id="initial-deposit"
              value={initialDeposit}
              onValueChange={(e) => setInitialDeposit(e.value)}
              mode="decimal"
              prefix="US$ "
              locale="es"
            />
          </div>
          <div>
            <label htmlFor="contributions" className="spacing toplabel-styles">
              APORTES
            </label>
            <br />
            <InputNumber
              className="spacing"
              id="contributions"
              value={contribution}
              onValueChange={(e) => setContribution(e.value)}
              mode="decimal"
              prefix="US$ "
              locale="es"
            />
            <div className="radio">
              <RadioButton
                inputId="years"
                name="select-frequency"
                value="Anual"
                onChange={(e) => setFrequency(e.value)}
                checked={frequency === "Anual"}
              />
              <label htmlFor="years" className="radio-spacing">
                Anual
              </label>
              <RadioButton
                inputId="months"
                name="select-frequency"
                value="Mensual"
                onChange={(e) => setFrequency(e.value)}
                checked={frequency === "Mensual"}
              />
              <label htmlFor="months" className="radio-spacing">
                Mensual
              </label>
              <RadioButton
                inputId="weeks"
                name="select-frequency"
                value="Semanal"
                onChange={(e) => setFrequency(e.value)}
                checked={frequency === "Semanal"}
              />
              <label htmlFor="weeks" className="radio-spacing">
                Semanal
              </label>
              <RadioButton
                inputId="days"
                name="select-frequency"
                value="Diario"
                onChange={(e) => setFrequency(e.value)}
                checked={frequency === "Diario"}
              />
              <label htmlFor="days" className="radio-spacing">
                Diario
              </label>
            </div>
          </div>
          <div className="spacing2">
            <label htmlFor="pay-term" className="spacing toplabel-styles">
              PLAZO DE INVERSIÓN
            </label>
            <p className="spacing">{`${term} ${isPlural}`}</p>
            <Slider
              name="pay-term"
              value={term}
              onChange={(e) => setTerm(e.value)}
              className="p-slider p-slider-handle w-13rem spacing3"
              min={1}
              max={40}
            />
          </div>
          <div>
            <label htmlFor="percent" className="toplabel-styles">
              RETORNO ANUAL PROMEDIO
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
          <Button
            className="bouton spacing"
            label="Calcular mis rendimientos"
          />
        </form>
        <div className="result-graph">
          <div className="top-container">
            <label
              htmlFor="return-of-investment"
              className="toplabel-styles saldo-potencial"
            >
              SALDO POTENCIAL AL TÉRMINO:
            </label>
            <h2 className="final-result" id="return-of-investment">
              US$ {"51,805"}
            </h2>
            <div className="graph"></div>
          </div>
        </div>
      </section>
    </main>
  );
}

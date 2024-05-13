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
  const isPlural = term > 1 ? "Años" : "Año";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>
    e.preventDefault();

  return (
    <main>
      <div id="master">
        <h1>Veamos tu potencial</h1>
        <p>
          Aquí una muestra de cómo el tiempo y el interés compuesto pueden
          ayudarte a hacer crecer tu dinero.
        </p>
      </div>
      <section className="roi-calculus">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="initial-deposit" className="spacing">
              Depósito Inicial
            </label>
            <br />
            <InputNumber
              inputStyle={{
                borderRadius: "22px",
              }}
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
            <label htmlFor="contributions" className="spacing">
              Aportes
            </label>
            <br />
            <InputNumber
              inputStyle={{
                borderRadius: "22px",
              }}
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
            <label htmlFor="pay-term" className="spacing">
              Plazo de Inversión
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
            <label htmlFor="percent">Retorno anual promedio</label>
            <br />
            <InputNumber
              inputStyle={{
                borderRadius: "22px",
              }}
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
          <label htmlFor="return-of-investment" style={{ margin: "4.25%" }}>
            Saldo potencial
          </label>
          <h2 style={{ marginBottom: "2.5%" }} id="return-of-investment">
            RetoLno de InveLsion de Yonkeibel
          </h2>
          <div className="graph"></div>
        </div>
      </section>
    </main>
  );
}

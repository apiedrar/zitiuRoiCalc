"use client";
import { useState } from "react";
import { Button } from "primereact/button";
import { Slider } from "primereact/slider";
import { InputNumber } from "primereact/inputnumber";
import { RadioButton } from "primereact/radiobutton";
import "primereact/resources/themes/mira/theme.css";
import "primeflex/primeflex.css";
import "./calc.css";

export default function Home() {
  const [init, setInit] = useState(100);
  const [budget, setBudget] = useState(100);
  const [frequency, setFrequency] = useState("");
  const [term, setTerm] = useState(3);
  const [percent, setPercent] = useState(15);
  const isPlural = term > 1 ? "Años" : "Año";
  return (
    <main>
      <div id="head">
        <h1>Veamos tu potencial</h1>
        <p>
          Aquí una muestra de cómo el tiempo y el interés compuesto pueden
          ayudarte a hacer crecer tu dinero.
        </p>
      </div>
      <section className="Calc">
        <form>
          <div>
            <label htmlFor="initDepo">Depósito Inicial</label>
            <InputNumber
              className="border-circle-top border-circle-bottom"
              name="initDepo"
              inputId="currency-us"
              value={init}
              onValueChange={(e) => setInit(e.value)}
              mode="currency"
              currency="USD"
              locale="es"
            />
          </div>
          <div className="">
            <label htmlFor="contr">Aportes</label>
            <InputNumber
              className="keyIn"
              name="contr"
              inputId="currency-us"
              value={budget}
              onValueChange={(e) => setBudget(e.value)}
              mode="currency"
              currency="USD"
              locale="es"
            />
            <RadioButton
              inputId="years"
              name="contrib"
              value="Anual"
              onChange={(e) => setFrequency(e.value)}
              checked={frequency === "Anual"}
            />
            <label htmlFor="years">Anual</label>
            <RadioButton
              inputId="months"
              name="contrib"
              value="Mensual"
              onChange={(e) => setFrequency(e.value)}
              checked={frequency === "Mensual"}
            />
            <label htmlFor="months">Mensual</label>
            <RadioButton
              inputId="weeks"
              name="contrib"
              value="Semanal"
              onChange={(e) => setFrequency(e.value)}
              checked={frequency === "Semanal"}
            />
            <label htmlFor="weeks">Semanal</label>
            <RadioButton
              inputId="days"
              name="contrib"
              value="Diario"
              onChange={(e) => setFrequency(e.value)}
              checked={frequency === "Diario"}
            />
            <label htmlFor="days">Diario</label>
          </div>
          <div className="">
            <label htmlFor="growTime">Plazo de Inversión</label>
            <p>{`${term} ${isPlural}`}</p>
            <Slider
              name="growTime"
              value={term}
              onChange={(e) => setTerm(e.value)}
              className="p-slider p-slider-handle w-20rem"
              min={1}
              max={40}
            />
          </div>
          <div>
            <label htmlFor="percnt">Retorno anual promedio</label>
            <InputNumber
              className="keyIn"
              name="percnt"
              suffix="%"
              value={percent}
              onValueChange={(e) => setPercent(e.value)}
              mode="decimal"
              min={10}
              max={40}
              unstyled
            />
          </div>
          <Button label="Calcular mis rendimientos" />
        </form>
        <div>
          <h2>Graph will be here</h2>
        </div>
      </section>
    </main>
  );
}

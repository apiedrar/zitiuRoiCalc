"use client";
import React, { useState } from "react";
import { Button } from "primereact/button";
import { Slider } from "primereact/slider";
import { Card } from "primereact/card";
import { InputNumber } from "primereact/inputnumber";
import { RadioButton } from "primereact/radiobutton";
import "primereact/resources/themes/bootstrap4-light-blue//theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

export default function Home() {
  const [value, setValue] = useState(3);
  const [budget, setBudget] = useState(100);
  const [init, setInit] = useState(100);
  const [frequency, setFrequency] = useState("");
  const [percent, setPercent] = useState(15);
  const isPlural = value > 1 ? "Años" : "Año";
  return (
    <main>
      <Card
        className="card md:0 text-center"
        title="Veamos tu potencial"
        footer={
          <Button
            label="Calcular mis rendimientos"
            style={{ padding: "0.5em" }}
          />
        }
      >
        <div>
          <label htmlFor="initDepo">Depósito Inicial</label>
          <InputNumber
            name="initDepo"
            inputId="currency-us"
            value={init}
            onValueChange={(e) => setInit(e.value)}
            mode="currency"
            currency="USD"
            locale="es"
          />
        </div>
        <div className="flex justify-content-center">
          <label htmlFor="contr">Aportes</label>
          <InputNumber
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
        <div className="flex justify-content-center">
          <label htmlFor="growTime">Plazo de Inversión</label>
          <p
            style={{ color: "var(--primary-color)" }}
          >{`${value} ${isPlural}`}</p>
          <Slider
            name="growTime"
            value={value}
            onChange={(e) => setValue(e.value)}
            className="p-slider p-slider-handle w-20rem"
            min={1}
            max={40}
          />
        </div>
        <div>
          <label htmlFor="percnt">Retorno anual promedio</label>
          <InputNumber
            name="percnt"
            suffix="%"
            value={percent}
            onValueChange={(e) => setPercent(e.value)}
            mode="decimal"
            min={10}
            max={40}
          />
        </div>
      </Card>
    </main>
  );
}

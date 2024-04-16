"use client";
import React, { useState } from "react";
import { Slider } from "primereact/slider";
import { Card } from "primereact/card";
import { InputNumber } from "primereact/inputnumber";
import "primereact/resources/themes/bootstrap4-light-blue//theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

export default function Home() {
  const [value, setValue] = useState(3);
  const [budget, setBudget] = useState(100);
  const [init, setInit] = useState(0);
  const isPlural = value > 1 ? "Años" : "Año";
  return (
    <main>
      <Card className="m-0 text-center" title="Veamos tu potencial">
        <div className="shadow-2 surface-card p-8 border-round flex justify-content-center">
          <div>
            <label htmlFor="initDepo">Initial Deposit</label>
            <InputNumber
              name="initDepo"
              inputId="currency-us"
              value={init}
              onValueChange={(e) => setInit(e.value)}
              mode="currency"
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
              locale="en-US"
            />
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
              className="p-slider p-slider-handle w-30rem"
              min={1}
              max={40}
            />
          </div>
        </div>
      </Card>
    </main>
  );
}

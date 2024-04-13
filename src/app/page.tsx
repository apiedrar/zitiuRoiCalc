"use client";
import React, { useState } from "react";
import { Slider } from "primereact/slider";
import "primereact/resources/themes/viva-dark/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

export default function Home() {
  const [value, setValue] = useState(1);
  return (
    <main>
      <section>
        <div className="p-8">
          <div className="shadow-2 surface-card p-4 border-round flex justify-content-center">
            <div className="font-bold mt-3 text-center">
              <h1>{value}</h1>
            </div>
            <div className="mt-3 text-center">
              <Slider
                value={value}
                onChange={(e) => setValue(e.value)}
                className="w-30rem"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

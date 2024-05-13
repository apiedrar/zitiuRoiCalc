const quantifiedFrequency = (frequency) => {
  if (frequency === "Diario") {
    return 365;
  } else if (frequency === "Semanal") {
    return 52;
  } else if (frequency === "Mensual") {
    return 12;
  } else {
    return 1;
  }
};

function calculateReturnsArray() {
    const p
}

function calculateInvestedAmountArray(
  initialDeposit,
  contributionAmount,
  term
) {
  let currentYear = new Date().getFullYear();
  const invested = [initialDeposit];
  const years = [currentYear];
  const annualContribution = contributionAmount * quantifiedFrequency;
  for (let i = 1; i <= term; i++) {
    const totalInvestment = initialDeposit + annualContribution * i;
    years.push(currentYear + 1);
    invested.push(totalInvestment);
  }
  const returns = calculateReturnsArray();
  return [invested, returns, years];
}

export { quantifiedFrequency, calculateInvestedAmountArray };

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

function calculateInvestedAmount(initialDeposit, contributionAmount, term) {
  const annualContribution = contributionAmount * quantifiedFrequency;
  return (
    parseInt(contributionAmount) * quantifiedFrequency * parseInt(term) +
    parseInt(initialDeposit)
  );
}

export { quantifiedFrequency, calculateInvestedAmount };

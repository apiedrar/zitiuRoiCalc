const quantifiedContributions = (frequency) => {
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

function calculateInvestedAmount(initialDeposit, contribution, term) {
  return contribution * quantifiedContributions * term + initialDeposit;
}

export { quantifiedContributions, calculateInvestedAmount };

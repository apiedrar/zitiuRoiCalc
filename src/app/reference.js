function initializeCompoundInterestCalculator() {
    if (!document.querySelector('.compound-interest-calculator'))
        return
    setHighchartsDefaults()
    setUpCompoundInterestCalculator()
    formatCurrencyInputsOnChange()
    toggleSocialShareDropdownOnClick()
}
function setHighchartsDefaults() {
    if (typeof Highcharts === 'undefined')
        return
    Highcharts.setOptions({
        lang: {
            thousandsSep: ',',
            numericSymbols: [null, "M", "G", "T", "P", "E"]
        }
    })
}
function setUpCompoundInterestCalculator() {
    renderCompoundInterestCalculator()
    addCompoundInterestCtaClickHandling()
    setUpDragHandlingForYearsToGrowSlider()
    addClickHandlingForAnnualReturnInput()
}
function renderCompoundInterestCalculator() {
    const inputValues = fetchChartInputs()
    const chartArrays = calculateChartArrays(inputValues)
    drawCalculatorChart(chartArrays[0], chartArrays[1], chartArrays[2])
    updateFutureBalance(chartArrays[0], chartArrays[1])
}
function addCompoundInterestCtaClickHandling() {
    const calculatorSubmit = document.querySelector('#calculator-submit')
    if (calculatorSubmit) {
        calculatorSubmit.addEventListener('click', renderCompoundInterestCalculator)
    }
}
function updateFutureBalance(investedArray, returnsArray) {
    const futureBalanceWrapper = document.querySelector('.future-balance-wrapper')
    const finalInvested = investedArray[investedArray.length - 1]
    const finalReturns = returnsArray[returnsArray.length - 1]
    const finalAmount = finalInvested + finalReturns
    if (futureBalanceWrapper) {
        futureBalanceWrapper.innerText = '$' + finalAmount.toLocaleString('en-US')
    }
}
function fetchChartInputs() {
    const initialValueEl = document.querySelector('#initial-deposit')
    const contributionsEl = document.querySelector('#contributions')
    const yearsToGrowEl = document.querySelector('#years-to-grow')
    const annualReturnEl = document.querySelector('#annual-return')
    const contributionFrequencyEl = document.querySelector('input[name="contribution-frequency"]:checked')
    if (!initialValueEl || !contributionsEl || !yearsToGrowEl || !annualReturnEl || !contributionFrequencyEl)
        return
    const initialValue = parseInt(stripNonNumbers(initialValueEl.value || initialValueEl.placeholder))
    const contributionAmount = parseInt(stripNonNumbers(contributionsEl.value || contributionsEl.placeholder))
    const yearsToGrow = parseInt(yearsToGrowEl.value || yearsToGrowEl.placeholder)
    const annualReturn = parseInt(stripNonNumbers(annualReturnEl.value || annualReturnEl.placeholder))
    const contributionFrequencyValue = contributionFrequencyEl.value || 'annual'
    const contributionFrequency = determineContributionFrequency(contributionFrequencyValue)
    return {
        initialValue,
        contributionAmount,
        contributionFrequency,
        yearsToGrow,
        annualReturn
    }
}
function calculateChartArrays(inputValues) {
    const {initialValue, contributionAmount, contributionFrequency, yearsToGrow, annualReturn} = inputValues
    let currentYear = new Date().getFullYear()
    const invested = [initialValue]
    const years = [currentYear]
    const annualContribution = contributionAmount * contributionFrequency
    for (let i = 1; i <= yearsToGrow; i++) {
        const totalInvested = initialValue + (annualContribution * i)
        years.push(currentYear + i)
        invested.push(totalInvested)
    }
    const returns = calculateReturnsArray(inputValues)
    return [invested, returns, years]
}
function determineContributionFrequency(contributionFrequencyValue) {
    if (contributionFrequencyValue === 'annual') {
        return 1
    } else if (contributionFrequencyValue === 'monthly') {
        return 12
    } else if (contributionFrequencyValue === 'weekly') {
        return 52
    } else if (contributionFrequencyValue === 'daily') {
        return 365
    }
}
function calculateReturnsArray(inputValues) {
    const {initialValue: P, contributionAmount: PMT, contributionFrequency: n, yearsToGrow: t, annualReturn} = inputValues
    let r = annualReturn / 100, totalContributions = P + (PMT * t), fvOfPrincipal = P, fvOfContributions = 0, totalReturn, totalInvestment, combined, rData = []
    for (i = 0; i < (n * t); i++) {
        fvOfPrincipal = fvOfPrincipal * (1 + r / n)
        fvOfContributions = fvOfContributions * (1 + r / n) + PMT
        combined = fvOfPrincipal + fvOfContributions
        totalInvestment = PMT * (i + 1) + P
        totalReturn = Math.round(combined - totalInvestment)
        rData.push(totalReturn)
    }
    rData.unshift(0)
    rData = rData.filter((element,index)=>{
        return index % n === 0
    }
    )
    return rData
}
function drawCalculatorChart(investedArray, returnsArray, yearsArray, yearLabelInterval) {
    Highcharts.chart('calculator-chart', {
        chart: {
            type: 'column',
            styledMode: true,
            spacingBottom: 0,
            spacingRight: 0,
            spacingLeft: 0,
            animation: false
        },
        title: {
            text: null
        },
        series: [{
            name: 'Return',
            data: returnsArray
        }, {
            name: 'Investment',
            data: investedArray
        }],
        plotOptions: {
            column: {
                stacking: 'normal'
            },
            series: {
                groupPadding: 0.1
            }
        },
        legend: {
            align: 'center',
            symbolPadding: 16,
            verticalAlign: 'top',
            reversed: true,
            margin: 16,
            itemDistance: 32,
        },
        xAxis: {
            labels: {
                style: {
                    whiteSpace: 'nowrap',
                },
                y: 30,
            },
            categories: yearsArray,
            tickInterval: yearLabelInterval,
        },
        yAxis: {
            title: false,
            labels: {
                overflow: 'allow',
                formatter: function() {
                    return '$' + Highcharts.numberFormat(this.value, 0, '.', ',')
                },
                x: -20,
            },
            tickAmount: 5,
        },
        credits: {
            enabled: false
        },
        tooltip: {
            shadow: false,
            padding: 10,
            shared: true,
            valuePrefix: '$'
        },
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    xAxis: {
                        labels: {
                            y: 22,
                        },
                        tickInterval: 5,
                    },
                    yAxis: {
                        labels: {
                            x: -12,
                        },
                    },
                }
            }]
        }
    })
}
function setUpDragHandlingForYearsToGrowSlider() {
    $(".years-to-grow-icon-wrapper").draggable({
        grid: [6, 0],
        containment: '.years-to-grow-draggable-expanded-area',
        drag: handleDragForYearsToGrowSlider
    })
}
function handleDragForYearsToGrowSlider(e, ui) {
    if (!ui || !ui.position)
        return
    const gridAmount = 6
    const stepsFromLeft = ui.position.left / gridAmount
    updateYearsToGrowAmount(stepsFromLeft + 1)
    updateSliderProgress(stepsFromLeft + 1)
}
function updateYearsToGrowAmount(years) {
    const yearsToGrow = document.querySelector('#years-to-grow')
    yearsToGrow.value = years
    yearsToGrow.style.width = yearsToGrow.value.length + 'ch'
    yearsToGrow.classList.add('active')
}
function updateSliderProgress(currentStep) {
    const sliderProgress = document.querySelector('.slider-progress')
    sliderProgress.style.width = `calc((${currentStep} / 50) * 100%)`
}
function addClickHandlingForAnnualReturnInput() {
    const annualReturnWrapper = document.querySelector('.annual-return-wrapper')
    const annualReturn = document.querySelector('#annual-return')
    annualReturnWrapper.addEventListener('click', ()=>{
        annualReturn.focus()
    }
    )
}
function formatNumberWithCommas(number) {
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').slice(0, -3)
}
function stripNonNumbers(string) {
    return string.replace(/[a-zA-Z$.,]/g, "")
}
function formatCurrencyInputsOnChange() {
    const currencyInputs = document.querySelectorAll('.currency-input')
    currencyInputs.forEach(input=>{
        input.addEventListener('input', e=>{
            input.value = formatNumberWithCommas(parseInt(stripNonNumbers(e.target.value)))
        }
        )
    }
    )
}
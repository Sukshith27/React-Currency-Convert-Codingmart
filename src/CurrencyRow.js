import React from 'react'

export default function CurrencyRow(props) {

    const { title, currencyOptions, selectedCurrency, onChangeCurrency, amount, onChangeAmount } = props;

    return (
        <div style={{ padding: 3, flexDirection: "column",borderWidth: "bold", border: "1px solid", borderColor: "black", height: 150, width: 350, paddingTop: 20 }}>
            <div style={{fontSize: 20}}>{title} Amount</div><br/>
            <div>
                <input type="number" className="input" value={amount} onChange={onChangeAmount} />
            </div>
            <br/>
            <select value={selectedCurrency} onChange={onChangeCurrency}>
                {currencyOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}

import React from 'react';
import "./BalanceDisplay.css"

export default function BalanceDisplay(props) {
    const balance = props.balance
    return (
        <div className="balanceDisplay">
            Balance: <span className={balance >= 0 ? "positive" : "negative"}>{balance}</span>
        </div>
    )
}
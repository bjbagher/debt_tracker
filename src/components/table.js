import React from "react";

export default function Table({ debts, handleCheck, handleMasterCheck, handleAddInput }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>
                        <input data-testid="master-checkbox" checked={debts.every(debt => debt.checked)} type="checkbox" onChange={() => handleMasterCheck(debts.some(debt => debt.checked))} />
                    </th>
                    <th>Creditor</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Min Pay%</th>
                    <th>Balance</th>
                </tr>
            </thead>
            <tbody>{debts.map((debt, idx) => <Row key={idx} idx={idx} debt={debt} handleCheck={handleCheck} handleAddInput={handleAddInput} />)}</tbody>
        </table>
    );
};


const Row = ({ idx, debt, handleCheck, handleAddInput }) => {

    const input = (prop, type) => <input className="input" onBlur={(e) => handleAddInput(idx, prop, e.currentTarget.value)} type={type} ></input>

    return (
        <tr>
            <td>
                <input checked={debt.checked} type="checkbox" onChange={() => handleCheck(idx, !debt.checked)} />
            </td>
            <td>{debt.creditorName || input("creditorName", "text")}</td>
            <td>{debt.firstName || input("firstName", "text")}</td>
            <td>{debt.lastName || input("lastName", "text")}</td>
            <td>{(debt.minPaymentPercentage && `${(+debt.minPaymentPercentage).toFixed(2)}%`) || input("minPaymentPercentage", "number")}</td>
            <td>{(debt.balance && `$${(+debt.balance).toFixed(2)}`) || input("balance", "number")}</td>
        </tr>
    );
};


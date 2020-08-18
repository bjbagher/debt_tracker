import React, { useState, useEffect } from "react";
import Table from "./table"
import styled from "styled-components";
import fetch from "node-fetch";

const Styles = styled.div`
  padding: 1rem;

  *{
    font-family: sans-serif;
  }

  button {
    border: none;
    padding: 0.5em 1em;
    border-radius: 5px;
    background-color: #03a87c;
    color: white;
  }

  .remove {
      background-color: #fe6766;
      margin-left: 1em;
  }

  .input {
      width: 60%;
      border: none;
      outline: none;
      border-bottom: 1px solid black;
  }

  .total {
      margin-top: 0.5em;
      background-color: #e0ffff;
      display: flex;
      justify-content: space-between;
      padding: 1.2em 1.2em 0 1.2em;
  }

  table {
    border-spacing: 0;
    td, th {
        :first-child {
            border: none;
        }
    :nth-child(2) {
        text-align: left;
        }
    text-align: right;
    width: 30px;
    margin: 0;
    padding: 0.5rem;
    }

  }
`;

export default function App() {
    const [debts, setDebts] = useState([])
    const [checked, setChecked] = useState([])

    const url = "https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json"

    const fetchDebt = async () => {
        const debtsData = await fetch(url)
        const json = await debtsData.json()
        return json
    }

    useEffect(() => {
        let mounted = true
        fetchDebt().then((json) => {
            if (mounted) {
                setDebts(() => json.map(debt => { debt.checked = false; return debt }))
            }
        })
        return () => {
            mounted = false
        }
    }, [])

    const handleAddDebt = () => {
        setDebts(() => [...debts, { checked: false, balance: 0, minPaymentPercentage: 0 }])

    }

    const handleRemoveDebt = () => {
        setDebts(() => debts.filter(debt => !debt.checked))
        setChecked(() => debts.filter(debt => debt.checked))
    }

    const handleCheck = (id, checked) => {
        setDebts(() => {
            debts[id].checked = checked
            return [...debts]
        })
        setChecked(() => debts.filter(debt => debt.checked))
    }

    const handleAddInput = (id, prop, input) => {
        setDebts(() => {
            debts[id][prop] = input
            return [...debts]
        })
    }

    const handleMasterCheck = (checked) => {
        if (checked) setDebts(() => debts.map(debt => { debt.checked = false; return debt }))
        else setDebts(() => debts.map(debt => { debt.checked = true; return debt }))
        setChecked(() => debts.filter(debt => debt.checked))
    }

    return (
        <Styles>
            <div className="App">
                <Table debts={debts} handleCheck={handleCheck} handleMasterCheck={handleMasterCheck} handleAddInput={handleAddInput} />
                <button onClick={handleAddDebt}>Add Debt</button>
                <button className="remove" onClick={handleRemoveDebt}>Remove Debt</button>
                <div className="total">
                    <p >Total Balance</p>
                    <p>${checked.reduce((a, c) => a += +c.balance, 0).toFixed(2)}</p>
                    <p>Min Payment</p>
                    <p>${checked.reduce((a, c) => a += +c.balance * (c.minPaymentPercentage / 100), 0).toFixed(2)}</p>
                </div>
                <div className="total">
                    <p >Total Row Count</p>
                    <p>{debts.length}</p>
                    <p>Check Row Count</p>
                    <p>{checked.length}</p>
                </div>

            </div>
        </Styles>
    );
}

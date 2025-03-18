import { useState } from "react";
import { Button } from "./Button";

export const FormSplitBill = ({ selectedFriend, handleSplitBill }) => {
  const [bill, setBill] = useState("");
  const [yourExpense, setYourExpense] = useState("");
  const friendExpense = bill ? bill - yourExpense : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");
  const { name, id } = selectedFriend;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bill || !yourExpense) return;
    handleSplitBill(whoIsPaying === "user" ? friendExpense : -yourExpense);
    setBill("");
    setYourExpense("");
    setWhoIsPaying("user");
  };
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>SPLIT A BILL WITH {name}</h2>
      <label>💰 Bill value</label>
      <input
        type="number"
        value={bill}
        onChange={(e) => setBill(+e.target.value)}
      />

      <label>🕴 Your expense</label>
      <input
        type="number"
        value={yourExpense}
        onChange={(e) => setYourExpense(+e.target.value)}
      />

      <label>👨🏻‍🤝‍👨🏻 {name} expense</label>
      <input type="number" disabled value={friendExpense} />

      <label>🤑 WHo is paying the bill?</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{name}</option>
      </select>

      <Button onClick={() => {}}>Split Bill</Button>
    </form>
  );
};

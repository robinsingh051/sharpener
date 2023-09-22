import React, { useState } from "react";

import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";

const App = () => {
  const expenses = [
    {
      id: 1,
      title: "Car Insurance",
      amount: 1500,
      date: new Date(2023, 5, 25),
      location: "Kanpur",
    },
    {
      id: 2,
      title: "Blood Test",
      amount: 260,
      date: new Date(2023, 6, 26),
      location: "Bangalore",
    },
    {
      id: 3,
      title: "Lunch",
      amount: 1400,
      date: new Date(2023, 7, 27),
      location: "Lucknow",
    },
    {
      id: 4,
      title: "Mobile recharge",
      amount: 749,
      date: new Date(2023, 8, 28),
      location: "kanpur",
    },
  ];

  const [updatedExpenses, updateExpenses] = useState(expenses);

  const addExpenseHandler = (expense) => {
    console.log(expense);
    updateExpenses((prevState) => {
      return [...prevState, expense];
    });
  };

  return (
    <div>
      <NewExpense onAddExpenseHandler={addExpenseHandler} />
      <Expenses expenses={updatedExpenses} />
    </div>
  );
};

export default App;

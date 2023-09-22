// import React, { useState } from "react";

import "./ExpenseItem.css";
import Card from "../UI/Card";
import ExpenseDate from "./ExpenseDate";
const ExpenseItem = (props) => {
  // const [title, setTitle] = useState(props.expense.title);
  // const clickHandler = () => {
  //   setTitle("Updated!!!");
  //   // alert("clicked!!!");
  //   // const div = document.getElementById(props.expense.id);
  //   // div.remove();
  // };
  return (
    <Card className="expense-item" id={props.expense.id}>
      <ExpenseDate date={props.expense.date} />
      <div className="expense-item__description">
        <h2>{props.expense.title}</h2>
        <h2>{props.expense.location}</h2>
        <div className="expense-item__price">Rs {props.expense.amount}</div>
      </div>
    </Card>
  );
};

export default ExpenseItem;

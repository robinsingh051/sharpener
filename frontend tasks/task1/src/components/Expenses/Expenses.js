import "./Expenses.css";
import ExpenseItem from "./ExpenseItem";
import Card from "../UI/Card";

const Expenses = (props) => {
  const ExpenseItems = [];
  const expenses = props.expenses;
  for (let expense of expenses) {
    ExpenseItems.push(<ExpenseItem expense={expense}></ExpenseItem>);
  }
  return <Card className="expenses">{ExpenseItems}</Card>;
};

export default Expenses;

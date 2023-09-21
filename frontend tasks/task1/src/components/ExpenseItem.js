import "./ExpenseItem.css";

function ExpenseItem() {
  const expenseDate = new Date(2023, 9, 21);
  const expenseTitle = "Food";
  const expenseAmount = 10;
  const locationOfExpense = "Kanpur";
  return (
    <div className="expense-item">
      <div>{expenseDate.toISOString()}</div>
      <div className="expense-item__description">
        <h2>{expenseTitle}</h2>
        <h2>{locationOfExpense}</h2>
        <div className="expense-item__price">Rs {expenseAmount}</div>
      </div>
    </div>
  );
}

export default ExpenseItem;

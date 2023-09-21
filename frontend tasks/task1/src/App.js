import ExpenseItem from "./components/ExpenseItem";
function App() {
  const expenses = [
    {
      title: "Car Insurance",
      amount: 15000,
      date: new Date(2023, 5, 25),
      location: "Kanpur",
    },
    {
      title: "Blood Test",
      amount: 260,
      date: new Date(2023, 6, 26),
      location: "Bangalore",
    },
    {
      title: "Lunch",
      amount: 1400,
      date: new Date(2023, 7, 27),
      location: "Lucknow",
    },
    {
      title: "Mobile recharge",
      amount: 749,
      date: new Date(2023, 8, 28),
      location: "kanpur",
    },
  ];

  const ExpenseItems = [];
  for (let expense of expenses) {
    ExpenseItems.push(<ExpenseItem expense={expense}></ExpenseItem>);
  }
  return (
    <div>
      <h2>Let's get started!</h2>
      {ExpenseItems};
    </div>
  );
}

export default App;

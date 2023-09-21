import Expenses from "./components/Expenses/Expenses";
const App = () => {
  const expenses = [
    {
      id: 1,
      title: "Car Insurance",
      amount: 15000,
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

  return (
    <div>
      <h2>Let's get started!</h2>
      <Expenses expenses={expenses} />
    </div>
  );
};

export default App;

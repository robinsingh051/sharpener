import "./Card.css";
const Card = (props) => {
  const classes = "card " + props.className;
  return (
    <div className={classes} id={props.id}>
      {props.children}
    </div>
  );
};

export default Card;

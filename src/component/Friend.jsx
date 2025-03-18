import { Button } from "./Button";

export const Friend = ({ friend, handleSelection, selectedFriend }) => {
  const { balance, name, image } = friend;
  const isSelected = selectedFriend?.id === friend.id;

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={image} alt={name} />
      <h3>{name}</h3>

      {balance > 0 && (
        <p className="green">
          {name} owes you {balance}$
        </p>
      )}
      {balance < 0 && (
        <p className="red">
          You owe {name} {balance}$
        </p>
      )}
      {balance === 0 && <p>You and {name} are even </p>}
      <Button
        onClick={() => {
          handleSelection(friend);
        }}
      >
        {isSelected ? "close" : "Select"}
      </Button>
    </li>
  );
};

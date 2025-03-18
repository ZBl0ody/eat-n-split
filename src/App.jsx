import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

const App = () => {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(true);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleSelection = (friend) => {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
  };
  const handleAddFriend = (friend) => {
    setFriends((cur) => [...cur, friend]);
    setShowAddFriend(false);
  };
  const handlSplitBill = (value) => {
    setFriends((cur) =>
      cur.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
  };

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          selectedFriend={selectedFriend}
          handleSelection={handleSelection}
        />
        {showAddFriend && <AddFriend handleAddFriend={handleAddFriend} />}
        <Button
          onClick={() => {
            setShowAddFriend((show) => !show);
          }}
        >
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          handlSplitBill={handlSplitBill}
          selectedFriend={selectedFriend}
        />
      )}
    </div>
  );
};

const FriendList = ({ friends, handleSelection, selectedFriend }) => {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          key={friend.id}
          friend={friend}
          handleSelection={handleSelection}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
};

const Friend = ({ friend, handleSelection, selectedFriend }) => {
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

const FormSplitBill = ({ selectedFriend, handlSplitBill }) => {
  const [bill, setBill] = useState("");
  const [yourExpense, setYourExpense] = useState("");
  const friendExpense = bill ? bill - yourExpense : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");
  const { name, id } = selectedFriend;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bill || !yourExpense) return;
    handlSplitBill(whoIsPaying === "user" ? friendExpense : -yourExpense);
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

const AddFriend = ({ handleAddFriend }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !image) return;

    const newFriend = {
      id: crypto.randomUUID(),
      name,
      image,
      balance: 0,
    };
    handleAddFriend(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48");
  };

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👫 Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>🌄 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
};

const Button = ({ onClick, children }) => {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
};
export default App;

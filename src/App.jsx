import { useState } from "react";
import { FriendList } from "./component/FriendList";
import { FormSplitBill } from "./component/FormSplitBill";
import { AddFriend } from "./component/AddFriend";
import { Button } from "./component/Button";

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
  const handleSplitBill = (value) => {
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
          handleSplitBill={handleSplitBill}
          selectedFriend={selectedFriend}
        />
      )}
    </div>
  );
};

export default App;

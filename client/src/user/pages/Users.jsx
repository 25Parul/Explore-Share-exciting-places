import React from "react";
import UsersList from "../components/UsersList";

const Users = () => {
  // //state for users

  // useEffect(
  //   () => {
  //     // fetch user from database
  //   },
  //   [
  //     //set user state
  //   ]
  // );

  const userArray = [
    {
      id: "u1",
      name: "John Doe",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEn7BdXxLJy8esUixApTZqQMGJifPqgKTsAwJUEkiEYCMy8uMrLpRadP5bYSB-kfTxRfQ&usqp=CAU",
      places: 5,
    },
  ];

  return (
    <div>
      <UsersList items={userArray} />
    </div>
  );
};

export default Users;

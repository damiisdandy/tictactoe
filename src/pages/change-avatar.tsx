import Transition from "../components/Transition";
import { FC } from "react";
import useUser from "../hooks/useUser";
import { generateID } from "../utils";

const ChangeName: FC = () => {
  const { changeAvatar, userID } = useUser();

  const handleClick = () => {
    changeAvatar(generateID(10));
  };
  return (
    <Transition>
      <div className="ChangeAvatar">
        <h1>Change Avatar</h1>
        <div className="avatar">
          <img
            src={`https://avatars.dicebear.com/api/big-smile/${userID}.svg?skinColor=variant07,variant08`}
            alt={`player ${userID}'s avatar`}
          />
        </div>
        <button onClick={handleClick}>Change</button>
      </div>
    </Transition>
  );
};

export default ChangeName;

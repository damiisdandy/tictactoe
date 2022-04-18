import { useForm } from "react-hook-form";
import Transition from "../components/Transition";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { FC } from "react";

const ChangeName: FC<{ changeUserName: (name: string) => void }> = ({
  changeUserName,
}) => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const onSubmit = ({ username }: any) => {
    changeUserName(username);
    navigate("/");
  };
  return (
    <Transition>
      <form onSubmit={handleSubmit(onSubmit)} className="ChangeName">
        <h1>Choose Username</h1>
        <input required autoComplete="off" {...register("username")} />
        <button type="submit">CHANGE</button>
      </form>
    </Transition>
  );
};

export default ChangeName;

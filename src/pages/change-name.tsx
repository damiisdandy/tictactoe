import { useForm } from "react-hook-form";
import Transition from "../components/Transition";
import { useNavigate } from "react-router-dom";
import { FC } from "react";
import useUser from "../hooks/useUser";
import useUI from "../hooks/useUI";

const ChangeName: FC<{
  change?: boolean;
}> = ({ change }) => {
  const { setUserName, userName } = useUser();
  const { setShowBackdrop } = useUI();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = ({ username }: any) => {
    setUserName(username);
    if (!change) {
      setShowBackdrop(false);
    } else {
      navigate("/");
    }
  };
  return (
    <Transition>
      <form onSubmit={handleSubmit(onSubmit)} className="ChangeName">
        <h1>Choose Username</h1>
        <input
          required
          autoComplete="off"
          minLength={5}
          defaultValue={userName ?? ""}
          {...register("username")}
        />
        <button type="submit">{change ? "CHANGE" : "SELECT"}</button>
      </form>
    </Transition>
  );
};

export default ChangeName;

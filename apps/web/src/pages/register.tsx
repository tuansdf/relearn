import { Link, useNavigate } from "@tanstack/react-location";
import clsx from "clsx";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import Error from "../components/shared/error";
import authService from "../helpers/fetchers/auth.service";
import { AuthRegisterDto, IError, IUser } from "../interface/types";
import { userAtom } from "../stores/auth.store";

export default function Register() {
  // router
  const navigate = useNavigate();

  // atom
  const [user, setUser] = useAtom(userAtom);

  // form
  const { register, handleSubmit } = useForm<AuthRegisterDto>();

  //   query
  const registerMutation = useMutation<IUser, IError, AuthRegisterDto>(
    (data) => authService.register(data),
    {
      onSuccess: (data) => {
        setUser(data);
        navigate({ to: "/" });
      },
    }
  );

  const onSubmit = (data: AuthRegisterDto) => {
    registerMutation.mutate(data);
  };

  return (
    <div className="card card-bordered mx-auto max-w-md">
      <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="card-title mb-4 text-2xl">Create your account</h2>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            className="input input-bordered"
            {...register("email", { required: true })}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            {...register("username", { required: true })}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            className="input input-bordered"
            {...register("password", { required: true })}
          />
        </div>

        <button
          className={clsx("btn btn-primary mt-4", {
            loading: registerMutation.isLoading,
          })}
        >
          Sign up
        </button>

        <div className="flex justify-end space-x-2">
          <span>Have an account?</span>
          <Link to="/login" className="link link-primary">
            Sign in
          </Link>
        </div>

        {registerMutation.isError && (
          <Error text={registerMutation.error.response.data?.message} />
        )}
      </form>
    </div>
  );
}

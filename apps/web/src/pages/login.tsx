import { Link, useNavigate } from "@tanstack/react-location";
import clsx from "clsx";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

import Error from "../components/shared/error";

import authService from "../helpers/fetchers/auth.service";
import { AuthLoginDto, IError, IUser } from "../interface/types";
import { userAtom } from "../stores/auth.store";

export default function Login() {
  // router
  const navigate = useNavigate();

  // atom
  const [user, setUser] = useAtom(userAtom);

  // form
  const { register, handleSubmit } = useForm<AuthLoginDto>();

  //   query
  const loginMutation = useMutation<IUser, IError, AuthLoginDto>(
    (data) => authService.login(data),
    {
      onSuccess: (data) => {
        setUser(data);
        navigate({ to: "/", replace: true });
      },
    }
  );

  const onSubmit = (data: AuthLoginDto) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="card card-bordered mx-auto max-w-md">
      <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="card-title mb-4 text-2xl">Log in to your account</h2>

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
            loading: loginMutation.isLoading,
          })}
        >
          Sign in
        </button>

        <div className="flex justify-end space-x-2">
          <span>Don&apos;t have an account?</span>
          <Link to="/register" className="link link-primary">
            Sign up
          </Link>
        </div>

        {loginMutation.isError && (
          <Error text={loginMutation.error.response.data?.message} />
        )}
      </form>
    </div>
  );
}

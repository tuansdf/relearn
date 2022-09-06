import { Link, useNavigate } from "@tanstack/react-location";
import clsx from "clsx";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

import Error from "/src/components/shared/error";

import { loginApi } from "/src/helpers/fetchers";
import { userAtom } from "/src/stores/auth.store";

export default function Login() {
  // router
  const navigate = useNavigate();

  // atom
  const [user, setUser] = useAtom(userAtom);

  // form
  const { register, handleSubmit } = useForm();

  //   query
  const loginMutation = useMutation((data) => loginApi(data), {
    onSuccess: (data) => {
      setUser(data);
      navigate({ to: "/", replace: true });
    },
  });

  const onSubmit = (data) => {
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
          <span>Don't have an account?</span>
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

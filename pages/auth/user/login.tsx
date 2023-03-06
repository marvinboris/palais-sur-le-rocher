import { EnvelopeIcon, LockOpenIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import {
  ChangeEvent,
  FormEvent,
  ReactElement,
  useEffect,
  useState,
} from "react";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import Status from "../../../app/types/enums/status";

import Layout, { Head } from "../../../components/auth/navigation/layout";
import Alert from "../../../components/frontend/ui/alert";
import Button from "../../../components/frontend/ui/form/button";
import Input from "../../../components/frontend/ui/form/input";

import { selectAuth, userLogin } from "../../../features/auth/authSlice";

const params = {
  link: "/auth/user/login",
  title: "Connexion utilisateur | PSR",
  description: "PSR: Page de connexion en tant qu'utilisateur",
};

const AuthUserLoginPage = () => {
  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { token, status, message } = useAppSelector(selectAuth);

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue({ ...value, [e.target.name]: e.target.value });
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status !== Status.LOADING) dispatch(userLogin(value));
  };

  useEffect(() => {
    if (token) router.push("/user/dashboard");
  }, [token, router]);

  return (
    <form
      onSubmit={onSubmit}
      className="relative z-10 mx-auto flex min-h-[380px] max-w-lg flex-col px-5 md:px-0"
    >
      <Head {...params} />

      <div className="mb-[17px] text-center text-lg font-bold text-primary-600 md:mb-[5px] md:text-left md:text-3xl">
        Connexion Utilisateur
      </div>

      <div className="mb-[30px] text-center text-sm md:mb-[22px] md:text-left md:text-lg">
        Accédez à votre interface d&apos;administration
      </div>

      <div className="mb-6 overflow-auto px-3 md:mb-[33px] md:px-0">
        <div className="mb-[22.8px] grid gap-x-[17.34px] gap-y-[13.63px]">
          {message && <Alert color={message.type}>{message.content}</Alert>}
          <Input
            icon={EnvelopeIcon}
            type="email"
            name="email"
            placeholder="Adresse mail"
            onChange={onChange}
            value={value.email}
          />
          <Input
            icon={LockOpenIcon}
            type="password"
            name="password"
            placeholder="Mot de passe"
            onChange={onChange}
            value={value.password}
          />
        </div>
      </div>

      <div className="text-center">
        <Button status={status} type="submit">
          Continuer
        </Button>
      </div>
    </form>
  );
};

AuthUserLoginPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default AuthUserLoginPage;

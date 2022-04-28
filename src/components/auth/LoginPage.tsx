import Cookies from "js-cookie";
import { observer } from "mobx-react";
import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./LoginPage.module.scss";

type LoginData = {
  username: string;
  password: string;
};

const loginUser = async (data: LoginData) => {
  const res = await fetch("http://localhost:3000/login");
  return await res.json();
};

const LoginPage: FC = observer(() => {
  const navigate = useNavigate();
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token: { token: string } = await loginUser({
        username: usernameInput,
        password: passwordInput,
      });

      Cookies.set("token", token.token);
      navigate("/contacts");
    } catch (err: any) {
      throw new Error(err);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Log In</h1>
        <label>
          <p>Username</p>
          <input
            type="text"
            onChange={(e) => setUsernameInput(e.target.value)}
            value={usernameInput}
            className={styles.input}
          />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPasswordInput(e.target.value)}
            value={passwordInput}
            className={styles.input}
          />
        </label>
        <div>
          <button className={styles.button}>Log In</button>
        </div>
      </form>
    </div>
  );
});

export default LoginPage;

import { FC } from "react";
import { observer } from "mobx-react";

import styles from "./Header.module.scss";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Header: FC = observer(() => {
  const token = Cookies.get("token");

  const navigate = useNavigate();

  const loginHandler = () => {
    navigate("/login");
  };

  const logoutHandler = () => {
    Cookies.remove("token");
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <span>Contacts</span>
        {!token && <button onClick={loginHandler}>Log In</button>}
        {token && <button onClick={logoutHandler}>Log Out</button>}
      </div>
    </header>
  );
});

export default Header;

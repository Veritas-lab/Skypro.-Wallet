import React from "react";
import "./AuthForm.css";

const AuthForm = () => {
  return (
    <div className="authform-container">
      <h1>Вход</h1>
      <div className="form-group">
        <input type="text" placeholder="Эл. почта" required />
      </div>
      <div className="form-group">
        <input type="password" placeholder="Пароль" required />
      </div>
      <button>Войти</button>
      <div className="link">
        <p>Нужно зарегистрироваться?</p>
        <p>
          <a href="#register">Регистрируйтесь здесь</a>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;

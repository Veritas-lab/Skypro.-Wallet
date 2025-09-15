import React from "react";
import "./RegistForm.css";

const RegistForm = () => {
  return (
    <div className="authform-container">
      <h1>Регистрация</h1>
      <div className="form-group">
        <input type="text" placeholder="Имя" required />
      </div>
      <div className="form-group">
        <input type="text" placeholder="Эл. почта" required />
      </div>
      <div className="form-group">
        <input type="password" placeholder="Пароль" required />
      </div>
      <button>Зарегистрироваться</button>
      <div className="link">
        <p>Уже есть аккаунт?</p>
        <p>
          <a href="#login">Войдите здесь</a>
        </p>
      </div>
    </div>
  );
};

export default RegistForm;

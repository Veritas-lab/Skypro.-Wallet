import axios from "axios";

const BASE_URL = "https://wedev-api.sky.pro/api/";

// Регистрация
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}user`, userData, {
      headers: {
        "Content-Type": "",
      },
    });
    return response.data.user;
  } catch (error) {
    // Более точная обработка ошибок
    if (error.response) {
      const { status, data } = error.response;

      if (
        status === 400 &&
        data.error &&
        data.error.includes("уже существует")
      ) {
        throw new Error("Пользователь с таким email уже зарегистрирован.");
      } else if (status === 400) {
        throw new Error(data.error || "Неверные данные для регистрации.");
      } else {
        throw new Error(
          data.error || "Не удалось зарегистрировать пользователя"
        );
      }
    } else if (error.request) {
      throw new Error(
        "Не удалось соединиться с сервером. Проверьте подключение к интернету."
      );
    } else {
      throw new Error("Произошла ошибка при регистрации.");
    }
  }
};

// Логин
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}user/login`, credentials, {
      headers: {
        "Content-Type": "",
      },
    });
    return response.data.user;
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 400) {
        throw new Error(data.error || "Неверный email или пароль.");
      } else {
        throw new Error(data.error || "Не удалось войти в систему");
      }
    } else if (error.request) {
      throw new Error(
        "Не удалось соединиться с сервером. Проверьте подключение к интернету."
      );
    } else {
      throw new Error("Произошла ошибка при входе в систему.");
    }
  }
};

const TRANSACT_API_URL = "https://wedev-api.sky.pro/api/transactions";

// Функции для работы с транзакциями
export async function fetchTransactions({ token, sortBy, filterBy }) {
  try {
    const params = new URLSearchParams();
    if (sortBy) params.append("sortBy", sortBy);
    if (filterBy) params.append("filterBy", filterBy);

    const url = `${TRANSACT_API_URL}?${params.toString()}`;

    const response = await fetch(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (!response.ok) {
      throw new Error("Ошибка при загрузке транзакций");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function postTransaction({ token, transaction }) {
  try {
    const response = await fetch(TRANSACT_API_URL, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(transaction),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Ошибка при создании транзакции");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function editTransaction({ token, id, transaction }) {
  try {
    const response = await fetch(`${TRANSACT_API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "",
      },
      body: JSON.stringify(transaction),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Ошибка при обновлении транзакции");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteTransaction({ token, id }) {
  try {
    const response = await fetch(`${TRANSACT_API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Ошибка при удалении транзакции");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function fetchTransactionsByPeriod({ token, start, end }) {
  try {
    const response = await fetch(`${TRANSACT_API_URL}/period`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ start, end }),
    });

    if (!response.ok) {
      throw new Error("Ошибка при загрузке транзакций за период");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

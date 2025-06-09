import { useEffect, useState } from "react"

const useCurrency = (currency) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currency) return;

    setLoading(true);
    setError(null);

    fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setData(data[currency]);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching currency data:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [currency])

  return { data, loading, error }
}

export default useCurrency;
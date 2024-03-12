import axios from "axios";
import { useCallback, useEffect, useState } from "react";

function useFetch(url, accessToken = null) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setData(null);
    setError(null);

    const config = {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : null,
      },
    };

    axios
      .get(url, config)
      .then((res) => {
        if (res.data.status && res.data.status === "failed") {
          setData(null);
          setError(res.data.message);
        } else {
          setData(res.data);
          setError(null);
        }
        setLoading(false);
      })
      .catch((err) => {
        if (err.code !== "ERR_CANCELED") {
          if (err.message === undefined) {
            setError("Service Error, Try again later");
          } else {
            setError(err.message);
          }
        }

        setLoading(false);
      });
  }, [url, accessToken]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, revalidate: fetch };
}

export default useFetch;

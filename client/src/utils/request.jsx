import { QRAPHQL_SERVER } from "./constants";

export const graphQLRequest = async (payload, options = {}) => {
  if (localStorage.getItem("accessToken")) {
    const res = await fetch(`${QRAPHQL_SERVER}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        ...options,
      },
      body: JSON.stringify(payload),
    });
    const { data } = await res.json();
    console.log(data);
    if (!res.ok) {
      if (res.status === 403) {
        return null;
      }
    }

    return data;
  }
  return null;
};

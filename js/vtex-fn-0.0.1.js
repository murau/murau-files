const $vtexfn = {
  isLogged: async () => {
    let response = await fetch("/no-cache/profileSystem/getProfile")
      .then((response) => response.json())
      .then((data) => (response = data.IsUserDefined))
      .catch((err) => (response = err));
    return response;
  },
  searchDataEntity: async (entity, query, fields = "*") => {
    if (!entity) return;
    if (!query) return;
    let response = await fetch(
      `/api/dataentities/${entity}/search?${query}&_fields=${fields}`
    )
      .then((response) => response.json())
      .then((data) => (response = data))
      .catch((err) => (response = err));
    return response;
  },
  setDataEntity: async (entity, data) => {
    if (!entity) return;
    if (!data) return;
    let response = await fetch(`/api/dataentities/${entity}/documents`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/vnd.vtex.ds.v10+json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => (response = data))
      .catch((err) => (response = err));
    return response;
  },
};

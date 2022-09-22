const clearLocalStorage = () => {
  const r = localStorage.getItem("r");
  const token = localStorage.getItem("token");
  const _id = localStorage.getItem("_id");

  if (r && token && _id) {
    const isRemember = JSON.parse(r);

    if (isRemember === false) {
      localStorage.clear();
    }
  }
};

const setSessionStorage = () => {
  const r = localStorage.getItem("r");
  const token = localStorage.getItem("token");
  const _id = localStorage.getItem("_id");

  if (r && token && _id) {
    const isRemember = JSON.parse(r);

    if (isRemember === true) {
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("_id", _id);
    }
  }
};

const manualClearStorage = () => {
  const r = localStorage.getItem("r");
  const token = localStorage.getItem("token");
  const _id = localStorage.getItem("_id");
  if (!r || !token || !_id) {
    localStorage.clear();
    // window.location.reload();
  }
};

export { clearLocalStorage, setSessionStorage, manualClearStorage };

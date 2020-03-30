const getStorageProvider = (storePermanently = false) => {
  if (storePermanently) {
    return window.localStorage;
  } else {
    return window.sessionStorage;
  }
};

export default getStorageProvider;

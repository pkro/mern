const getStorageProvider = (storePermanently = true) => {
  if (storePermanently) {
    return window.localStorage;
  } else {
    return window.sessionStorage;
  }
};

export default getStorageProvider;

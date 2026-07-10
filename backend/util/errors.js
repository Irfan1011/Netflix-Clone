exports.get404 = () => {
  const err = new Error("Not Found");
  err.status = 404;
  err.message = "Not Found Error";
  err.data = err;
  throw err;
};

export const formatDateFull = (dateString) => {
  const date = new Date(dateString);
  return (
    date.getHours() +
    ":" +
    date.getMinutes() +
    "  " +
    date.getDate() +
    "/" +
    date.getMonth() +
    "/" +
    date.getFullYear()
  );
};

export const formatDateShort = (dateString) => {
  const date = new Date(dateString);
  return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
};

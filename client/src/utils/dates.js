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
/**
 * Please, check this out 
 *  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
 * These both functions can be replaced with JS native date api method .toLocaleString if you pass right options
 * 
 * And please, pay extra attenting that some of the Date.prototype methods are zero-based 
 * like .getMonth() which returns values 0-11.
 * I assume, dates formatted with the functions above are always 1 month behind
 */
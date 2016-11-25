// user : array : [ {}, {}, {}, ...]
// id : string or number
export default (users, id) => {
  const filtered = users.filter(user => user.id === id);
  if (filtered.length < 1) {
    return null;
  }
  return filtered[0];
};

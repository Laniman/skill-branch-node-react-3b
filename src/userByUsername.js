// users : array : [ {}, {}, {}, ...]
// username : string
export default (users, username) => {
  const filtered = users.filter(user => user.username === username);
  if (filtered.length < 1) {
    return null;
  }
  return filtered[0];
};

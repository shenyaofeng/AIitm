const USERNAMETOKENKEY = "usernameToken";
const USERNAME = 'username';
function setToken(token:string) {
  localStorage.setItem(USERNAMETOKENKEY, token);
}

function getToken() {
  return localStorage.getItem(USERNAMETOKENKEY);
}

function removeToken() {
  localStorage.removeItem(USERNAMETOKENKEY);
}

export { setToken, getToken, removeToken };

function setUsername(token: string) {
  localStorage.setItem(USERNAME, token);
}

function getUsername() {
  return localStorage.getItem(USERNAME);
}

function removeUsername() {
  localStorage.removeItem(USERNAME);
}

export { setUsername, getUsername, removeUsername };

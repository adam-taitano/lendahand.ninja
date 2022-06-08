import axios from "axios";
axios.defaults.withCredentials = true;

const ChatService = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-type": "application/json"
  }
});

const BASE_URL = 'http://localhost:8080';
export const MESSAGES_TO_LOAD = 10;
const url = x => `${BASE_URL}${x}`;

//check if chat session already exists
export const getMe = () => {
  return axios.get(url('/me'))
    .then(x => x.data)
    .catch(_ => null);
};

//log into chat backend
export const login = (username) => {
  return axios.post(url('/login'), {
    username
  }).then(x =>
    x.data
  )
  .catch(e => { throw new Error(e.response && e.response.data && e.response.data.message); });
}

export const logOut = () => {
  return axios.post(url('/logout'));
}

export const getUsers = (ids) => {
  return axios.get(url(`/room`), { params: { ids } }).then(x => x.data);
}

export const getOnlineUsers = () => {
  return axios.get(url(`/users/online`)).then(x => x.data);
}

export const addRoom = async (user1, user2) => {
  return axios.post(url(`/room`), { user1, user2 }).then(x => x.data);
};

export const getRooms = async (userId) => {
  return axios.get(url(`/rooms/${userId}`)).then(x => x.data);
}

export default ChatService;
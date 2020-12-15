import axios from "axios";

export function getSecretWord() {
  const url = "http://localhost:3030";
  return axios.get(url).then(({ data }) => data);
}

export default getSecretWord;

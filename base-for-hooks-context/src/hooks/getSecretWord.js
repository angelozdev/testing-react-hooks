import axios from "axios";

function getSecretWord(setSecretWord) {
  const url = "http://localhost:3030";
  return axios
    .get(url)
    .then(({ data }) => {
      setSecretWord(data);
    })
    .catch((err) => err);
}

export default getSecretWord;

import axios from "axios";

const baseURL =
  "https://api.opensea.io/api/v1/asset/0xEcd9837673D4c10f5D61a3e7b81C12AefA0B472B/";

export default axios.create({
  baseURL,
});

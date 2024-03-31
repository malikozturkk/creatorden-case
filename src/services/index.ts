import axios from "axios";

export const GetInfluencer = async () => {
  return await axios.get("api/influencer/get");
};

export const GetPosts = async () => {
  return await axios.get("api/post/get");
};

export const GetAllPosts = async (): Promise<any> => {
  return await axios.get("api/post/get-all");
};

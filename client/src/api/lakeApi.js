import axios from "./axios";

const LakeApi = {
  getAllLakes: async () => {
    try {
      const response = await axios.get("/lakes/getAll");
      return response.data;
    } catch (err) {
      console.error("Could not get all lakes");
      return err;
    }
  },

  getAllPublicLakes: async () => {
    try {
      const response = await axios.get("/lakes/public-api-lakes");
      return response.data;
    } catch (err) {
      console.error("Could not get all lakes");
      return err;
    }
  },
};

export default LakeApi;

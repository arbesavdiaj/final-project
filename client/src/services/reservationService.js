import axios from "../api/axios";

const reservationApi = {
  createReservation: async (reservationData) => {
    try {
      console.log("success", reservationData)
      const response = await axios.post("/reservations/create", reservationData);
      console.log("response", response.data)
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data.message : "Server Error";
    }
  },
  getReservationsForUser: async (userId) => {
    try {
      const response = await axios.get(`/reservations/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data.message : "Server Error";
    }
  },
};

export default reservationApi;

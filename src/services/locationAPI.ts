import axiosConfig from "./axiosConfig";
import { Location } from "interfaces/location";

const locationAPI = {
  getLocationList: () => {
    return axiosConfig.get<unknown, Location[]>("locations");
  },
};

export default locationAPI;

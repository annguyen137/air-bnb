import axiosConfig from "./axiosConfig";
import { LocationId } from "interfaces/location";

const locationAPI = {
  getLocationList: () => {
    return axiosConfig.get<unknown, LocationId[]>("locations");
  },
  getLocationDetail: (locationId: LocationId["_id"]) => {
    return axiosConfig.get<unknown, LocationId>(`locations/${locationId}`);
  },
};

export default locationAPI;

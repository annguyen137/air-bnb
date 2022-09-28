import axiosConfig from "./axiosConfig";
import { LocationId, LocationQueryParams } from "interfaces/location";

const locationAPI = {
  getLocationList: ({ location, limit, skip }: LocationQueryParams) => {
    return axiosConfig.get<unknown, LocationId[]>("locations", {
      params: { location: location, limit: limit, skip: skip },
    });
  },
  getLocationDetail: (locationId: LocationId["_id"]) => {
    return axiosConfig.get<unknown, LocationId>(`locations/${locationId}`);
  },
};

export default locationAPI;

import { LocationId, LocationQueryParams } from "interfaces/location";
import axiosConfig from "./axiosConfig";

const adminAPI = {
  getLocationList: ({ location, limit, skip }: LocationQueryParams) => {
    return axiosConfig.get<unknown, LocationId[]>("locations", {
      params: { location: location },
    });
  },
  getEditLocation: (locationId: LocationId["_id"]) => {
    return axiosConfig.get<unknown, LocationId>(`locations/${locationId}`);
  },
  createLocation: (newLocation: Partial<LocationId>) => {
    return axiosConfig.post<unknown>("locations", newLocation);
  },
  updateLocation: (
    locationId: LocationId["_id"],
    updateLocation: Partial<LocationId>
  ) => {
    return axiosConfig.put(`locations/${locationId}`, updateLocation);
  },
};

export default adminAPI;

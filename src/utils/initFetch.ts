import { ActionCreator } from "@reduxjs/toolkit";
import { LocationId } from "interfaces/location";
import { Room } from "interfaces/room";
import { User } from "interfaces/user";
import { getUserDetail } from "redux/slices/authSlice";
import { getLocationList } from "redux/slices/locationsSlice";
import { getReviewsByRoomId } from "redux/slices/reviewsSlice";
import { getRoomDetail, getRoomListByLocation } from "redux/slices/roomsSlice";
import { LIMIT } from "services/axiosConfig";

// CUSTOM INIT FETCH => RETURN ARRAY OF ACTIONs FOR DISPATCHING ASYNC CHAIN IN COMPONENT
/**
 * store user detail in redux not localstorage / sessionstorage
 * //
 * if user refresh page / close session but chose stay sign in
 * check if localstorage/sessionstorage has both _id and token, it means user is logged in  => fetch user data from api to store it back at redux (for avoid XSS attacking, i think so)
 * //
 * else: if user didnt choose stay sign in and close session => require login next time . if user doesnt close session but refresh, so there still remains session storage => fetch again and store in redux
 * //
 * else: first load, not logged in => then just fetch for room and location from api and store in redux
 */

const initFetch = (user: User, type: string, roomId?: Room["_id"], locationId?: LocationId["_id"]): any => {
  const homeBaseAction = [getRoomListByLocation({ limit: LIMIT })];
  const detailBaseAction = [getReviewsByRoomId({ roomId }), getRoomDetail({ roomId })];
  const roomsByLocationBaseAction = [getRoomListByLocation({ locationId })];

  // IF LOGGED IN
  if (Boolean(localStorage.getItem("_id")) && Boolean(localStorage.getItem("token"))) {
    const id: string = JSON.parse(localStorage.getItem("_id") || "");

    // HOME FETCH
    if (type === "home") {
      //IF USER IN REDUX (MEAN NOT REFRESH PAGE OR GET REDIRECT FROM ANOTHER LOCATION)
      if (Object.keys(user).length) {
        return homeBaseAction;
      }
      // IF USER REFRESH PAGE
      return [...homeBaseAction, getUserDetail(id)];
    }
    // DETAIL FETCH
    else if (type === "detail") {
      //IF USER IN REDUX (MEAN NOT REFRESH PAGE OR GET REDIRECT FROM ANOTHER LOCATION)
      if (Object.keys(user).length) {
        return detailBaseAction;
      }

      // IF USER REFRESH PAGE
      return [...detailBaseAction, getUserDetail(id)];
    }

    // ROOM BY LOCATION FETCH
    else if (type === "roomsbylocation") {
      //IF USER IN REDUX (MEAN NOT REFRESH PAGE OR GET REDIRECT FROM ANOTHER LOCATION)
      if (Object.keys(user).length) {
        return roomsByLocationBaseAction;
      }

      // IF USER REFRESH PAGE
      return [...roomsByLocationBaseAction, getUserDetail(id)];
    }
  }
  // FIRST LOAD AND NOT LOGGED IN
  else {
    if (type === "home") {
      return homeBaseAction;
    }
    if (type === "detail") {
      return detailBaseAction;
    }
    if (type === "roomsbylocation") {
      return roomsByLocationBaseAction;
    }
  }
};

export default initFetch;

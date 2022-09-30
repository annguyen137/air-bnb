import { Ticket, TicketQueryParams } from "interfaces/ticket";
import axiosConfig, { LIMIT } from "./axiosConfig";

const ticketAPI = {
  getTicketList: () => {},

  getTicketsByUser: ({ userId, limit, skip }: TicketQueryParams) => {
    return axiosConfig.get<unknown, Ticket[]>("tickets/by-user", {
      params: {
        userId: userId,
        limit: limit,
        skip: skip,
      },
    });
  },
};

export default ticketAPI;

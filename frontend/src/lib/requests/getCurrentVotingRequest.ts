import { AxiosError } from "axios";
import { http } from "./http";
import { Vote } from "./voteRequest";
import { Restaurant } from "./listRestaurantsRequest";

export interface VotingResponse {
  closed: boolean;
  votes: Vote[];
  winningRestaurantDTO: Restaurant;
}

export async function getCurrentVotingRequest(): Promise<
  [Error | undefined, VotingResponse | undefined]
> {
  try {
    const response = await http.get<VotingResponse>("/voting/current");
    console.log(response.data);
    return [undefined, response.data];
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      if (error.code === "ERR_NETWORK") {
        [new Error("NETWORK_CONNECTION_ISSUE"), undefined];
      }
    }
    return [new Error("UNEXCEPTED_ERROR"), undefined];
  }
}

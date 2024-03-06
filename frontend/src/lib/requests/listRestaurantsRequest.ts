import { AxiosError } from "axios";
import { http } from "./http";

interface Address {
  number: string;
  postCode: string;
  neighborhood: string;
  street: string;
  city: string;
  state: string;
}

export interface Restaurant {
  name: string;
  description: string;
  website: string;
  image: string;
  address: Address;
}

interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  offset: number;
  unpaged: boolean;
  paged: boolean;
}

interface ListRestaurantResponse {
  content: Restaurant[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

interface ListRestaurantRequest {
  accessToken: string | null;
  page: number;
  size: number;
  sort: string;
}

export async function listRestaurantRequest(
  page: ListRestaurantRequest["page"]
): Promise<[Error | undefined, Restaurant[] | undefined]> {
  try {
    const response = await http.get<ListRestaurantResponse>("/restaurant", {
      params: {
        page,
        size: 6,
        sort: "votes,desc",
      },
    });
    console.log(response.data.content);
    return [undefined, response.data.content];
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

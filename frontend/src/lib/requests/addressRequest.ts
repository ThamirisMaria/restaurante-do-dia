import axios, { AxiosError } from "axios";
import { Dispatch, SetStateAction } from "react";

interface AddressValues {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export const addressRequest = async (
  postCode: string,
  setIsLoading: Dispatch<SetStateAction<boolean>>
): Promise<[Error | undefined, AddressValues | undefined]> => {
  postCode = postCode.replace(/[^0-9]/g, "");

  if (postCode.length === 8) {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://viacep.com.br/ws/${postCode}/json/`
      );
      return [undefined, response.data];
    } catch (error) {
      console.error("Erro ao buscar endereço:", error);
      if (error instanceof AxiosError) {
        if (error.code === "ERR_NETWORK") {
          return [new Error("NETWORK_CONNECTION_ISSUE"), undefined];
        }
        return [new Error("UNEXPECTED_ERROR"), undefined];
      }
    } finally {
      setIsLoading(false);
    }
  }
  return [new Error("INVALID_POSTCODE"), undefined];
};

import type { AxiosResponse } from "axios";

export type AxiosCall<T> = {
  controller: AbortController;
  call: Promise<AxiosResponse<T>>;
};

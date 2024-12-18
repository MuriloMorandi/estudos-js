import { IResponseMetadata } from "./IResponseMetadata";

export interface IBaseResponse<T> {
  data: T;
  metadata: IResponseMetadata;  
  message?: string;
}

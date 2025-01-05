import { IPagination } from "./IPagination";

export interface IBaseService<T extends {id: IdType}, IdType=number> {
    getAll(data: IPagination): Promise<{items:T[], total:number}>;
    getById(id: IdType): Promise<T | undefined>;
    create(data: Omit<T, 'id'>): Promise<T>;
    update(id: IdType, data: Partial<T>): Promise<T>;
    delete(id: IdType): Promise<void>;
}
import { Catalog } from "./Catalog";

export class User {
    id: string;
    name: string;
    address: string;
    birthDate: Date;
    documentNumber: string;
    documentType: number;
    countryId: string;
    stateId: string;
    cityId: string;
    country: Catalog;
    state: Catalog;
    city: Catalog;
}
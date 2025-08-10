export interface IUserCard {
    id: number;
    name: string;
    username: string;
    email: string;
    address: IUserAddress;
    phone: string;
    website: string;
    company: IUserCompany;
};

export interface IUserAddress {
    street: string;
    city: string;
    zipcode: string;
};

export interface IUserCompany {
    name: string;
};
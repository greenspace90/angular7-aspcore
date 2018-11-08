import { IContact } from '@app/model/contact';
import { IBodystyle } from '@app/model/bodystyle';

export interface IVehicle {
    vehicleid: number;
    make: string;
    model: string;
    version: string;
    registration: string;
    contactid: number;
    typeid: number;
}
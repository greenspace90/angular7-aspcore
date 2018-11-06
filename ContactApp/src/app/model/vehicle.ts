import { IContact } from '@app/model/contact';
import { IBodystyle } from '@app/model/bodystyle';

export interface IVehicle {
    vehicleid: number;
    name: string;
    make: string;
    model: string;
    version: string;
    contactid: number;
    typeid: number;
}
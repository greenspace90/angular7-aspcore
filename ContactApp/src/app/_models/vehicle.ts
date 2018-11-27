import { IBodystyle } from '@app/_models/bodystyle';

export interface IVehicle {
    vehicleId: number;
    make: string;
    model: string;
    version: string;
    registration: string;
    contactId: number;
    typeId: number;
    bodystyle: IBodystyle;
    purchasePrice: number;
    ownershipPeriod: number;
    residualValue: number;
}
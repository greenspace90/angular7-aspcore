import { IContact } from '@app/model/contact';
import { IBodystyle } from '@app/model/bodystyle';
import { BodystyleService } from '@app/services/bodystyle.service';

export interface IVehicle {
    vehicleId: number;
    make: string;
    model: string;
    version: string;
    registration: string;
    contactId: number;
    typeId: number;
    bodystyle: IBodystyle;
}
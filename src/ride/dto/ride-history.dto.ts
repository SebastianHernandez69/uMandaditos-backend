export class RideHistoryDto {
    id: number;
    pickupLocationName: string;
    deliveryLocationName: string;
    title: string;
    runnerName: string;
    deliveryAt?: Date;
}
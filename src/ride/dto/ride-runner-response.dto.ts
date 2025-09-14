export class RideRunnerResponseDto {
    id: number;
    title: string;
    description: string;
    suggestedValue: number;
    posterName: string;
    pickupLocationName: string;
    deliveryLocationName: string;
    acceptedRate: number;
    accepted: boolean;
    statusRideId: number;
}
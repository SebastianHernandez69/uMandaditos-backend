export class PostResponseDto {
    id: number;
    title: string;
    description: string;
    suggestedValue: number;
    pickupLocation: string;
    deliveryLocation: string;
    posterUserName: string;
    postStatusName: string;

    // TODO: agg pickupLocation, deliveryLocation, posterUser, postStatus
}
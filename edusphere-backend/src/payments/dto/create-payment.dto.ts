import { IsNumber, IsString } from "class-validator";

export class CreatePaymentDto {
    @IsString()
    courseId: string;

    @IsNumber()
    amount: number;
}
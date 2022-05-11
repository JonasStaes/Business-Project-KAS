import { ValidatedObject } from "../../../services/types/GeneralTypes"

export type UserReadDto = {
    id: string,
    name: string,
    email: string,
    active: boolean,
    roles: Array<string>
}

export type CustomerLoginRequest = {
    companyNr: ValidatedObject<string>,
    password: ValidatedObject<string>
}

export type EmployeeLoginRequest = {
    email: ValidatedObject<string>,
    password: ValidatedObject<string>
}

export type LoginResponse = {
    accessToken: string,
    id: string,
    roles: Array<string>
}

export type MessageResponse<T> = {
    message: string,
    data: T
}

export type CreditRequestReadDto = {
    id: string,
    name: string,
    totalAmount: number,
    financedAmount: number,
    duration: string,
    investmentType: string,
    status: string,
    feedbackDocument: FeedbackDocument
}

export type FeedbackDocument = {
    approvalNote: string,
    calculatedRatios: Array<CalculatedRatio>
}

export type CalculatedRatio = {
    name: string,
    ratio: number,
    minimum: number,
    ratioValid: boolean
}

export type CreditRequestCreateDto = {
    name: ValidatedObject<string>, 
    totalAmount: ValidatedObject<number>, 
    financedAmount: ValidatedObject<number>, 
    duration: ValidatedObject<number>, 
    investmentType: ValidatedObject<InvestmentType>, 
    approvalNote: ValidatedObject<string>,
    files: Array<File>,
    currentUser: string
}

export type InvestmentType = {
    name: string,
    min: number,
    max: number
}

export type CustomerCreateDto = {
    name: ValidatedObject<string>,
    email: ValidatedObject<string>,
    companyNr: ValidatedObject<string>,
}

export type CustomerFinalizationDto = {
    token: string,
    password: ValidatedObject<string>,
    township: ValidatedObject<string>,
    homeNumber: ValidatedObject<number>,
    streetName: ValidatedObject<string>,
    postalCode: ValidatedObject<number>
    birthplace: ValidatedObject<string>,
    birthDate: ValidatedObject<Date>
    phoneNr: ValidatedObject<number>
    socialRegistryNr: ValidatedObject<number>
} 

export type EmployeeCreateDto = {
    name: ValidatedObject<string>,
    email: ValidatedObject<string>,
    roles: ValidatedObject<Array<string>>
}

export type EmployeeFinalizationDto = {
    token: string,
    password: ValidatedObject<string>
}

export type CreditRequestStatusConfirmationDto = {
    id: string,
    approvalNote: ValidatedObject<string>,
}

export type PasswordChangeRequestDto = {
    name: ValidatedObject<string>,
    email: ValidatedObject<string>
}

export type PasswordChangeDto = {
    token: string,
    password: ValidatedObject<string>
}

export type ListEntryDto = {
    nacebel: ValidatedObject<string>
}

export type ListEntryReadDto = {
    id: string,
    nacebel: ValidatedObject<string>
}

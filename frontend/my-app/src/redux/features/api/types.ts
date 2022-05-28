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
    companyNr: string,
    name: string,
    totalAmount: number,
    financedAmount: number,
    duration: string,
    investmentType: string,
    status: string,
    files: Array<FileData>,
    feedbackDocument: FeedbackDocument,
    companyInfo?: CompanyInfo
}

type CompanyInfo = {
    name: string,
    nacbelCode: string,
    equity: number,
    assets: number,
    result: number,
    tax: number,
    resultAfterTax: number,
    financialCosts: number,
    currentAssets: number,
    stock: number,
    fixedAssets: number,
    shortTermDebt: number,
    longTermDebt: number,
    depreciation: number,
    writeDown: number
}

type FileData = {
    name: string,
    type: string,
    data: Array<string>
}

export type FeedbackDocument = {
    approvalNote: string,
    calculatedRatios: Array<CalculatedRatio>,
    amortizationSchedule: AmortizationSchedule,
    feedbackNote: string
}

export type CalculatedRatio = {
    name: string,
    ratio: number,
    minimum: number,
    ratioStatus: string
}

export type AmortizationSchedule = {
    remainingDebt: Array<number>,
    yearlyInterest: Array<number>,
    yearlyDebtPayment: Array<number>,
    yearlyTotalPayment: Array<number>
}

export interface CreditRequestCreateDto  {
    name: ValidatedObject<string>, 
    totalAmount: ValidatedObject<number>, 
    financedAmount: ValidatedObject<number>, 
    duration: number, 
    investmentType: InvestmentType, 
    approvalNote: ValidatedObject<string>,
    files: Array<File>,
    currentUser: string
}

export interface OfficeWorkerCreditRequestCreateDto  {
    name: ValidatedObject<string>, 
    totalAmount: ValidatedObject<number>, 
    financedAmount: ValidatedObject<number>, 
    duration: number, 
    investmentType: InvestmentType, 
    approvalNote: ValidatedObject<string>,
    files: Array<File>,
    companyNr: ValidatedObject<string>
}

export interface CreditRequestUpdateDto extends CreditRequestCreateDto  {
    id: ValidatedObject<string>
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

export type CreditRequestComplianceFeedbackDto = {
    id: string,
    feedbackNote: ValidatedObject<string>,
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

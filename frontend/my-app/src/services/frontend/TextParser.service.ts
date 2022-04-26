import { InvestmentType } from "../../redux/features/api/types";

export const cleanUpStringNoUppercase = (role: string) => {
    return role.toLowerCase().replaceAll(/_/g, " ")
}

export const cleanUpArrayNoUppercase = (roles: Array<string>) => {
    return roles.map(role => cleanUpStringNoUppercase(role)).join(", ");
}

export const cleanUpStringUppercase = (status: string) => {
    return status.toLowerCase().replaceAll(/_/g, " ").replace(/\b\w/g, function(l){ return l.toUpperCase() })
}

export const cleanUpInvestmentType = (investmentType: InvestmentType) => {
    return cleanUpStringUppercase(investmentType.name)
}
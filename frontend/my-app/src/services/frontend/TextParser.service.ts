import { InvestmentType } from "../../redux/features/api/types";

export const cleanUpStringNoUppercase = (role: string) => {
    return role.toLowerCase().replaceAll(/_/g, " ")
}

export const cleanUpArrayNoUppercase = (roles: Array<string>) => {
    return roles.map(role => cleanUpStringNoUppercase(role)).join(", ");
}

export const cleanUpStringUppercase = (string: string) => {
    if(string !== null) {
        return string.toLowerCase().replaceAll(/_/g, " ").replace(/\b\w/g, function(l){ return l.toUpperCase() })
    } 

    return "";
}

export const cleanUpInvestmentType = (investmentType: InvestmentType) => {
    return cleanUpStringUppercase(investmentType.name)
}
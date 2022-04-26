import { ChangeEvent } from "react";
import { ValidatedObject } from "../types/GeneralTypes";
import _ from "lodash"

export const handlePasswordChange = ({ target: { value, validity } }: ChangeEvent<HTMLInputElement>): ValidatedObject<string> => {
    let output: ValidatedObject<string> = {
        value: value,
        valid: true,
        errorValue: ""
    };

    if(!validity.valid) {
        output.valid = false;
        let errorMessage = "";
        if(validity.valueMissing) {
            errorMessage = "Wachtwoord is verplicht";
        } else if(validity.patternMismatch) {
            errorMessage = "Wachtwoorden komen niet overeen"
        }
        output.errorValue = errorMessage;
    }

    return output;
}

export const handleNameChange = ({ target: { value, validity } }: ChangeEvent<HTMLInputElement>): ValidatedObject<string> => {
    let output: ValidatedObject<string> = {
        value: value,
        valid: true,
        errorValue: ""
    };

    if(!validity.valid) {
        output.valid = false;
        let errorMessage = "";
        if(validity.valueMissing) {
            errorMessage = "Naam is verplicht";
        } else if(validity.tooShort) {
            errorMessage = "Naam moet langer dan 2 karakters zijn";
        }
        output.errorValue = errorMessage;
    }
        

    return output;
}

export const handleEmailChange = ({ target: { value, validity } }: ChangeEvent<HTMLInputElement>): ValidatedObject<string> => {
    let output: ValidatedObject<string> = {
        value: value,
        valid: true,
        errorValue: ""
    };

    if(!validity.valid) {
        output.valid = false;
        let errorMessage = "";
        if(validity.valueMissing) {
            errorMessage = "E-mail is verplicht"
        } else if(validity.typeMismatch) {
            errorMessage = "Ongeldig e-mail adres"
        }
        output.errorValue = errorMessage;
    }

    return output;
}

export const handleCompanyNrChange = ({ target: { value, validity } }: ChangeEvent<HTMLInputElement>): ValidatedObject<string> => {
    let output: ValidatedObject<string> = {
        value: value.replace(/\D/g, ""),
        valid: true,
        errorValue: ""
    };

    if(!validity.valid) {
        output.valid = false;
        let errorMessage = "";
        if(validity.valueMissing) {
            errorMessage = "Ondernemingsnummer is verplicht"
        } else if(validity.patternMismatch) {
            errorMessage = "Ongeldig ondernemingsnummer"
        }
        output.errorValue = errorMessage;
    }

    return output;
}

export const handleTotalAmountInputChange = ({ target: { value, validity } }: ChangeEvent<HTMLInputElement>): ValidatedObject<number>=> {
    let output: ValidatedObject<number> = {
        value: parseFloat(value),
        valid: true,
        errorValue: ""
    };

    if(!validity.valid) {
        output.valid = false;
        let errorMessage = "";
        if(validity.badInput) {
            errorMessage = "Foutieve input"
        } else if(validity.rangeUnderflow){
            errorMessage = "Totaalbedrag moet groter dan \u20ac 1000 zijn"
        }
        output.errorValue = errorMessage;
    }

    return output;
}

export const handleFinancedAmountInputChange = ({ target: { value, validity } }: ChangeEvent<HTMLInputElement>): ValidatedObject<number> => {
    let output: ValidatedObject<number> = {
        value: parseFloat(value),
        valid: true,
        errorValue: ""
    };


    if(!validity.valid) {
        output.valid = false;
        let errorMessage = "";
        if(validity.badInput) {
            errorMessage = "Foutieve input"
        } else if(validity.rangeUnderflow) {
            errorMessage = "Zelf gefinancieerd bedrag moet groter dan \u20ac 1000 zijn"
        } else if(validity.rangeOverflow) {
            errorMessage = "Zelf gefinancieerd bedrag  moet kleiner dan totaalbedrag zijn"
        }
        output.errorValue = errorMessage;
    }

    return output;
}

const convertStringToDate = (dateString: string): Date => {
    return new Date(parseInt(dateString.substring(0,4)), parseInt(dateString.substring(4,6)), parseInt(dateString.substring(6,8)))
}

export const handleBirthDateChange = ({ target: { value, validity } }: ChangeEvent<HTMLInputElement>): ValidatedObject<Date> => {
    let output: ValidatedObject<Date> = {
        value: convertStringToDate(value),
        valid: true,
        errorValue: ""
    };

    if(!validity.valid) {
        output.valid = false;
        let errorMessage = "";;
        if(validity.valueMissing) {
            errorMessage = "Geboortedatum is verplicht";
        } else if(validity.rangeOverflow) {
            errorMessage = "Een klant van omega moet minstens 18 jaar oud zijn";
        }
        output.errorValue = errorMessage;
    }
    
    return output;
}

export const handleTownShipChange = ({ target: { value, validity } }: ChangeEvent<HTMLInputElement>): ValidatedObject<string> => {
    let output: ValidatedObject<string> = {
        value: value,
        valid: true,
        errorValue: ""
    };

    if(!validity.valid) {
        output.valid = false;
        let errorMessage = "";
        if(validity.valueMissing) {
            errorMessage = "Gemeente is verplicht"
        } else if(validity.tooShort) {
            errorMessage = "Naam van gemeente moet minstens 2 letters lang zijn"
        } else if(validity.patternMismatch) {
            errorMessage = "Naam van gemeente kan enkel letters en het liggend streepje (-) bevatten"
        }
        output.errorValue = errorMessage;
    }

    return output;
}

export const handleHomeNumberChange = ({ target: { value, validity } }: ChangeEvent<HTMLInputElement>): ValidatedObject<number> => {
    let output: ValidatedObject<number> = {
        value: parseInt(value),
        valid: true,
        errorValue: ""
    };

    if(!validity.valid) {
        output.valid = false;
        let errorMessage = ""
        if(validity.valueMissing) {
            errorMessage = "Huisnummer is verplicht"
        } else if(validity.rangeUnderflow) {
            errorMessage = "Huisnummer kan niet kleiner dan 1 zijn"
        } else if(validity.badInput) {
            errorMessage = "Huisnummer kan enkels cijfers bevatten"
        }
        output.errorValue = errorMessage;
    }

    return output;
}

export const handleStreetNameChange = ({ target: { value, validity } }: ChangeEvent<HTMLInputElement>): ValidatedObject<string> => {
    let output: ValidatedObject<string> = {
        value: value,
        valid: true,
        errorValue: ""
    };

    if(!validity.valid) {
        output.valid = false;
        let errorMessage = "";
        if(validity.valueMissing) {
            errorMessage = "Straatnaam is verplicht"
        } else if(validity.tooShort) {
            errorMessage = "Straatnaam moet minstens 2 letters lang zijn"
        }
        output.errorValue = errorMessage;
    }

    return output;
}

export const handlePostalCodeChange = ({ target: { value, validity } }: ChangeEvent<HTMLInputElement>): ValidatedObject<number> => {
    let output: ValidatedObject<number> = {
        value: parseInt(value),
        valid: true,
        errorValue: ""
    };

    if(!validity.valid) {
        output.valid = false;
        let errorMessage = "";
        if(validity.valueMissing) {
            errorMessage = "Postcode is verplicht"
        } else if(validity.rangeUnderflow || validity.rangeOverflow) {
            errorMessage = "Postcodes zijn 4 cijfers lang"
        } else if(validity.badInput) {
            errorMessage = "Ongeldige postcode"
        }
        output.errorValue = errorMessage;
    }

    return output;
}

export const handleBirthplaceChange = ({ target: { value, validity } }: ChangeEvent<HTMLInputElement>): ValidatedObject<string> => {
    let output: ValidatedObject<string> = {
        value: value,
        valid: true,
        errorValue: ""
    };

    if(!validity.valid) {
        output.valid = false;
        let errorMessage = "";
        if(validity.valueMissing) {
            errorMessage = "Geboorteplaats is verplicht"
        } else if(validity.tooShort) {
            errorMessage = "Naam van geboorteplaats moet minstens 2 letters lang zijn"
        }
        output.errorValue = errorMessage;
    }

    return output;
}

export const handlePhoneNrChange  = ({ target: { value, validity } }: ChangeEvent<HTMLInputElement>): ValidatedObject<number> => {
    let output: ValidatedObject<number> = {
        value: parseInt(value),
        valid: true,
        errorValue: ""
    };

    if(!validity.valid) {
        output.valid = false;
        let errorMessage = "";
        if(validity.valueMissing) {
            errorMessage = "Telefoonnr is verplicht"
        } else if(validity.patternMismatch || validity.badInput) {
            errorMessage = "Ongeldig telefoonnr"
        }
        output.errorValue = errorMessage;
    }

    return output;
}

export const handleSocialRegistryNrChange = ({ target: { value, validity } }: ChangeEvent<HTMLInputElement>, selectedValues: Array<string>): ValidatedObject<number> => {
    let output: ValidatedObject<number> = {
        value: parseInt(value.replace(/\D/g, "")),
        valid: true,
        errorValue: ""
    };

    if(!validity.valid) {
        output.valid = false;
        let errorMessage = "";
        if(validity.valueMissing) {
            errorMessage = "Rijksregisternr. is verplicht"
        } else if(validity.patternMismatch) {
            errorMessage = "Ongeldig rijksregisternr."
        }
        output.errorValue = errorMessage;
    }

    return output;
}

export const handleRolesChange = (value: string, selectedValues: Array<string>): Array<string> => {
    if(_.includes(selectedValues, value)) {
         _.remove(selectedValues, (val) => val === value);

        return selectedValues;
    } 
    
    return [...selectedValues, value]
}

export const handleNoteChange = ({ target: { value, validity } }: ChangeEvent<HTMLTextAreaElement>): ValidatedObject<string> => {
    let output: ValidatedObject<string> = {
        value: value,
        valid: true,
        errorValue: ""
    };

    if(!validity.valid) {
        output.valid = false;
        let errorMessage = "";
        if(validity.valueMissing) {
            errorMessage = "Opmerking is verplicht"
        }
        output.errorValue = errorMessage;
    }

    return output;
}
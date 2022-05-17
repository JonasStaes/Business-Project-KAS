import {  ValidatedObject} from "../types/GeneralTypes";

export const updateStateAndErrors = <T,U>(propertyName: string, { value, valid, errorValue }: ValidatedObject<U>, data: T, dataSetter: Function) => {  

  let temp = {};

  Object.defineProperty(temp, "value", {
    enumerable: true,
      writable: true,
      value: value
  });

  Object.defineProperty(temp, `valid`, {
    enumerable: true,
    writable: true,
    value: valid
  });

  Object.defineProperty(temp, `errorValue`, {
    enumerable: true,
    writable: true,
    value: errorValue
  })

  let output = {};

  Object.defineProperty(output, propertyName, {
    enumerable: true,
    writable: true,
    value: temp
  });

  dataSetter({...data, ...output});
}

export const updateState = <T,U>(propertyName: string, value: U, data: T, dataSetter: Function) => {  
  let temp = {};

  Object.defineProperty(temp, propertyName, {
    enumerable: true,
      writable: true,
      value: value
  });

  dataSetter({...data, ...temp})
}

export const validateStateObject = (stateObject: Object): boolean => {
  let output: boolean = true;
  Object.values(stateObject).forEach(entry => {
    if(typeof entry === "object") {
      let { value, valid } = entry;
      if(value !== undefined) {
        output = output && valid;
        switch(typeof value) {
          case "string":
            output = output && value !== "";
            break;
          case "number":
            output = output && value !== 0;
            break;
          case "object":
            if(Array.isArray(value)) {
              output = output && value.length > 0;
            } else {
              output = output && value !== undefined;
            }
            break;
        }
      }
    }
  }) 
  return output;
}



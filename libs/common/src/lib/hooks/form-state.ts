import { useState, ChangeEvent } from 'react';
import { isArray } from 'util';

// export type FormSelector<T> = (form: T) => T[keyof T];
/**
 * Custom hook to handle form state
 * can take in an input change event and update the form state based on the input name
 * @param initialValue
 */
export function useFormState<T>(
    initialValue: T
): [T, ({ target }: ChangeEvent<HTMLInputElement>) => void, (name: string, value: any) => void, (name: string, index?: number) => void] {
    const [formValue, setFormValue] = useState<T>(initialValue);

    const handleInputChange = ({
        target,
    }: ChangeEvent<HTMLInputElement>): void => {
      console.log(target);
      if (target?.name) {
          const value = formValue[target.name];
          let newValue: any[] | string | number = target?.type === 'number'
            ? +target.value // To ensure number inputs result in number values
            : target.value;
          if (isArray(value)) {
            const index = +target.dataset.index;
            newValue = [...value.slice(0, index), newValue, ...value.slice(index + 1) ];
          }
          setFormValue({
              ...formValue,
              [target.name]: newValue,
          });
      }
    };

    const addItem = (name: string, value: any) => {
      if (formValue[name] && isArray(formValue[name])) {
        value = [ ...formValue[name], value];
      }
      setFormValue({
        ...formValue,
        [name]: value,
      });
    };

    const removeItem = (name: string, index: number) => {
      const value = [ ...formValue[name] ];
      value.splice(index, 1);
      console.log(value);
      setFormValue({
        ...formValue,
        [name]: value,
      });
    };

    return [formValue, handleInputChange, addItem, removeItem];
}

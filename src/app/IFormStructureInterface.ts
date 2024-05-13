export interface IFormStructureInterface {
  type: string; // radio, text
  label: string;
  name: string;
  value: string | IFormStructureInterface[];
  options?: {
    label: string;
    value: string | number | boolean;
  }[];
  validations?: {
    name: string;
    validator: string;
    message: string;
  }[];
}

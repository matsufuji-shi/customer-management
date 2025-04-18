export type Customer = {
  id: number;
  name: string;
  email: string;
  phone: number;
  address: string;
  company_name: string;
};

export class Items {
  protected item: Customer[];

  constructor(item: Customer[]) {
    this.item = item;
  }
}
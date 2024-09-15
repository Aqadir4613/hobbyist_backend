export interface Register {
  email: string;
  password: string;
  fullname: string;
  c_password: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface AddItem {
  user: string;
  file: any;
  item_desc: string;
  item_category: string;
  item_title: string;
  item_keywords: Array<string>;
  image_id: string;
  item_image: string;
  item_purchased_price: string;
  item_purchased_date: string;
  item_grading_cost: string;
  item_sold_price: string;
  item_sold_date: string;
}

export class TaskItem {
  public stamps: Date;
}

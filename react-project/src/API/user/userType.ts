//定义泛型
export type UserType<T> = {
  code: number;
  msg: string;
  error: string;
  serviceCode:number;
  data: T;
};

export {};

export class API {
  public static baseURL = 'http://gifkar.cloudapp.net:3002/api/';
  public static LOGIN = 'adminLogin';
  public static DASHBOARD = 'dashboard';
  public static DEPARTMENT = 'department';
  public static COURSE = 'course';
  public static CLASS = 'class';
  public static USER = 'user';
  public static FEEDBACK = 'feedback';
}

export class Constant {
  public static PAGINATION_ARRAY = [10, 20, 30];
  public static RECORDS_PER_PAGE = Constant.PAGINATION_ARRAY[0];
}

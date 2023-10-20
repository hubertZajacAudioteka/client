enum RoleName {
  Admin = 'admin',
  Employee = 'employee',
  Client = 'client',
}

export type Role = {
  id: string;
  name: string;
};

export type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  role?: Role;
};

export type UserFormRegister = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export type UserFormLogin = {
  email: string;
  password: string;
};

export type UserFormAdd = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  roleName: RoleName;
};

export type UserLoginResponse = {
  jwt: string;
  user: User;
};

export type UserRegisterResponse = {
  user: User;
};

export interface UserLoginError {
  data: {
    error: string;
  };
}

export interface UserRegisterError {
  data: {
    data: {
      email?: string;
      name?: string;
    };
  };
}

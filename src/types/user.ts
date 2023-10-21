enum RoleName {
  Admin = 'admin',
  Employee = 'employee',
  Client = 'client',
}

export interface Role {
  id: string;
  name: string;
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  role?: Role;
}

export interface UserFormRegister {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface UserFormLogin {
  email: string;
  password: string;
}

export interface UserFormAdd {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  roleName: RoleName;
}

export interface UserLoginResponse {
  jwt: string;
  user: User;
}

export interface UserRegisterResponse {
  user: User;
}

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

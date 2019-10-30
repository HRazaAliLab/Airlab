import ky from "ky";
import { apiUrl } from "@/env";
import { CreateUserDto, ProfileDto, UpdateProfileDto, UpdateUserDto, UserDto } from "@airlab/shared/lib/user/dto";

export const api = {
  async logInGetToken(username: string, password: string) {
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);

    return ky.post(`${apiUrl}/auth/login`, { body: params }).json();
  },
  async getMe(token: string) {
    return ky
      .get(`${apiUrl}/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<ProfileDto>();
  },
  async updateMe(token: string, data: UpdateProfileDto) {
    return ky
      .patch(`${apiUrl}/user/profile`, {
        json: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<ProfileDto>();
  },
  async getUsers(token: string) {
    return ky
      .get(`${apiUrl}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<UserDto[]>();
  },
  async updateUser(token: string, id: number, data: UpdateUserDto) {
    return ky
      .patch(`${apiUrl}/user/${id}`, {
        json: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<UserDto>();
  },
  async createUser(token: string, data: CreateUserDto) {
    return ky
      .post(`${apiUrl}/user`, {
        json: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<UserDto>();
  },
  async passwordRecovery(email: string) {
    return ky.post(`${apiUrl}/auth/password-recovery/${email}`).json();
  },
  async checkUserExists(email: string) {
    return ky.get(`${apiUrl}/users/check/${email}`).json<{ exists: boolean }>();
  },
  async signUp(data: CreateUserDto) {
    return ky
      .post(`${apiUrl}/api/v1/users/signup`, {
        json: data,
      })
      .json();
  },
  async resetPassword(password: string, token: string) {
    return ky
      .post(`${apiUrl}/auth/reset-password/`, {
        json: {
          newPassword: password,
          token,
        },
      })
      .json();
  },
};

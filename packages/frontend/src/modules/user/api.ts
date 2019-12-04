import ky from "ky";
import { apiUrl } from "@/env";
import {
  CreateUserDto,
  ProfileDto,
  UpdatePasswordDto,
  UpdateProfileDto,
  UpdateUserDto,
  UserDto,
} from "@airlab/shared/lib/user/dto";

export const api = {
  async logInGetToken(username: string, password: string) {
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);

    return ky.post(`${apiUrl}/auth/login`, { body: params }).json();
  },
  async getMe(token: string) {
    return ky
      .get(`${apiUrl}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<ProfileDto>();
  },
  async updateMe(token: string, data: UpdateProfileDto) {
    return ky
      .patch(`${apiUrl}/users/profile`, {
        json: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<ProfileDto>();
  },
  async updatePassword(token: string, data: UpdatePasswordDto) {
    return ky
      .patch(`${apiUrl}/users/profile/password`, {
        json: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<ProfileDto>();
  },
  async getUsers(token: string) {
    return ky
      .get(`${apiUrl}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<UserDto[]>();
  },
  async getUser(token: string, id: number) {
    return ky
      .get(`${apiUrl}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<UserDto>();
  },
  async updateUser(token: string, id: number, data: UpdateUserDto) {
    return ky
      .patch(`${apiUrl}/users/${id}`, {
        json: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<UserDto>();
  },
  async createUser(token: string, data: CreateUserDto) {
    return ky
      .post(`${apiUrl}/users`, {
        json: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<UserDto>();
  },
  async passwordRecovery(email: string) {
    return ky.post(`${apiUrl}/auth/password-recovery/${email}`);
  },
  async checkUserExists(email: string) {
    return ky.get(`${apiUrl}/auth/check/${email}`).json<{ exists: boolean }>();
  },
  async signUp(data: CreateUserDto) {
    return ky
      .post(`${apiUrl}/auth/signup`, {
        json: data,
      })
      .json<UserDto>();
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

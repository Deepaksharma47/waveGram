import { Optional } from "sequelize";

export interface AdminAttributes {
  id: number; // Optional because it's auto-incremented
  profilePhoto?: string | null; // Nullable
  firstName: string; // Required
  lastName?: string | null; // Nullable
  email: string; // Required
  mobileNumber?: string | null; // Nullable
  address?: string | null; // Nullable
  city?: string | null; // Nullable
  zipCode?: string | null; // Nullable
  state?: string | null; // Nullable
  gender?: 'Male' | 'Female' | 'Other' | null; // Enum with Nullable
  dob?: Date | null; // Nullable
  password?: string; // Required
  isActive?: boolean; // Defaults to true
  isDeleted?: boolean; // Defaults to false
  roleId:number
}

export interface AdminCreationAttributes extends Optional<AdminAttributes, 'id'> {}


// Friend attributer
export interface FriendAttributed {
  id: number; // Optional because it's auto-incremented
  friend1:number;
  friend2:number;
  status?: boolean; // Nullable
  isDeleted?: boolean; // Defaults to false
  deletedAt?:  Date | null; // Nullable
}
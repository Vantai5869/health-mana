import { type } from "os";

export interface BookingState {
  listBookings: { items: any; meta: any };
  loading: boolean;
  deleteStatusBooking: boolean;
  errors: object;
}

export interface BookingRes {
  id: string;
  merchantId?: number;
  sku?: string;
  code?: string;
  name?: string;
  description?: string;
  image?: string;
}

export interface BookingReq {
  // pageSize: number;
}

export interface AddBookingReq {
  merchantId?: number;
  sku?: string;
  code?: string;
  name?: string;
  description?: string;
  image?: string;
}

export interface AddBookingRes {
  message: string;
}

export interface EditBookingRes {
  message: string;
}

export interface EditBookingReq {
  id: string;
  merchantId?: number;
  sku?: string;
  code?: string;
  name?: string;
  description?: string;
  image?: string;
}
export interface EditBookingName {
  name: string;
}

export interface DeleteBookingRes {
  message: string;
}

export interface DeleteBookingReq {
  id: string;
}

export interface GetBookingReq {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
}
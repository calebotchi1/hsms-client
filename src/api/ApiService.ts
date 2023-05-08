import api from "./axios";

export interface IRoom {
  id: string;
  type: string;
  maxNumberOfStudents: number;
  numBathrooms: number;
  availableBeds: number;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface IHostel {
  id: number;
  name: string;
  description: string;
  pictures: string[];
  location: string;
  createdAt: string;
  updatedAt: string;
  rooms: IRoom[];
}

export interface IBooking {
  id: number;
  amountPaid: number;
  reference: string;
  paymentAdvice: PaymentAdvice;
  createdAt: string;
  updatedAt: string;
  student: Student;
  hostel: Hostel;
  room: Room;
}

export interface PaymentAdvice {
  id: number;
  domain: string;
  status: string;
  reference: string;
  amount: number;
  message: any;
  gateway_response: string;
  paid_at: string;
  created_at: string;
  channel: string;
  currency: string;

  fees: number;
  fees_split: any;

  plan: any;

  order_id: any;
  paidAt: string;
  createdAt: string;
  requested_amount: number;
  pos_transaction_data: any;
  source: any;
  fees_breakdown: any;
  transaction_date: string;
}

export interface Student {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  password: string;
  apiKey: string;
  createdAt: string;
  updatedAt: string;
}

export interface Hostel {
  id: number;
  name: string;
  pictures: string[];
  location: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  rooms: Room[];
}

export interface IAllocationData {
  students: Student[];
  hostels: IHostel[];
}

export interface Room {
  id: string;
  type: string;
  maxNumberOfStudents: number;
  availableBeds: number;
  numBathrooms: number;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export type CreateHostelRequest = {
  name: string;
  location: string;
  description: string;
  pictures: string[];
};
export type UpdateHostelRequest = {
  name: string;
  location: string;
  description: string;
};
export class ApiService {
  getStudentHostels() {
    return api.get<Array<any>>("/student/hostels");
  }

  getStudentHostelDetail(id: number) {
    return api.get<any>(`/student/hostels/${id}`);
  }

  loginStudent(email: string, password: string) {
    return api.post<any>("/student/login", {
      email: email,
      password: password,
    });
  }
  registerStudent(
    firstName: string,
    lastName: string,
    studentId: string,
    email: string,
    password: string
  ) {
    return api.post<any>("/student/register", {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      studentId: studentId,
    });
  }

  makeStudentReservation(
    reference: string,
    roomId: string,
    amountPaid: number
  ) {
    return api.post<any>("/student/reservation", {
      reference: reference,
      roomId: roomId,
      amountPaid: amountPaid,
    });
  }

  getStudentBooking() {
    return api.get<any>(`/student/bookings`);
  }

  //Admin specific actions
  getHostelBooking() {
    return api.get<any>(`/admin/bookings`);
  }

  loginAdmin(email: string, password: string) {
    return api.post<any>("/admin/login", {
      email: email,
      password: password,
    });
  }

  createHostel(formData: FormData) {
    return api.post<any>("/admin/hostel", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  updateHostel(hostelId: number, updateHostelRequest: UpdateHostelRequest) {
    return api.put<any>("/admin/hostel/" + hostelId, updateHostelRequest);
  }

  getRoomAllocationData() {
    return api.get<any>(`/admin/allocations`);
  }

  makeManualStudentReservation(roomId: string, studentId: string) {
    return api.post<any>("/admin/allocations", {
      roomId: roomId,
      studentId: studentId,
    });
  }

  addRoom(
    hostelId: number,
    roomId: string,
    price: number,
    numBathrooms: number,
    roomType: string
  ) {
    return api.post<any>("/admin/room", {
      hostelId: hostelId,
      roomId: roomId,
      price: price,
      numBathrooms: numBathrooms,
      type: roomType,
    });
  }
}

export default new ApiService();

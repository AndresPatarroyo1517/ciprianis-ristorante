export interface Order {
    _id: string;
    user: {
      _id: string;
      username: string;
      email: string;
    };
    dish: {
      _id: string;
      name: string;
      description: string;
      price: number;
      category: string;
      ingredients: string[];
      image: string;
      __v: number;
    };
    status: string;
    quantity: number;
    orderDate: string;
    __v: number;
}

export interface Orders {
  items: Order[]
}

export interface Reservation {
  _id: string;
  user?: string;
  numOfPersons: number;
  table: number;
  date: Date;
  startHour: Date;
  endHour: Date;
  status: 'Pendiente' | 'Confirmada' | 'Cancelada' | 'Finalizada';
}

export interface GroupedReservations {
  table: number;
  reservations: Reservation[];
}

export interface ReservationFormData {
  numOfPersons: number;
  table: number;
  date: string;
  startHour: string;
  endHour: string;
}
export interface User {
  username: string
  name: string
  email: string
  stayLoggedIn: boolean
  role: string
}
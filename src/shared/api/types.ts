export interface User {
  gender: string;
  name: Name;
  location: Location;
  email: string;
  login: Login;
  dob: BirthInfo;
  registered: RegistrationInfo;
  phone: string;
  cell: string;
  id: Identification;
  picture: ProfilePicture;
  nat: string;
}

export interface Name {
  title: string;
  first: string;
  last: string;
}

export interface Location {
  street: Street;
  city: string;
  state: string;
  country: string;
  postcode: string;
  coordinates: Coordinates;
  timezone: Timezone;
}

export interface Street {
  number: number;
  name: string;
}

export interface Coordinates {
  latitude: string;
  longitude: string;
}

export interface Timezone {
  offset: string;
  description: string;
}

export interface Login {
  uuid: string;
  username: string;
  password: string;
  salt: string;
  md5: string;
  sha1: string;
  sha256: string;
}

export interface BirthInfo {
  date: string;
  age: number;
}

export interface RegistrationInfo {
  date: string;
  age: number;
}

export interface Identification {
  name: string;
  value: string;
}

export interface ProfilePicture {
  large: string;
  medium: string;
  thumbnail: string;
}

export interface APIResponse {
  results: User[];
  info: PageInfo;
}

export interface PageInfo {
  seed: string;
  results: number;
  page: number;
  version: string;
}

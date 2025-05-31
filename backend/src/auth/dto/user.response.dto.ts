export class UserResponseDto {
  readonly user: {
    id: number;
    nombre: string;
    email: string;
  };
  readonly token: string;
}
export interface IRequest {
  associatedSkill: string;
  description: string;
  id: number;
  status: "PENDING" | "OPEN";
  title: string;
  user: string;
  userId: number;
}

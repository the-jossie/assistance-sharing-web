export interface IRequest {
  associatedSkill: string;
  description: string;
  id: number;
  status: "PENDING" | "OPEN";
  title: string;
  user: string;
  userId: number;
}

export interface IRequestOffer {
    id: number;
    pointScore: number;
    requestId: number;
    userId: number;
    username: string;
    skills: {
      experienceLevel: string;
      id: number;
      skillName: string;
    }[];
  }


import { UUID } from "crypto";
/**
 * used in ../club/new
 */
export type PostClub = {
  name: string; // @id - does not have äöå or whitespaces
};

export type ClubResponse = {
  name: string; // @id - does not have äöå or whitespaces
  nameNonId: string; // has whitespaces and öäå which were removed from name which is the ID
  creationDate: string;
  idCreator: number;
};

/**
 * this to posted to competition/new
 */
export type PostCompetition = {
  competitionName: string; // name is the id
  competitionType: "rifle" | "pistol";
  startDate?: number;
  endDate?: number;
};

/**
 * received from backend in competition/new ./query ./all
 */
export type CompetitionResponse = {
  competitionId: string; // name is the id - url frienldy
  displayName: string; //name but with öäå which were removed from name @id
  type: "rifle" | "pistol";
  startDate: string;
  endDate: string;
  creationDate: string;
};

/**
 * received from backend in /api/user/teams
 */
export interface UsersCompetition {
  competitionId: string;
  teamName: string;
  clubName: string;
  teamDisplayName: string;
  teamMembers: Object[];
}

/**
 * add teams with this
 */
export type PostTeam = {
  competitionId: string; // CompetitionResponse.name
};

/**
 * returned after PostTeam
 */
export type TeamResponse = {
  clubId: string; // CompetitionResponse.name
  competitionId: string; // CompetitionResponse.name
};

/**
 * POST to api/competition/team/member/score/add
 */
export type PostScore = {
  competitionName: string; //@compId - CompetitionResponse.name
  ScoreList: number[]; // values may range from 0 - 10.9, otherwise they are not accepted
};

export type ScoreType = "update" | "set";
/**
 * received after posting a score to backend
 */
export type TeamMemberScore = {
  userId: number;
  clubId: string;
  competitionId: string;
  uuid: UUID;
  sum: number;
  bullsEyeCount: number;
  scorePerShot: string;
  creationDate: string;
};

export type loginResponse = {
  user: User;
  token: string; // add "Bearer "+ token when doing authorization
};

export type User = {
  username: string;
  legalName: string;
  email: string;
  id: number;
  roles: string[];
  creationDate: string;
  club: string | null;
};
/**
 * returned from ./competition/result/${competitionName} -endpoint
 */
export type competitionResults = {
  competitionId: string;
  displayName: string;
  creationDate: string;
  type: "rifle" | "pistol";
  startDate: string;
  endDate: string;
  teams: competitionResultsTeam[] | null;
};
export type competitionResultsTeam = {
  teamName: string;
  teamDisplayName: string;
  totalScore: number;
  scores: competitionResultsUser[] | null;
};

export type competitionResultsUser = {
  bullsEyeCount: number;
  sum: number;
  userId: number;
  name: string; // name associated with the userId
  scorePerShot: string; // ScoreList.toString()
  creationDate: string;
};

export type TTeam = {
  clubName: string;
  competitionId: string;
  teamName: string;
  teamDisplayName: string;
  teamMembers?: TTeamMember[];
};

export type TTeamMember = {
  userId: number;
  competitionId: string;
  teamName: string;
  legalName: string;
};

/**
 * get club and competition data with this ./club|competition/query?search=&page=0&size=5
 */
export type queryResult = {
  content: ClubResponse[] | CompetitionResponse[] | null;
  pageable: Pageable;
  last: boolean; // isLastPage
  totalElements: number; // how many element are there in the DB
  totalPages: number; // how many pages are there wi
  size: number;
  first: true;
  number: number;
  numberOfElements: number; //in this page
  empty: boolean;
};

/**
 * get competition data /api/competition/query?...
 */
export type QueryCompetition = {
  content: CompetitionResponse[] | null;
  pageable: Pageable;
  last: boolean; // isLastPage
  totalElements: number; // how many element are there in the DB
  totalPages: number; // how many pages are there wi
  size: number;
  first: true;
  number: number;
  numberOfElements: number; //in this page
  empty: boolean;
};

export type QueryClub = {
  content: ClubResponse[] | null;
  pageable: Pageable;
  last: boolean; // isLastPage
  totalElements: number; // how many element are there in the DB
  totalPages: number; // how many pages are there wi
  size: number;
  first: true;
  number: number;
  numberOfElements: number; //in this page
  empty: boolean;
};

/**
 * get competition data /api/admin/user/query?...
 */
export type AdminQueryUser = {
  content: AdminUser[] | null;
  pageable: Pageable;
  last: boolean; // isLastPage
  totalElements: number; // how many element are there in the DB
  totalPages: number; // how many pages are there wi
  size: number;
  first: true;
  number: number;
  numberOfElements: number; //in this page
  empty: boolean;
};

export type AdminUser = {
  username: string;
  legalName: string;
  email: string;
  id: number;
  roles: Role[];
  creationDate: string;
  partOfClub: string | null;
  lastLogin: string;
};

export type Role = {
  userId: number;
  role: string;
};

export type Pageable = {
  pageNumber: number; // current page
  pageSize: number; // current page size
};

export type ImageProof = {
  fileName: string;
  image: string;
};


export enum AdminViewType {
    Users,
    CreateClub,
    ImageViewer,
    CreateCompetition,
    Other
}

export type CompetitionType = "rifle" | "pistol";

export type captchaResponse = {
  success: boolean,
  challenge_ts: string,
  hostname: string
}

export type CompetitionTeamsResponse = {
  content: CompetitionTeam[] | null;
  pageable: Pageable;
  last: boolean; // isLastPage
  totalElements: number; // how many element are there in the DB
  totalPages: number; // how many pages are there wi
  size: number;
  first: true;
  number: number;
  numberOfElements: number; //in this page
  empty: boolean;
};

export type CompetitionTeam = {
  competitionId: string,
  teamName: string,
  clubName: string,
  teamDisplayName: string,
  teamMembers: TeamMember[]
}

export type TeamMember = {
  userId: 2,
  competitionId: string,
  teamName: string,
  legalName: string
}

export interface CaptchaPostBody {
  captchaToken: string;
}
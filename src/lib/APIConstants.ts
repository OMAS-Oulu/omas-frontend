export const baseURL: string = "https://localhost:8080";

export const loginURL: string = baseURL + "/api/login";

export const registrationURL: string = baseURL + "/api/reg";

const compQuery: string = "/api/competition/query";

const comp: string = "/api/competition";

const compResultQuery = "/api/competition/result";

const clubQuery: string = "/api/club/query";

export const getCompetitionsQueryUrl = (
  search: string = "",
  page: number,
  size: number = 10
): string => {
  return `${baseURL}${compQuery}?search=${search}&page=${page}&size=${size}`;
};

export const getCompetitionByNameUrl = (name: string) => {
  return `${baseURL}${compResultQuery}/${name}`;
};

export const getCompetitionByIdUrl = (id: string) => {
  return `${baseURL}${comp}/${id}`;
};

export const getClubQueryUrl = (
  search: string = "",
  page: number,
  size: number = 10
): string => {
  return `${baseURL}${clubQuery}?search=${search}&page=${page}&size=${size}`;
};
/**
 * älä käytä tälläistä, käytä getClubQueryUrl()
 */
export const getAllClubsURL: string = baseURL + "/api/club/all";

/**
 * älä käytä tälläistä, käytä getCompetitionsQueryUrl()
 */
export const getAllCompetitionsURl: string = baseURL + "/api/competition/all";

export const addCompetitionURL: string = baseURL + "/api/auth/competition/new";

export const addClubURL: string = baseURL + "/api/auth/club/new";

export const joinClubURL: string = baseURL + "/api/auth/club/join";

export const changeClubKeyURL: string = baseURL + "/api/club/setPasskey";

export const getClubByIdURL = (id: string) => {
  return `${baseURL}/api/club/${id}`;
};

export const addTeamToCompetitionURL: string =
  baseURL + "/api/competition/team/new";

export const addTeamMemberURL: string =
  baseURL + "/api/competition/team/member/add";

export const addScore: string =
  baseURL + "/api/competition/team/member/score/add";

export const addScoreSum: string =
  baseURL + "/api/competition/team/member/score/add/sum";

export const getTeamsByCompetitionIdURL = (id: string) => {
  return `${baseURL}${comp}/teams/${id}`;
};

export const getCompetitionInfoQueryURL = (
  id: string,
  page: number = 0,
  size: number = 10
) => {
  return `${baseURL}${comp}/teams?search=${id}&page=${page}&size=${size}`;
};

export const getTeamMembersURL = (teamName: string, competitionId: string) => {
  return `${baseURL}${comp}/team?team=${teamName}&competition=${competitionId}`;
}

export const getForgotPasswordUrl = () => {
  return `${baseURL}/api/forgot_password`;
}

export const getResetPasswordUrl = (token: string, newPassword: string) => {
  return `${baseURL}/api/reset_password?token=${token}&password=${newPassword}`;
};

export const getAdminUserQueryUrl = (
  search: string = "",
  page: number,
  size: number = 10
  ) => {
  return `${baseURL}/api/admin/user/query?search=${search}&page=${page}&size=${size}`
};

export const getAdminPromoteUserUrl = () => {
  return `${baseURL}/api/admin/promote`;
}

export const getAdminDemoteUserUrl = () => {
  return `${baseURL}/api/admin/demote`;
}

export const getAdminDeleteUserUrl = () => {
  return `${baseURL}/api/admin/delete`;
}

export const getFileDownloadUrl = () => {
  return `${baseURL}/api/file/download`;
}

export const getFileUploadUrl = () => {
  return `${baseURL}/api/file/upload`;
}

export const getUpdatePasswordUrl = () => {
  return `${baseURL}/api/updatePassword`;
}

export const getUpdateEmailUrl = () => {
  return `${baseURL}/api/updateEmail`;
}
 
//Get all users competitions and teams
//https://localhost:8080/api/user/teams

export const getUserCompetitions = () => {
  return `${baseURL}/api/user/teams`;
};

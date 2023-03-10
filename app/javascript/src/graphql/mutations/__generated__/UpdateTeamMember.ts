/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateTeamMember
// ====================================================

export interface UpdateTeamMember_updateTeamMember_errors {
  __typename: "FormError";
  /**
   * Which field this error came from
   */
  path: string | null;
  /**
   * A description of the error
   */
  message: string;
}

export interface UpdateTeamMember_updateTeamMember_user_roles {
  __typename: "RolesUser";
  id: string;
  name: string;
  companyId: string;
}

export interface UpdateTeamMember_updateTeamMember_user_teams {
  __typename: "Team";
  id: string;
  name: string;
  companyId: string;
}

export interface UpdateTeamMember_updateTeamMember_user_companies {
  __typename: "Company";
  id: string;
  name: string;
  logoUrl: string | null;
}

export interface UpdateTeamMember_updateTeamMember_user {
  __typename: "User";
  id: string;
  fullName: string;
  profileUrl: string | null;
  roles: UpdateTeamMember_updateTeamMember_user_roles[] | null;
  teams: UpdateTeamMember_updateTeamMember_user_teams[] | null;
  companies: UpdateTeamMember_updateTeamMember_user_companies[] | null;
}

export interface UpdateTeamMember_updateTeamMember {
  __typename: "UpdateTeamMemberPayload";
  success: boolean;
  errors: UpdateTeamMember_updateTeamMember_errors[];
  user: UpdateTeamMember_updateTeamMember_user;
}

export interface UpdateTeamMember {
  updateTeamMember: UpdateTeamMember_updateTeamMember | null;
}

export interface UpdateTeamMemberVariables {
  id: string;
  fullName: string;
  companyId: string;
  role: string;
}

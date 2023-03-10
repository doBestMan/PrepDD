/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserDetails
// ====================================================

export interface UserDetails_user_roles {
  __typename: "RolesUser";
  id: string;
  name: string;
  companyId: string;
}

export interface UserDetails_user_teams {
  __typename: "Team";
  id: string;
  name: string;
  companyId: string;
}

export interface UserDetails_user_companies {
  __typename: "Company";
  id: string;
  name: string;
  logoUrl: string | null;
}

export interface UserDetails_user {
  __typename: "User";
  id: string;
  email: string;
  fullName: string;
  profileUrl: string | null;
  roles: UserDetails_user_roles[] | null;
  teams: UserDetails_user_teams[] | null;
  companies: UserDetails_user_companies[] | null;
}

export interface UserDetails {
  /**
   * Return details of a user
   */
  user: UserDetails_user;
}

export interface UserDetailsVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateTask
// ====================================================

export interface UpdateTask_updateTask_errors {
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

export interface UpdateTask_updateTask_task_userOwners {
  __typename: "User";
  id: string;
  email: string;
  fullName: string;
  profileUrl: string | null;
}

export interface UpdateTask_updateTask_task_teamOwners {
  __typename: "Team";
  id: string;
  name: string;
}

export interface UpdateTask_updateTask_task_userReviewers {
  __typename: "User";
  id: string;
  email: string;
  fullName: string;
  profileUrl: string | null;
}

export interface UpdateTask_updateTask_task_teamReviewers {
  __typename: "Team";
  id: string;
  name: string;
}

export interface UpdateTask_updateTask_task {
  __typename: "Task";
  id: string;
  name: string | null;
  priority: string | null;
  status: string | null;
  dueDate: string | null;
  updatedAt: string | null;
  userOwners: UpdateTask_updateTask_task_userOwners[] | null;
  teamOwners: UpdateTask_updateTask_task_teamOwners[] | null;
  userReviewers: UpdateTask_updateTask_task_userReviewers[] | null;
  teamReviewers: UpdateTask_updateTask_task_teamReviewers[] | null;
}

export interface UpdateTask_updateTask {
  __typename: "UpdateTaskPayload";
  success: boolean;
  errors: UpdateTask_updateTask_errors[];
  task: UpdateTask_updateTask_task;
}

export interface UpdateTask {
  updateTask: UpdateTask_updateTask | null;
}

export interface UpdateTaskVariables {
  id: string;
  name?: string | null;
  description?: string | null;
  priority?: string | null;
  status?: string | null;
  dueDate?: string | null;
}

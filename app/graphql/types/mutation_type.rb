module Types
  class MutationType < GraphQL::Schema::Object
    field :updateCompanySettings, mutation: Mutations::UpdateCompanySettings
    field :removeCompanyMember, mutation: Mutations::RemoveCompanyMember
    field :updateTeamMember, mutation: Mutations::UpdateTeamMember
    field :removeTeamMember, mutation: Mutations::RemoveTeamMember
    field :addTeamMember, mutation: Mutations::AddTeamMember
    field :createTeam, mutation: Mutations::CreateTeam
    field :createCompany, mutation: Mutations::CreateCompany
    field :updateUserNotificatiosn, mutation: Mutations::UpdateUserNotificatiosn
    field :updateUserPassword, mutation: Mutations::UpdateUserPassword
    field :updateUserData, mutation: Mutations::UpdateUserData
    field :sign_in_user, mutation: Mutations::SignInUser
    field :sign_up_user, mutation: Mutations::SignUpUser
    field :sign_out_user, mutation: Mutations::SignOutUser
    field :send_reset_password_instructions,
          mutation: Mutations::SendResetPasswordInstructions
  end
end

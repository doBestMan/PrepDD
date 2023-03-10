class Mutations::AddTaskOwners < GraphQL::Schema::Mutation
  argument :taskID, ID, required: true
  argument :userOwners, [String], required: false
  argument :userReviewers, [String], required: false
  argument :teamOwners, [ID], required: false
  argument :teamReviewers, [ID], required: false

  field :task, Types::TaskType, null: false
  field :errors, [Types::FormErrorType], null: false
  field :success, Boolean, null: false

  def resolve(
    task_id: nil,
    user_owners: nil,
    user_reviewers: nil,
    team_owners: nil,
    team_reviewers: nil
  )
    response = { errors: [] }

    task = Task.find(task_id)

    task_user_owner_emails = task.user_owners.pluck(:email)
    task_team_owner_ids = task.team_owners.pluck(:id)

    if user_owners.present?
      new_users = user_owners - task_user_owner_emails
      new_users.each do |email|
        user = User.find_by_email(email)
        if !user
          password = Devise.friendly_token[0, 20]
          user =
            User.create(
              {
                email: email,
                password: password,
                password_confirmation: password
              }
            )

          role_id = Role.find_by_name('User').id
          company_id = context[:controller].current_user.last_viewed_company_id
          user_role =
            RolesUser.create(
              user_id: user.id, role_id: role_id, company_id: company_id
            )

          user_company =
            UsersCompany.create(user_id: user.id, company_id: company_id)
        end

        user.task_owners.create(task_id: task.id, owner_type: 'Owner')
      end
    end

    if user_reviewers.present?
      new_users = user_reviewers - task_user_owner_emails
      new_users.each do |email|
        user = User.find_by_email(email)
        if !user
          password = Devise.friendly_token[0, 20]
          user =
            User.create(
              {
                email: email,
                password: password,
                password_confirmation: password
              }
            )

          role_id = Role.find_by_name('User').id
          company_id = context[:controller].current_user.last_viewed_company_id
          user_role =
            RolesUser.create(
              user_id: user.id, role_id: role_id, company_id: company_id
            )

          user_company =
            UsersCompany.create(user_id: user.id, company_id: company_id)
        end

        user.task_owners.create(task_id: task.id, owner_type: 'Reviewer')
      end
    end

    if team_owners
      new_teams = team_owners - task_team_owner_ids
      new_teams.each do |id|
        team = Team.find(id)
        task_owners.create(task_id: task.id, owner_type: 'Owner')
      end
    end

    if team_reviewers
      new_teams = team_reviewers - task_team_owner_ids
      new_teams.each do |id|
        team = Team.find(id)
        task_owners.create(task_id: task.id, owner_type: 'Reviewer')
      end
    end

    response[:success] = true
    response[:task] = task
    response
  end
end

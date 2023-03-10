class Mutations::AddTeamMember < GraphQL::Schema::Mutation
  argument :team, String, required: true
  argument :companyId, ID, required: true
  argument :email, String, required: true
  argument :fullName, String, required: true
  argument :role, ID, required: true

  field :user, Types::UserType, null: false
  field :companies, [Types::CompanyType], null: false
  field :teams, [Types::TeamType], null: false
  field :role, Types::RoleType, null: false
  field :errors, [Types::FormErrorType], null: false
  field :success, Boolean, null: false

  def resolve(team: nil, email: nil, full_name: nil, role: nil, company_id: nil)
    response = { errors: [] }

    user = User.find_by_email(email)

    if !user.present?
      password = Devise.friendly_token[0, 20]
      user =
        User.create(
          {
            full_name: full_name,
            email: email,
            password: password,
            password_confirmation: password
          }
        )

      user_role =
        RolesUser.create(
          user_id: user.id, role_id: role, company_id: company_id
        )

      user_role.errors.messages&.each do |path, messages|
        messages.each do |message|
          response[:errors].push(
            { path: path.to_s.camelcase(:lower), message: message }
          )
          response[:success] = false
        end
      end
    end

    company = Company.find(company_id)

    if team.present?
      company_team = company.teams.where(name: team).first_or_create
      team_user = TeamsUser.create(user_id: user.id, team_id: company_team.id)

      team_user.errors.messages.each do |path, messages|
        messages.each do |message|
          response[:errors].push(
            { path: path.to_s.camelcase(:lower), message: message }
          )
          response[:success] = false
        end
      end
    end

    user_company =
      UsersCompany.where(user_id: user.id, company_id: company_id).first
    if !user_company.present?
      user_company =
        UsersCompany.create(user_id: user.id, company_id: company_id)
    end

    user&.errors.messages.each do |path, messages|
      messages.each do |message|
        response[:errors].push(
          { path: path.to_s.camelcase(:lower), message: message }
        )
        response[:success] = false
      end
    end

    companies = user.companies
    teams = user.teams.where(company_id: company_id)
    role = RolesUser.where(user_id: user.id, company_id: company_id).first&.role

    if user&.persisted?
      response[:success] = true
      response[:user] = user
      response[:companies] = companies
      response[:teams] = teams
      response[:role] = role
      response
    end

    response
  end
end

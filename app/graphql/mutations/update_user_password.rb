class Mutations::UpdateUserPassword < GraphQL::Schema::Mutation
  argument :password, String, required: true
  argument :oldPassword, String, required: true

  field :user, Types::UserType, null: true
  field :errors, [Types::FormErrorType], null: false
  field :success, Boolean, null: false

  def resolve(password: nil, old_password: nil)
    response = { errors: [] }

    if !context[:controller].user_signed_in?
      response[:errors].push(
        { path: 'root', message: 'Not authorized to do it' }
      )
      response[:success] = false
      return response
    end

    user = context[:controller].current_user

    if user.valid_password?(old_password)
      user.update({ password: password, password_confirmation: password })
    else
      response[:errors].push(
        { path: 'root', message: 'Current password is wrong' }
      )
      response[:success] = false
      return response
    end

    user.errors.messages.each do |path, messages|
      messages.each do |message|
        response[:errors].push(
          { path: path.to_s.camelcase(:lower), message: message }
        )
        response[:success] = false
      end
    end

    if user.persisted?
      context[:controller].sign_out
      context[:controller].sign_in(user)
      response[:user] = user
      response[:current_user] = { id: 'current_user', user: user }
      response[:success] = true
      response
    end

    response
  end
end

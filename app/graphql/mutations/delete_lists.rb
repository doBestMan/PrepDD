class Mutations::DeleteLists < GraphQL::Schema::Mutation
  argument :listIds, [ID], required: true

  field :errors, [Types::FormErrorType], null: false
  field :success, Boolean, null: false

  def resolve(list_ids: nil)
    response = { errors: [] }

    list_ids.each do |id|
      List.find(id).destroy!
    end

    response[:success] = true
    response
  end
end
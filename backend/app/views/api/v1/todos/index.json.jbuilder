json.data do
  json.array! @user_todos do |user_todo|
    json.extract! user_todo, :id, :name, :is_done, :is_trashed, :memo, :user_name
  end
end
class Api::V1::TodosController < Api::BaseApiController
  def index
    @user_todos = User.joins(:todos).select(
      "todos.id as id",
      "todos.name as name",
      "todos.is_done as is_done",
      "todos.is_deleted as is_deleted",
      "todos.memo as memo",
      "users.name as user_name").order("todos.updated_at DESC")
  end

  def create

  end

    private 
    
      def todo_params
      
      end
end



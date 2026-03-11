class Api::V1::TodosController < Api::BaseApiController
  
  def index
    @user_todos = User.joins(:todos).select(
      "todos.id as id",
      "todos.name as name",
      "todos.is_done as is_done",
      "todos.is_deleted as is_deleted",
      "todos.memo as memo",
      "users.name as user_name")
      .order("todos.updated_at DESC")
  end

  def show
    @user_todos = User.joins(:todos).select(
      "todos.id as id",
      "todos.name as name",
      "todos.is_done as is_done",
      "todos.is_deleted as is_deleted",
      "todos.memo as memo",
      "users.name as user_name").where(todos:{user_id:params[:id]})
      .order("todos.updated_at DESC")
  end

  def create
    begin
      Rails.logger.debug "This is a debug message"
      ActiveRecord::Base.transaction do
        @todo = Todo.new(todo_params)
        @todo.save!
        render :created_todo, status: :created
      end
    rescue => e
      Rails.logger.warn e
      render json: e, status: :unprocessable_content
    end
  end

  def update

  end

    private 
    
      def todo_params
        params.fetch(:todo, {}).permit(:name,:is_done,:is_deleted,:memo,:user_id)
      end
end



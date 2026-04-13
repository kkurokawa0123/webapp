class Api::V1::TodosController < Api::BaseApiController
  
  before_action :set_todo, only: [ :update]
  
  def index

    @user_todos = User.joins(:todos).select(
      "todos.id as id",
      "todos.name as name",
      "todos.is_done as is_done",
      "todos.is_trashed as is_trashed",
      "todos.memo as memo",
      "todos.is_deleted as is_deleted",
      "users.name as user_name")
      .order("todos.updated_at DESC")

    render json: { data: @user_todos }, status: :ok
  end

  def show

    @user_todos = Todo.active.joins(:user).select(
        "todos.id as id",
        "todos.name as name",
        "todos.is_done as is_done",
        "todos.is_trashed as is_trashed",
        "todos.memo as memo",
        "todos.is_deleted as is_deleted",
        "users.name as user_name").where(user_id: params[:id]).order(updated_at: :desc)
    
    render json: { data: @user_todos }, status: :ok
  end

  def create

    begin
      # Rails.logger.debug "[DEBUG] todo_params#{todo_params.inspect}"
      @todo = Todo.new(todo_params)
      if @todo.save!
        render json: { data: @todo },status: :created
      else
        render json: { data: [message: "Todo data failed to create - #{@todo.error.full_messages}"]}, status: :unprocessable_entity
      end
    rescue => e
      Rails.logger.warn e
      render json: { data: [message: "Internal Server Error"] }, status: :internal_server_error # 500t
    end
  end

  # PATCH/PUT /todos/:id
  def update

    begin
      # Rails.logger.debug "[DEBUG] todo_params#{todo_params.inspect}"
      if @todo.nil?
        render json: { error: "Todo not found" }, status: :not_found and return
      elsif @todo.update(todo_params)
        render json: { data: @todo }, status: :ok  # 200
      else
        render json: { data: [message: "Todo data failed to update - #{@todo.error.full_messages}"]}, status: :unprocessable_entity # 422
      end
    rescue => e
      Rails.logger.error e
      render json: { data: [message: "Internal Server Error"] }, status: :internal_server_error # 500t
    end
  end

  # PATCH /todos/bulk_delete?user_id=XXX
  def bulk_delete

    begin
      sql_response = Todo.active.mark_as_deleted_by_user(params[:user_id])
      render json: { data: [message: "bulk_delete is done",deleted_todo_count: sql_response] }, status: :ok 
    rescue => e
      Rails.logger.error e
      render json: { data: [message: "Internal Server Error"] }, status: :internal_server_error # 500t
    end
  end


  private 

    def set_todo
      @todo = Todo.find_by(id: params[:id])
    end
    
    def todo_params
      params.fetch(:todo, {}).permit(:name,:is_done,:is_trashed,:memo,:user_id,:is_deleted)
    end
end



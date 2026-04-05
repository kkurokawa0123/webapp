class Api::V1::TodosController < Api::BaseApiController
  
  before_action :set_todo, only: [ :update]
  
  def index
    @user_todos = User.joins(:todos).select(
      "todos.id as id",
      "todos.name as name",
      "todos.is_done as is_done",
      "todos.is_trashed as is_trashed",
      "todos.memo as memo",
      "users.name as user_name")
      .order("todos.updated_at DESC")

    if @user_todos.present?
      render json: { data: @user_todos }, status: :ok
    else
      render json: { message: "TODOが存在しません"}, status: :not_found
    end
  end

  def show
    @user_todos = User.joins(:todos).select(
      "todos.id as id",
      "todos.name as name",
      "todos.is_done as is_done",
      "todos.is_trashed as is_trashed",
      "todos.memo as memo",
      "users.name as user_name").where(todos:{user_id: params[:id]})
      .order("todos.updated_at DESC")
      
    if @user_todos.present?
      render json: { data: @user_todos }, status: :ok
    else
      render json: { message: "TODOが存在しません"}, status: :not_found
    end
  
  end

  def create
    begin
      Rails.logger.debug "This is a debug message"
      ActiveRecord::Base.transaction do
        @todo = Todo.new(todo_params)
        if @todo.save!
          render json: { data: @todo },status: :created
        else
          render json: { message: "TODO作成失敗" }, status: :unprocessable_entity
        end
      end
    rescue => e
      Rails.logger.warn e
      render json: { error: "Internal Server Error" }, status: :internal_server_error # 500t
    end
  end

  # PATCH/PUT /todos/:id
  def update
    if @todo.nil?
      render json: { error: "Todo not found" }, status: :not_found and return
    end

    if @todo.update(todo_params)
      render json: { data: @todo }, status: :ok  # 200
    else
      render json: { errors: @todo.errors.full_messages }, status: :unprocessable_entity # 422
    end
  rescue => e
    Rails.logger.error e
    render json: { error: "Internal Server Error" }, status: :internal_server_error # 500
  end


  private 

    def set_todo
      @todo = Todo.find_by(id: params[:id])
    end
    
    def todo_params
      params.fetch(:todo, {}).permit(:name,:is_done,:is_trashed,:memo,:user_id)
    end
end



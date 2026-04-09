class AddColumnTodos < ActiveRecord::Migration[7.1]
  def change
    add_column :todos, :is_trash, :boolean, default: false, null: false
  end
end

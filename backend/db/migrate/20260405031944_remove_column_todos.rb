class RemoveColumnTodos < ActiveRecord::Migration[7.1]
  def up
    remove_column :todos, :is_trash
  end

  def down
    add_column :todos, :is_trash, :boolean, default: false, null: false
  end
end

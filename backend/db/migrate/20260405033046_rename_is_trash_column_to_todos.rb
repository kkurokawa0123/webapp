class RenameIsTrashColumnToTodos < ActiveRecord::Migration[7.1]
  def change
    rename_column :todos, :is_trash, :is_trashed
  end
end

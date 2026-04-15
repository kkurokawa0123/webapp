namespace :delete_all_unnecessary_todos do
  desc "delete all unnecessary(is_deleted) todos"
  task is_deleted_todos: :environment do
    puts "=== is_deleted todos cleanup start ==="
    
    is_deleted_todos = Todo.where(is_deleted: 1)
    puts "deleting #{is_deleted_todos.count} unnecessary(is_deleted) todos....."
    is_deleted_todos.destroy_all
    
    puts "=== is_deleted todos cleanup done!==="
  end

end

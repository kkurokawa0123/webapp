# コマンド rake todo_cleanup:cleanup

namespace :todo_cleanup do
  desc "is_deleted = 1 のTodoを物理削除"
    task cleanup: :environment do
    puts "=== Todo cleanup start ==="
    todos = Todo.where(is_deleted: 1)

    count = todos.count
    puts "対象件数: #{count}"

    # 一括削除（高速）
    deleted_count = todos.delete_all

    puts "削除件数: #{deleted_count}"
    puts "=== Todo cleanup end ==="

    end
end

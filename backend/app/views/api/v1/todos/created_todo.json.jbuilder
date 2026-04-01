json.set! :todo do
  json.extract! @todo, :id, :name, :is_done, :is_deleted
end
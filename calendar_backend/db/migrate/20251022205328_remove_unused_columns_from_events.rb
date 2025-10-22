class RemoveUnusedColumnsFromEvents < ActiveRecord::Migration[7.1]
  def change
    remove_column :events, :name, :string
    remove_column :events, :start_time, :string
    remove_column :events, :end_time, :string
    remove_column :events, :memo, :string
  end
end

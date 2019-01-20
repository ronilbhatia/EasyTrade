class AddUniquenessToPortoflioSnapshotDateAndUserIdCombination < ActiveRecord::Migration[5.2]
  def change
    add_index :portfolio_snapshots, [:user_id, :date], unique: true
  end
end

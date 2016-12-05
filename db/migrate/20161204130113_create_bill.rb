class CreateBill < ActiveRecord::Migration[5.0]
  def change
    create_table :bills do |t|
      t.string :title, null: false
      t.belongs_to :loaner, foreign_key: {to_table: :users}
      t.belongs_to :debtor, foreign_key: {to_table: :users}
      t.integer :status, null: false
      t.float :debt, null: false
      t.timestamps
    end
  end
end

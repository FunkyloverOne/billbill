class CreateContactings < ActiveRecord::Migration[5.0]
  def change
    create_table :contactings, id: false do |t|
      t.belongs_to :user, foreign_key: true
      t.belongs_to :contact, foreign_key: {to_table: :users}
    end
    add_index :contactings,
              [:user_id, :contact_id],
              unique: true,
              name: 'index_contactings_on_user_and_contact'
  end
end

class CreateSettings < ActiveRecord::Migration[5.2]
  def change
    create_table :settings do |t|
      t.string :setting, null: false
      t.string :value, null: false
      t.timestamps
    end

    add_index :settings, :setting, unique: true
  end
end

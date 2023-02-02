class CreateReplacements < ActiveRecord::Migration[5.2]
  def change
    create_table :replacements do |t|
      t.string :find, null: false
      t.string :replace, null: false

      t.timestamps
    end

    add_index :replacements, :find, unique: true
  end
end

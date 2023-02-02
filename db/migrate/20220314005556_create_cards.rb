class CreateCards < ActiveRecord::Migration[5.2]
  def change
    create_table :cards do |t|
      t.string :name, null: false
      t.string :catgeory, null: false
      t.timestamps
    end

    add_index :cards, :name, unique: true
  end
end

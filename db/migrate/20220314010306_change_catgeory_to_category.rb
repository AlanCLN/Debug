class ChangeCatgeoryToCategory < ActiveRecord::Migration[5.2]
  def change
    rename_column :cards, :catgeory, :category
  end
end

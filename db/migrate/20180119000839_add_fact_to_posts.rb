class AddFactToPosts < ActiveRecord::Migration[5.1]
  def change
    add_column :posts, :fact, :integer
  end
end

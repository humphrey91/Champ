class Post < ApplicationRecord
  validates :title, presence: true
  validates :body, presence: true
  validates :published, inclusion: { in: [true, false] }
end

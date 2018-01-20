json.extract! post, :id, :title, :body, :fact, :published, :created_at, :updated_at
json.url post_url(post, format: :json)

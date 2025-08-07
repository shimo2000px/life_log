module ApplicationHelper
  def twitter_share_url(text, url)
    base_url = "https://twitter.com/intent/tweet"
    params = {
      text: text,
      url: url
    }.to_query
    "#{base_url}?#{params}"
  end
end

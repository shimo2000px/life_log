module ApplicationHelper
    def greeting_message
    hour = Time.current.hour
    case hour
    when 5..11
      "おはようございます"
    when 12..17
      "こんにちは"
    when 18..21
      "こんばんは"
    else
      "お疲れさまでした"
    end
  end
  
  def motivational_message
    messages = [
      "今日はどんな一日でしたか？",
      "小さな出来事も大切な思い出です",
      "あなたの日常を記録してみましょう",
      "今日の気持ちを言葉にしてみませんか？"
    ]
    messages.sample
  end
end

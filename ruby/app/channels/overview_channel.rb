class OverviewChannel < ApplicationCable::Channel
  def subscribed
    stream_from "overview_channel"
    logger.info "✅ Client subscribed to overview_channel"
  end

  def unsubscribed
    logger.info "❌ Client unsubscribed from overview_channel"
  end
end

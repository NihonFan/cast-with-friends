class EventsController < ApplicationController
  def index
    @events = policy_scope(Event)
  end

  def show
    # Episode.find(params[:episode_id])
  end

  def new
  end

  def create
  end
end

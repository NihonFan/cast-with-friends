class EventsController < ApplicationController
  def index
    @events = policy_scope(Event)
  end

  def show
  end

  def new
  end

  def create
  end
end

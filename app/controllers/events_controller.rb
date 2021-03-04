class EventsController < ApplicationController
  def index
    @events = policy_scope(Event)
  end

  def show
    @event = Event.find(params[:id])
    authorize @event

    # res = URI.open('https://www.listennotes.com/e/p/12171ce5c942402b87bea10ee18aff1c/')
    # res['location']

  end

  def new
    @event = Event.new
    authorize @event

    @episode = Episode.find(params[:episode_id])

  end

  def create
    @event = Event.new(booking_params)
    @event.user = current_user
    @event.episode = Episode.find(params[:episode_id])
    authorize @event
    if @event.save
      redirect_to user_path(@event.user)
    else
      render :new
    end
  end

  private

  def booking_params
    params.require(:event).permit(:date, :title, :description)
  end
end

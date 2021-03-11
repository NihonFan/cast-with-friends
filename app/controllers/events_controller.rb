class EventsController < ApplicationController

  skip_before_action :verify_authenticity_token

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

  def plays
    @event = Event.find(params[:id])
    authorize @event

    # @event.started_from = DateTime.current
    if @event.started_at == nil
      @event.started_at = Time.now
    end

    @event.paused_seconds += Time.now - @event.paused_at

    @event.state = "playing"
    # Time.now - @event.time_paused

    @event.save!

    EventChannel.broadcast_to(
      @event,
      "playing"
    )
  end

  def pauses

    @event = Event.find(params[:id])
    authorize @event
    @event.state = "paused"

    @event.paused_at = Time.now

    @event.save!

    EventChannel.broadcast_to(
      @event,
      "paused"
    )

  end

  private

  def booking_params
    params.require(:event).permit(:date, :title, :description)
  end
end

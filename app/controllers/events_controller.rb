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

    if @event.state == "playing"
      a
      EventChannel.broadcast_to(
        @event,
        "playing"
      )

    else


      # @event.started_from = DateTime.current
      if @event.started_at == nil
        @event.started_at = Time.now
      end
      if @event.paused_seconds != nil
        @event.paused_seconds += Time.now - @event.paused_at
      else
        @event.paused_seconds = 0
      end

      @event.state = "playing"
      # Time.now - @event.time_paused

      @event.save

      EventChannel.broadcast_to(
        @event,
        "playing"
      )
    end

  end

  def pauses
    @event = Event.find(params[:id])
    authorize @event

    if @event.state == "paused"
      EventChannel.broadcast_to(
        @event,
        "pause"
      )
    else

      @event.state = "paused"

      @event.paused_at = Time.now

      @event.save

      EventChannel.broadcast_to(
        @event,
        "pause"
      )
    end

  end

  private

  def booking_params
    params.require(:event).permit(:date, :title, :description)
  end
end

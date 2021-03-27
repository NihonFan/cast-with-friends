class EventsController < ApplicationController

  skip_before_action :verify_authenticity_token



  def index

    if params["title"].present?
      @events = policy_scope(Event).search_by_title_and_description(params["title"]["item"]).includes(:episode, episode: [:podcast]).order(date: :desc)
    else
      @events = policy_scope(Event).includes(:episode, episode: [:podcast]).where("date > ?", Time.now).order(date: :desc)
    end

  end

  def show
    @event = Event.find(params[:id])
    authorize @event

    # res = URI.open('https://www.listennotes.com/e/p/12171ce5c942402b87bea10ee18aff1c/')
    # res['location']

    expiration_time_in_seconds = 3600

    current_time_stamps = Time.now.to_i

    keys = {
      app_id: 'c8884b4e78204e869b61c7022282e104',
      app_certificate: '6b7de680b0354e6986cf0fc7094cff6d',
      channel_name: "#{@event.id}",
      uid: 0,
      role: AgoraDynamicKey::RTCTokenBuilder::Role::PUBLISHER,
      privilege_expired_ts: current_time_stamps + expiration_time_in_seconds
    }

    result = AgoraDynamicKey::RTCTokenBuilder.build_token_with_uid keys
    @temp_token = result

    @event.participant_list = @event.participant_list.push(current_user.id)

    @event.participant_list.uniq!
    @event.save!

    EventChannel.broadcast_to(
      @event,
      "user"
    )

    # @event = @event.order(date: :desc)
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

      EventChannel.broadcast_to(
        @event,
        "play"
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
        "play"
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

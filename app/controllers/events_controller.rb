class EventsController < ApplicationController
  def index
    @events = policy_scope(Event)
  end

  def show
  end

  def new
    @event = Event.new
    authorize @event
  end

  def create
    @event = Event.new(booking_params)

    @event.user = current_user

    authorize @event

    # @count = 0
    # if @game.bookings.present?
    #   @game.bookings.each do |booking|
    #     if @booking.booking_start < booking.booking_start && @booking.booking_end < booking.booking_start || @booking.booking_start  > booking.booking_end
    #       true
    #       @count += 1
    #       if @count == @game.bookings.length
    #         @booking.save
    #       end
    #     else
    #       flash.alert = "This game is unavailable to rent during your proposed dates. Please choose another set of dates."
    #     end
    #   end
    # else
    @booking.save
    # end

    redirect_to user_path(@event.user)
  end

  private

  def booking_params
    params.require(:event).permit(:date)
  end
end

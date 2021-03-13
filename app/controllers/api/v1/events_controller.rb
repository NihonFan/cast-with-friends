class Api::V1::EventsController < Api::V1::BaseController
  before_action :set_event, only: [ :show ]


  def show
  end

  private

  def set_event
    @event = Event.find(params[:id])
    authorize @event
  end

end

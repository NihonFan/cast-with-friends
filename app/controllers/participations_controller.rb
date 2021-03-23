class ParticipationsController < ApplicationController
  def new
  end

  def create
    @participation = Participation.new(event_id: params[:event_id], role: "Speaker")
    @participation.user = current_user

    authorize @participation

    if @participation.save
      redirect_to user_path(@participation.user)
    else
      flash[:notice] =  "You have already saved this event!"
      redirect_to(events_path)
    end

  end
end

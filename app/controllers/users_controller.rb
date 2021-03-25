class UsersController < ApplicationController
  def show
    @user = User.includes(participations: {event: {episode: :podcast }}).find(params[:id])
    authorize @user
  end

  # def edit
  #   @user = User.find(params[:id])
  #   authorize @user
  # end

  # def update
  #   @user = User.find(params[:id])
  #   @user.update(user_params)
  #   authorize @user

  #   if @user.save
  #     redirect_to user_path(@user)
  #   else
  #     render :edit
  #   end
  # end

# private
# def user_params
#   params.require(:user).permit(:avatar)
# end

end

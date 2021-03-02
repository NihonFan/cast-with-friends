class EventPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def create?
    if @user != record.event.user
      true
    else
      false
    end
  end

  def new?
    user.present?
  end

end

class EventPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def show?
     @record.participants.include?(@user) || @record.user == @user
  end

  def create?
    true
  end

  def new?
    user.present?
  end

  def plays?
    true
  end

  def pauses?
    true
  end

end

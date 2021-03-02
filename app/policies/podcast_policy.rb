class PodcastPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def show?
    true
  end

  def search?
    if @user == record
      true
    else
      false
    end
  end
end

require 'json'
require 'open-uri'

class PodcastsController < ApplicationController
  def index
    response = URI.open("https://listen-api.listennotes.com/api/v2/search?q=#{params["title"]["item"]}&sort_by_date=0&type=podcast&offset=0&len_min=10&len_max=60&published_before=1580172454000&published_after=0&only_in=title%2Cdescription&language=English&safe_mode=0",
    "X-ListenAPI-Key" => "80c7b589d011480eb77af2c8a8a7fe63")

    response_serialized = open(response).read

    json = JSON.parse(response_serialized)

    json["results"].each do |result|
      Podcast.create(LN_title: result["title_original"], LN_description: result["description_original"], LN_image_URL: result["image"], LN_podcast_id: result["id"])
    end



    @podcasts = policy_scope(Podcast)
  end

  def show

  end

  def search
    @user = User.find(params[:user_id])
    authorize @user
  end
end

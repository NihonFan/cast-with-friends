require 'json'
require 'open-uri'

class PodcastsController < ApplicationController
  skip_after_action :verify_policy_scoped, only: :index
  skip_after_action :verify_authorized, only: [:search, :show]

  def index
    response = URI.open("https://listen-api.listennotes.com/api/v2/search?q=#{params["title"]["item"]}&sort_by_date=0&type=podcast&offset=0&len_min=10&len_max=60&published_before=1580172454000&published_after=0&only_in=title%2Cdescription&language=English&safe_mode=0",
    "X-ListenAPI-Key" => ENV['LISTEN_API_KEY'])

    response_serialized = open(response).read

    json = JSON.parse(response_serialized)

    @podcasts_list = []

    json["results"].each do |result|

      podcast = Podcast.find_or_initialize_by(LN_podcast_id: result["id"])
      podcast.LN_title = result["title_original"]
      podcast.LN_description = result["description_original"]
      podcast.LN_image_URL = result["image"]

      podcast.save

      # podcast = Podcast.create(LN_title: result["title_original"], LN_description: result["description_original"], LN_image_URL: result["image"], LN_podcast_id: result["id"])
      @podcasts_list << podcast
    end

    @podcasts = @podcasts_list
  end

  def show
    @podcast = Podcast.find(params[:id])

    response = URI.open("https://listen-api.listennotes.com/api/v2/podcasts/#{@podcast.LN_podcast_id}",
    "X-ListenAPI-Key" => ENV['LISTEN_API_KEY'])

    response_serialized = open(response).read

    json = JSON.parse(response_serialized)

    @episodes_list = []


    json["episodes"].each do |episode|

      episode_try = Episode.find_or_initialize_by(LN_episode_id: episode["id"])
      episode_try.podcast = @podcast

      episode_try.LN_title = episode["title"]
      episode_try.LN_description = episode["description"]
      episode_try.LN_audio_URL = episode["audio"]

      episode_try.save

      # podcast = Podcast.create(LN_title: result["title_original"], LN_description: result["description_original"], LN_image_URL: result["image"], LN_podcast_id: result["id"])
      @episodes_list << episode_try
    end

    @episodes = @episodes_list

  end

  def search
  end
end

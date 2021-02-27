require 'test_helper'

class PodcastsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get podcasts_index_url
    assert_response :success
  end

  test "should get show" do
    get podcasts_show_url
    assert_response :success
  end

  test "should get search" do
    get podcasts_search_url
    assert_response :success
  end

end

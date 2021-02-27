require 'test_helper'

class ParticipationsControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get participations_new_url
    assert_response :success
  end

  test "should get create" do
    get participations_create_url
    assert_response :success
  end

end

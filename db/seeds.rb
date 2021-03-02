# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require "open-uri"

Bookmark.destroy_all

Participation.destroy_all


Event.destroy_all



User.destroy_all

puts "Seeding..."


ryan = User.new(username: "Ryan", email: "ryan@hello.org", password: "111111")
ryan.save
ade = User.new(username: "Ade", email: "ade@hello.org", password: "111111")
ade.save
lena = User.new(username: "Lena", email: "lena@hello.org", password: "111111")
lena.save
kristina = User.new(username: "Kristina", email: "kristina@hello.org", password: "111111")
kristina.save

podcast = Podcast.find_or_initialize_by(LN_podcast_id: 999999999)
podcast.LN_title = "Test Podcast"
podcast.LN_image_URL = "test.com"
podcast.LN_description = "test description"
podcast.save

episode = Episode.find_or_initialize_by(LN_episode_id: 999999999)
episode.LN_audio_URL = "audio.com"
episode.LN_title = "Test Episode"
episode.LN_description = "test episode description"
episode.podcast = podcast
episode.save

event_one = Event.new(title: "Top Comedy Podcast 'The Top' - Hosted by Ryan", description: "Please join in and have a great discussion with me! This is the first episode of 'The Top'", date: "2020/03/27" )
event_one.user = ryan
event_one.episode = episode
event_one.save

event_two = Event.new(title: "The Best Horror Discussion 'It Moves' by Ade", description: "I love horror podcasts and you will too, this is episode 32 of 'It Moves'", date: "2020/03/28" )
event_two.user = ade
event_two.episode = episode
event_two.save


event_three = Event.new(title: "Action podcast 'Hella Tough'", description: "This episode, ep. 42, of 'Hella Tough' is the best imo...let's chat while we listen", date: "2020/03/23" )
event_three.user = lena
event_three.episode = episode
event_three.save


bookmark_one = Bookmark.new
bookmark_one.user = ade
bookmark_one.event = event_one
bookmark_one.save

bookmark_two = Bookmark.new
bookmark_two.user = ryan
bookmark_two.event = event_two
bookmark_two.save

lena_part = Participation.new(role: "Speaker")
lena_part.user = lena
lena_part.event = event_one
lena_part.save

ade_part = Participation.new(role: "Speaker")
ade_part.user = ade
ade_part.event = event_one
ade_part.save

kristina_part = Participation.new(role: "Listener")
kristina_part.user = kristina
kristina_part.event = event_one
kristina_part.save

ryan_part = Participation.new(role: "Speaker")
ryan_part.user = ryan
ryan_part.event = event_two
ryan_part.save

puts "Seeding finished"



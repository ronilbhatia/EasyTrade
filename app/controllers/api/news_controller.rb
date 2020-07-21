require 'open-uri'

class Api::NewsController < ApplicationController
  def index
    url = "https://newsapi.org/v2/top-headlines?apiKey=#{Rails.application.credentials.news_key}&language=en&category=business&country=us"
    response = JSON.parse(open(url).read)

    render json: response
  end
  
  def show
    url = "https://newsapi.org/v2/everything?q=#{params[:id]}&sortBy=publishedAt&apiKey=#{Rails.application.credentials.news_key}&language=en&domains=wsj.com,nytimes.com,seekingalpha.com,yahoo.com"
    response = JSON.parse(open(url).read)

    render json: response
  end
end

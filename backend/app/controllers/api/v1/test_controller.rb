class Api::V1::TestController < ApplicationController
  def index
    render json: { message: "Hello Rails API!"}
  end
end

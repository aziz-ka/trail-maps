class SessionsController < ApplicationController

  def new
  end

  def create
    user = login(params[:username], params[:password])
    if user
      redirect_to root_path
    else
      render :new
    end
  end

  def destroy
    logout
    redirect_to root_path
  end

end

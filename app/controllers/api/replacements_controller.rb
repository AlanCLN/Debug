class Api::ReplacementsController < ApplicationController

  def create
    @replacement = Replacement.new(replacements_params)
    if @replacement.save
      render :show
    else
      render json: @replacement.errors.full_messages, status: 403
    end
  end

  def index
    @replacements = Replacement.all
    if @replacements
      render :index
    else
      render json: ['No replacements have been set'], status: 422
    end
  end

  def destroy
    @replacement = Replacement.find_by(id: params[:id])
    if @replacement
      @replacement.destroy
    else
      render json: ['Replacement cannot be found'], status: 422
    end
  end

  def update
    @replacement = Replacement.find_by(id: params[:id])
    render json: ['Could not find replacement'], status: 422 if !@replacement
    if @replacement.update(replacements_params)
      render :show
    else
      render json: ['Could not update'], status: 422
    end
  end

  private
  def replacements_params
    params.require(:replacement).permit(:find,:replace,:id)
  end

end
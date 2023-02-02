
class Api::CardsController < ApplicationController

  def create
    @card = Card.create(name: card_params[:name],category: card_params[:category])
    if @card
      render :show
    else
      render json: @card.errors.full_messages, status: 422
    end

  end

  def index
    @cards = Card.all
    if @cards
      render :index
    else
      render json: ['No cards have been registered'], status: 422
    end
  end

  def destroy
    @card = Card.find_by(id: params[:id])
    if @card
      @card.destroy
    else
      render json: ['Card could not be found'], status: 422
    end
  end

  def update
    @card = Card.find_by(id: params[:id])
    render json: ['Could not find card'],status: 422 if !@card
    if @card.update(card_params)
      render :show
    else
      render json: ['Could not update'], status: 422
    end
  end

  private

  def card_params
    params.require(:card).permit(:name,:category)
  end

end


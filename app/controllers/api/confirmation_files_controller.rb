require_relative '../../scripts/generate_confirmation_file.rb'
require_relative '../../scripts/generate_pull_sheet.rb'
require_relative '../../scripts/file_script_utils.rb'
require_relative '../../scripts/generate_packing_slip'

class Api::ConfirmationFilesController < ApplicationController

  def create
    
    if params['2']
      render json: ['Only two files can be uploaded'], status: 422
      return
    end

    orders = get_orders_from_params(params)

    replacements = {}
    Replacement.all.each{|replacement| replacements[replacement[:find]] = replacement[:replace]}
    replace_product_name!(orders,replacements)

    
    tracked_price = Setting.find_by(setting: 'tracking')[:value]
    # orders = remove_tracked_orders(orders,tracked_price)

    cards = {}
    Card.all.each{|card| cards[card[:name]] = card[:category]}
    
    files_for_frontend = {
      'confirmation_file'=> orders,
      'pullsheet'=> generate_pull_sheet(orders,cards),
      'packing_slips'=> generate_packing_slip(orders)
    }
    if files_for_frontend
      render json: files_for_frontend
    else
      render json: ['An error has occured while generating shipping confirmation'], status: 422
    end

  end

end


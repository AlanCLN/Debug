require_relative '../../scripts/generate_confirmation_file.rb'
require_relative '../../scripts/generate_pull_sheet.rb'
require_relative '../../scripts/file_script_utils.rb'
require_relative '../../scripts/generate_packing_slip'

class Api::ConfirmationFilesController < ApplicationController

  def create
    if !params['0'] || !params['1']
      render json: ['Please submit exactly two files by highlighting both files with CTRL or SHIFT'], status: 422
      return
    end
    if params['2']
      render json: ['Only two files can be uploaded'], status: 422
      return
    end

    replacements = Replacement.all
    orders_and_items_info_hash = get_orders_from_params(params, replacements)
    
    if !orders_and_items_info_hash
      render json: ['A "new file" was not submitted. Please check to see if the new file (larger file) has a "item-price" header'], status: 422
      return
    end

    unshipped_orders_info, new_order_items_info = orders_and_items_info_hash

    tracked_price = Setting.find_by(setting: 'tracking')[:value]
    tracked_packing_slips, untracked_packing_slips = generate_packing_slips(unshipped_orders_info, new_order_items_info, tracked_price)

    # generate_confirmation_file should return an array of order ids to the frontend
    # generate_pull_sheet should return a hashmap of all cards with quantity and sorted by card name
    # tracked and untracked packing slips are hashmaps with all the information for each order

    files_for_frontend = {
      'confirmation_file'=> generate_confirmation_file(unshipped_orders_info),
      'pullsheet'=> generate_pull_sheet(unshipped_orders_info, new_order_items_info),
      'tracked_packing_slips'=> tracked_packing_slips,
      'untracked_packing_slips'=> untracked_packing_slips
    }

    if files_for_frontend
      render json: files_for_frontend
    else
      render json: ['An error has occured while generating shipping confirmation'], status: 422
    end

  end

end


require_relative 'file_script_utils'

# packing_slips = {
#   address: {
#     products: {
#       [product-name]: quantity-purchased
#     }
#     recipientName: recipient-name,
#     shipAddress1: ship-address-1,
#     shipAddress2: ship-address-2,
#     shipAddress3: ship-address-3,
#     shipCity: ship-city,
#     shipState: ship-state,
#     shipPostalCode: ship-postal-code,
#     shipCountry: ship-country,
#   }
# }

def generate_packing_slip(orders)
  packing_slips = Hash.new{|h,k| h[k] = Hash.new{ |h,k| h[k] = Hash.new(0)} }
  # product_hash = Hash.new{ |h,k| h[k] = Hash.new(0) }
  # packing_slips = Hash.new{|h,k| h[k] = product_hash}
  orders.each do |id,order|
    address = "#{order['recipient-name']} #{order['ship-address-1']} #{order['ship-address-2']} #{order['ship-address-3']} #{order['ship-city']}, #{order['ship-state']} #{order['ship-postal-code']} #{order['ship-country']}" 
    packing_slips[address]['products'][order['product-name']] += order['quantity-purchased'].to_i
    packing_slips[address]['recipientName'] = order['recipient-name']
    packing_slips[address]['shipAddress1'] = order['ship-address-1']
    packing_slips[address]['shipAddress2'] = order['ship-address-2']
    packing_slips[address]['shipAddress3'] = order['ship-address-3']
    packing_slips[address]['shipCity'] = order['ship-city']
    packing_slips[address]['shipState'] = order['ship-state']
    packing_slips[address]['shipPostalCode'] = order['ship-postal-code']
    packing_slips[address]['shipCountry'] = order['ship-country']
  end

  return packing_slips

end

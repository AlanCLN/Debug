require_relative 'file_script_utils'

# pullsheet = {
#   categroyA: {
#     cardNameA: count,
#     cardNameB: count
#   },
#   unkown: {
#     cardNameA: count,
#     cardNameC: count
#   }
# }

def generate_pull_sheet(orders,cards)
  pullsheet = Hash.new{|h,k| h[k] = Hash.new(0)}
  orders.each do |id,order|
    card_name = order['product-name']
    category = cards.has_key?(card_name) ? cards[card_name] : 'unknown'
    pullsheet[category][card_name] += order['quantity-purchased'].to_i
  end
  return pullsheet
end
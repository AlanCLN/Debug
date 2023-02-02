

# orders = {
#   order_id: {
      # order-id
      # order-item-id
      # purchase-date
      # payments-date
      # reporting-date
      # promise-date
      # days-past-promise
      # buyer-email
      # buyer-name
      # buyer-phone-number
      # sku
      # number-of-items
      # product-name
      # quantity-purchased
      # quantity-shipped
      # quantity-to-ship
      # ship-service-level
      # recipient-name
      # ship-address-1
      # ship-address-2
      # ship-address-3
      # ship-city
      # ship-state
      # ship-postal-code
      # ship-country
      # is-business-order
      # purchase-order-number
      # price-designation
#   }
# }

def parse_line_into_fields(line)
  fields = line.split(/\t/)
  return fields
end

def turn_fields_into_hash(headers,fields)
  order = {}
  headers.zip(fields).each do |header,field|
    order[header] = field
  end
  return order
end

def turn_file_into_order_hash(file_lines)
  headers = parse_line_into_fields(file_lines[0])
  order_hash = {}
  file_lines[1...file_lines.length].each do |line|
    fields = parse_line_into_fields(line)
    order = turn_fields_into_hash(headers,fields)
    order_hash[order['order-id']] = order
  end
  return order_hash
end

def replace_product_name!(orders,replacements)
  orders.each do |id,order|
    replacements.each do |find,replace|
      order['product-name'].sub!(find,replace)
    end
  end
end

def remove_tracked_orders(orders,tracked_price)
  # filtered_orders = {}
  # orders.each do |id,order|
  #   if order['value'] < tracked_price
  #     filtered_orders[id] = order
  #   end
  # end
  # return filtered_orders
  orders.select! {|id,order| order['value']<tracked_price}
end

def add_order_price_to_orders(file1,file2)
  if file1.values[0].has_key?('item-price')
    new_order = file1
    unshipped_order = file2
  else
    new_order = file2
    unshipped_order = file1
  end

  unshipped_order.each do |order_id,order|
    order_price = new_order[order_id]['item-price'].to_i
    unshipped_order[order_id]['item-price'] = order_price
  end

  return unshipped_order
end

def get_orders_from_params(params)
  file1 = params['0'].open.readlines.map(&:chomp)
  file2 = params['1'].open.readlines.map(&:chomp)

  file1_hash = turn_file_into_order_hash(file1)
  file2_hash = turn_file_into_order_hash(file2)

  return add_order_price_to_orders(file1_hash,file2_hash)
end
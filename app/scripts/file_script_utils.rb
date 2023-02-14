
# representation of how the orders hashmap look like:

# unshipped_orders_info = {
#   order-id: {
#     products: [order-items-id],  # an array of order-item-id
#     recipient-name,
#     ship-address-1,
#     ship-address-2,
#     ship-addres-3,
#     ship-city,
#     ship-state,
#     ship-postal-code,
#     ship-country,
#     total-price-without-tax,
#   }
# }

# new_order_items_info = {
#   order-item-id: {
#     product-name,
#     quantity-purchased,
#     item-price,
#     item-tax,
#   }
# }
REPLACEMENTS = []

def get_orders_from_params(params, replacements)

  # An active record replacement object is passed in as an argument. We woud like to extract
  # all the replacement strings and sort them based on longest to shortest. Then set it as a
  # CONSTANT above.
  extract_and_sort_replacements(replacements)

  # file1 and file2 will each return an array.
  # Each element in the array is a string representing each row of the file
  # The first element (index 0) represents the headers divided by an escaped tab char -> \t
  file1 = params['0'].open.readlines.map(&:chomp)
  file2 = params['1'].open.readlines.map(&:chomp)

  # categorize the files by figuring out which file is unshipped and which file is new
  files = categorize_files(file1, file2)
  # In our categorize_files function, we return [false, false] if both files are not the new_file
  # we return false so our controller can render an error that we did not submit a new_file
  if !files
    return false
  end
  unshipped_file, new_file = files

  new_order_items_info = turn_new_file_into_hash(new_file)
  unshipped_orders_info = turn_unshipped_file_into_hash(unshipped_file, new_order_items_info)

  return [unshipped_orders_info, new_order_items_info]
end

def extract_and_sort_replacements(replacements)

  replacements.each do |replacement|
    REPLACEMENTS << replacement[:prefix]
  end

  REPLACEMENTS.sort_by!{|prefix| prefix.length}.reverse!

end

def categorize_files(file1, file2)
  # we're passing in the 0th index because the headers are located in the 0th index
  # the headers will tell us which one is new_file because new_file has item-price and 
  # unshipped doesn't
  file1_headers = parse_line_into_fields(file1[0])
  file2_headers = parse_line_into_fields(file2[0])

  if file1_headers.include?('item-price')
    new_file = file1
    unshipped_file = file2
  elsif file2_headers.include?('item-price')
    new_file = file2
    unshipped_file = file1
  else
    return false
  end

  return [unshipped_file, new_file]
end

def parse_line_into_fields(line)
  fields = line.split(/\t/)
  return fields
end

def turn_new_file_into_hash(new_file)
  headers = parse_line_into_fields(new_file[0])
  new_order_items_info = Hash.new{ |h,k| h[k] = Hash.new }

  new_file[1...new_file.length].each do |line|
    fields = parse_line_into_fields(line)
    info_hash = turn_fields_into_hash(headers, fields)

    order_item_id = info_hash['order-item-id']
    product_name = strip_product_name_line(info_hash['product-name'])
    quantity_purchased = info_hash['quantity-purchased']
    item_price = info_hash['item-price']
    item_tax = info_hash['item-tax']

    new_order_items_info[order_item_id]['product_name'] = product_name
    new_order_items_info[order_item_id]['quantity_purchased'] = quantity_purchased
    new_order_items_info[order_item_id]['item_price'] = item_price
    new_order_items_info[order_item_id]['item_tax'] = item_tax
  end

  return new_order_items_info
end

def strip_product_name_line(product_name)

  REPLACEMENTS.each do |replacement|
    if product_name.start_with?(replacement)
      replacement_length = replacement.length
      return product_name[replacement_length..-1]
    end
  end

  return product_name
end

def turn_unshipped_file_into_hash(unshipped_file, new_order_items_info)
  headers = parse_line_into_fields(unshipped_file[0])
  unshipped_orders_info = Hash.new{ |h,k| h[k] = Hash.new(0) }

  unshipped_file[1...unshipped_file.length].each do |line|
    fields = parse_line_into_fields(line)
    info_hash = turn_fields_into_hash(headers, fields)

    order_id = info_hash['order-id']
    order_item_id = info_hash['order-item-id']
    recipient_name = info_hash['recipient-name']
    ship_address_1 = info_hash['ship-address-1']
    ship_address_2 = info_hash['ship-address-2']
    ship_address_3 = info_hash['ship-address-3']
    ship_city = info_hash['ship-city']
    ship_state = info_hash['ship-state']
    ship_postal_code = info_hash['ship-postal-code']
    ship_country = info_hash['ship-country']

    # grab the item_price from new_order_items_info and turn the string into a float
    item_price = new_order_items_info[order_item_id]['item_price'].to_f

    # initialize a new array for the products key if the hash for the order_id does not have a products key
    if !unshipped_orders_info.has_key?(order_id) || !unshipped_orders_info[order_id].has_key?('products')
      unshipped_orders_info[order_id]['products'] = []
    end

    unshipped_orders_info[order_id]['products'] << order_item_id
    unshipped_orders_info[order_id]['recipient_name'] = recipient_name
    unshipped_orders_info[order_id]['ship_address_1'] = ship_address_1
    unshipped_orders_info[order_id]['ship_address_2'] = ship_address_2
    unshipped_orders_info[order_id]['ship_address_3'] = ship_address_3
    unshipped_orders_info[order_id]['ship_city'] = ship_city
    unshipped_orders_info[order_id]['ship_state'] = ship_state
    unshipped_orders_info[order_id]['ship_postal_code'] = ship_postal_code
    unshipped_orders_info[order_id]['ship_country'] = ship_country
    unshipped_orders_info[order_id]['total_price_without_tax'] += item_price
  end
  return unshipped_orders_info
end

def turn_fields_into_hash(headers,fields)

  info_hash = {}
  headers.zip(fields).each do |header,field|
    info_hash[header] = field
  end

  return info_hash
end